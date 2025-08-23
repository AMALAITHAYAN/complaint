import React, { useState } from "react";

const Styles = () => (
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1rem}
    .grid{display:grid;gap:1rem;grid-template-columns:2fr 1fr}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .msg{border-bottom:1px solid #223049;padding:.6rem 0}
    .muted{color:#9ca3af}
    .input,textarea{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.6rem 1rem;border-radius:10px;cursor:pointer}
  `}</style>
);

export default function ChatPage(){
  const [messages,setMessages]=useState([
    {by:"admin", at:"10:02", text:"Please update status for #3."},
    {by:"employee1", at:"10:05", text:"Inspection planned at 5 PM."},
  ]);
  const [text,setText]=useState("");

  const send=()=>{
    if(!text.trim()) return;
    setMessages([{by:"you",at:new Date().toLocaleTimeString().slice(0,5),text:text.trim()},...messages]);
    setText("");
  };

  return (
    <>
      <Styles/>
      <h1 className="title">Team Chat / Notes</h1>
      <div className="grid">
        <section className="card">
          <div className="muted" style={{marginBottom:8}}>Thread for complaint #3</div>
          <div>
            {messages.map((m,i)=>(
              <div key={i} className="msg">
                <strong>{m.by}</strong> <span className="muted">· {m.at}</span>
                <div>{m.text}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:12, display:"grid", gap:8}}>
            <textarea rows={3} value={text} onChange={e=>setText(e.target.value)} placeholder="Write a note or message…"/>
            <div style={{textAlign:"right"}}><button className="btn" onClick={send}>Send</button></div>
          </div>
        </section>

        <aside className="card">
          <div className="muted">Participants</div>
          <ul style={{listStyle:"none",padding:0,margin:8, color:"#d1d5db"}}>
            <li>employee1 (you)</li>
            <li>admin</li>
            <li>ops-team</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
