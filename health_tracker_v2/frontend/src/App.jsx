import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Username:", username);
    console.log("Password:", password);
    alert(`Username: ${username}\nPassword: ${password}`);

    // optional: clear fields after submit
    setUsername("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-peach-100 via-rose-100 to-green-100">
      <div className="bg-white/90 p-8 rounded-2xl shadow-2xl w-80 border border-green-200">
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          Login Form
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-md border border-green-300 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Username"
          />

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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
