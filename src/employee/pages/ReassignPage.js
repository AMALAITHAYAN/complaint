import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .grid{display:grid;gap:1rem;grid-template-columns:1fr 1fr}
    .muted{color:#9ca3af}
    .input,.select,textarea{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.6rem 1rem;border-radius:10px;cursor:pointer}
  `}</style>
);

const EMPLOYEES=["employee1","employee2","employee3","night-shift"];

export default function ReassignPage(){
  const [complaintId,setComplaintId]=useState("3");
  const [toUser,setToUser]=useState(EMPLOYEES[1]);
  const [level,setLevel]=useState("NONE");
  const [note,setNote]=useState("");

  const doAction=()=>{
    alert(`(mock)\nComplaint #${complaintId}\n` +
          `${level==="NONE"?"Reassigned":`Escalated (${level})`} to ${toUser}\n`+
          `Note: ${note || "-"}`);
    setNote("");
  };

  return (
    <>
      <Styles/>
      <h1 className="title">Reassign / Escalate</h1>
      <div className="grid">
        <section className="card">
          <div className="muted">Complaint</div>
          <input className="input" value={complaintId} onChange={e=>setComplaintId(e.target.value)} />
          <div className="muted" style={{marginTop:10}}>Assign to</div>
          <select className="select" value={toUser} onChange={e=>setToUser(e.target.value)}>
            {EMPLOYEES.map(u=><option key={u} value={u}>{u}</option>)}
          </select>
          <div className="muted" style={{marginTop:10}}>Escalation</div>
          <select className="select" value={level} onChange={e=>setLevel(e.target.value)}>
            <option value="NONE">None (just reassign)</option>
            <option value="L1">L1 Supervisor</option>
            <option value="L2">L2 Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
          <div className="muted" style={{marginTop:10}}>Note</div>
          <textarea rows={4} className="input" value={note} onChange={e=>setNote(e.target.value)} placeholder="Why reassign/escalate?" />
          <div style={{textAlign:"right",marginTop:10}}><button className="btn" onClick={doAction}>Confirm</button></div>
        </section>

        <aside className="card">
          <div className="muted">Recent actions</div>
          <ul style={{color:"#d1d5db"}}>
            <li>#7 escalated to Admin (yesterday)</li>
            <li>#2 reassigned to night-shift</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
