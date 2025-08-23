import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .grid{display:grid;gap:1rem;grid-template-columns:1fr 1fr}
    .muted{color:#9ca3af}
    .input,textarea,select{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.6rem 1rem;border-radius:10px;cursor:pointer}
  `}</style>
);

export default function EscalationRequestPage(){
  const [form,setForm]=useState({id:"12", reason:"Exceeded expected time", details:""});

  const submit=(e)=>{
    e.preventDefault();
    alert(` Escalation requested for #${form.id}\nReason: ${form.reason}\nDetails: ${form.details||"-"}`);
    setForm({...form, details:""});
  };

  return (
    <>
      <Styles/>
      <h1 className="title">Request Escalation</h1>
      <div className="grid">
        <form className="card" onSubmit={submit} style={{display:"grid",gap:10}}>
          <label className="muted">Complaint ID<input className="input" value={form.id} onChange={e=>setForm({...form,id:e.target.value})}/></label>
          <label className="muted">Reason
            <select className="input" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}>
              <option>Exceeded expected time</option>
              <option>Incorrect status update</option>
              <option>Poor resolution quality</option>
              <option>Other</option>
            </select>
          </label>
          <label className="muted">Details<textarea rows={4} className="input" value={form.details} onChange={e=>setForm({...form,details:e.target.value})} placeholder="Describe the issue…"/></label>
          <div style={{textAlign:"right"}}><button className="btn" type="submit">Submit Request</button></div>
        </form>

        <aside className="card">
          <div className="muted">Policy</div>
          <ul style={{color:"#d1d5db", marginTop:8}}>
            <li>Escalation is reviewed by supervisors.</li>
            <li>Duplicate/invalid requests may be rejected.</li>
            <li>You’ll be notified about the decision.</li>
          </ul>
        </aside>
      </div>
    </>
  );
}
