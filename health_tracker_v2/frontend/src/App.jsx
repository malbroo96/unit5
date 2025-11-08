import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit=()=>{
    console.log("Username:", username);
    console.log("Password:", password);
    alert(`Username: ${username}\nPassword: ${password}`);
  }

  return (
    <div>
      <input onChange={(e)=>setUsername(e.target.value)} type="text" class="px-4 py-2 leading-tight" placeholder="Username" />
      
      <input onChange={(a)=>setPassword(a.target.value)}
        type="text"
        class="px-4 py-2 leading-tight"
        placeholder="password"
      />
      <button onClick={handleSubmit} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </div>
  );
}

export default App;
