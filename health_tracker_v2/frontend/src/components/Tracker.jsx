// Tracker.jsx
import React, { useState, useRef } from "react";
import axios from "axios";

export default function Tracker() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi — upload a photo of your meal or type what you ate. I'll suggest calories & how it fits your goal." }
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [isSending, setIsSending] = useState(false);
  const fileInputRef = useRef();

  function addMessage(msg) {
    setMessages((m) => [...m, msg]);
  }

  async function handleSendText(e) {
    e?.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    addMessage(userMsg);
    setInput("");
    await sendToServer({ type: "text", text: userMsg.text });
  }

  async function handleUploadClick() {
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(URL.createObjectURL(f)); // preview url
    // upload & process
    await sendFileToServer(e.target.files[0]);
    e.target.value = null;
  }

  async function sendFileToServer(actualFile) {
    setIsSending(true);
    addMessage({ from: "user", text: `Uploaded a photo: ${actualFile.name}` });

    try {
      const form = new FormData();
      form.append("file", actualFile);

      const uploadRes = await axios.post("/api/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      // uploadRes.data should include { fileId, previewUrl? }
      await sendToServer({ type: "file", fileId: uploadRes.data.fileId, filename: actualFile.name });
    } catch (err) {
      console.error(err);
      addMessage({ from: "bot", text: "Sorry, upload failed. Try again." });
    } finally {
      setIsSending(false);
      setFile(null);
    }
  }

  async function sendToServer(payload) {
    setIsSending(true);
    addMessage({ from: "bot", text: "Thinking..." }); // temporary typing indicator
    try {
      const res = await axios.post("/api/chat", payload);
      // res.data should be { reply: "text reply", structured?: {...} }
      setMessages((prev) => {
        // remove the last "Thinking..." bot message then append response
        const withoutThinking = prev.filter((m, i) => !(m.from === "bot" && m.text === "Thinking..."));
        return [...withoutThinking, { from: "bot", text: res.data.reply }];
      });
    } catch (err) {
      console.error(err);
      setMessages((prev) => {
        const withoutThinking = prev.filter((m) => !(m.from === "bot" && m.text === "Thinking..."));
        return [...withoutThinking, { from: "bot", text: "Sorry, something went wrong. Try again later." }];
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-emerald-700">Nutrition Assistant</h2>
        </div>

        <div className="h-96 overflow-auto p-4 space-y-3 bg-gradient-to-b from-emerald-50 to-white">
          {messages.map((m, i) => (
            <div key={i} className={m.from === "user" ? "text-right" : "text-left"}>
              <div className={`inline-block px-4 py-2 rounded-lg ${m.from === "user" ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-800"}`}>
                {m.text}
              </div>
            </div>
          ))}
          {file && (
            <div className="flex justify-center">
              <img src={file} alt="preview" className="max-h-48 rounded-md border" />
            </div>
          )}
        </div>

        <form onSubmit={handleSendText} className="p-4 border-t flex gap-2 items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleUploadClick} className="px-3 py-2 rounded-lg bg-emerald-100 hover:bg-emerald-200">
            Upload
          </button>

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your meal or ask for suggestions..."
            className="flex-1 px-3 py-2 rounded-lg border focus:outline-none"
            disabled={isSending}
          />

          <button type="submit" disabled={isSending} className="bg-emerald-600 text-white px-4 py-2 rounded-lg disabled:opacity-60">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
