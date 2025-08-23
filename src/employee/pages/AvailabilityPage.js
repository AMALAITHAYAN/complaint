import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .muted{color:#9ca3af}
    .grid{display:grid;gap:1rem;grid-template-columns:1fr 1fr}
    .input,.select{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.6rem 1rem;border-radius:10px;cursor:pointer}
    table{width:100%;border-collapse:collapse}
    th,td{padding:.6rem;border-bottom:1px solid #223049;text-align:left}
    th{color:#9ca3af}
  `}</style>
);

export default function AvailabilityPage(){
  const [entries,setEntries]=useState([
    {from:"2025-08-21", to:"2025-08-22", reason:"Training"},
  ]);
  const [form,setForm]=useState({from:"",to:"",reason:""});

  const add=(e)=>{
    e.preventDefault();
    if(!form.from||!form.to) return;
    setEntries([{...form},...entries]);
    setForm({from:"",to:"",reason:""});
    alert("(mock) availability saved");
  };

  return (
    <>
      <Styles/>
      <h1 className="title">Availability / Leave</h1>
      <div className="grid">
        <form className="card" onSubmit={add} style={{display:"grid",gap:10}}>
          <label className="muted">From<input type="date" className="input" value={form.from} onChange={e=>setForm({...form,from:e.target.value})}/></label>
          <label className="muted">To<input type="date" className="input" value={form.to} onChange={e=>setForm({...form,to:e.target.value})}/></label>
          <label className="muted">Reason<input className="input" value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/></label>
          <div style={{textAlign:"right"}}><button className="btn" type="submit">Add</button></div>
        </form>

        <section className="card">
          <div className="muted">Upcoming Unavailability</div>
          <table style={{marginTop:8}}>
            <thead><tr><th>From</th><th>To</th><th>Reason</th></tr></thead>
            <tbody>
              {entries.map((e,i)=>(<tr key={i}><td>{e.from}</td><td>{e.to}</td><td>{e.reason||"—"}</td></tr>))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
