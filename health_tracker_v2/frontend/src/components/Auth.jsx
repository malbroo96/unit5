import { useState } from "react";
import "../App.css";

function App() {
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (mode === "login") {
      alert(`Logging in...\nUsername: ${username}\nPassword: ${password}`);
    } else {
      alert(
        `Signing up...\nUsername: ${username}\nEmail: ${email}\nPassword: ${password}`
      );
    }

    console.log("Mode:", mode);
    console.log("Username:", username);
    console.log("Email:", email);
    console.log("Password:", password);

    // clear inputs
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-100 via-rose-100 to-green-100">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-80 border border-green-200">
        {/* Toggle Buttons */}
        <div className="flex justify-center mb-6 bg-green-50 rounded-full p-1">
          <button
            className={`flex-1 py-2 rounded-full transition ${
              mode === "login"
                ? "bg-green-500 text-white font-semibold shadow-md"
                : "text-green-600 hover:text-green-800"
            }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`flex-1 py-2 rounded-full transition ${
              mode === "signup"
                ? "bg-green-500 text-white font-semibold shadow-md"
                : "text-green-600 hover:text-green-800"
            }`}
            onClick={() => setMode("signup")}
          >
            Signup
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          {mode === "login" ? "Welcome Back" : "Create an Account"}
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Username"
          />

          {mode === "signup" && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
              placeholder="Email"
            />
          )}

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Password"
          />

          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-md transition"
          >
            {mode === "login" ? "Login" : "Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
