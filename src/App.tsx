import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

export default function App() {
  const [msg, setMsg] = useState("");

  async function callRust() {
    const res = await invoke<string>("greet", { name: "Alice" });
    console.log(msg)
    setMsg(res);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Education Tauri (React + TS)</h1>
      <button onClick={callRust}>Say hi</button>
      <p>{msg}</p>
    </div>
  );
}
