import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .grid{display:grid;gap:1rem;grid-template-columns:1fr 2fr}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .muted{color:#9ca3af}
    .input,select{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    table{width:100%;border-collapse:collapse}
    th,td{padding:.6rem;border-bottom:1px solid #223049;text-align:left}
    th{color:#9ca3af}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.55rem .9rem;border-radius:10px;cursor:pointer}
  `}</style>
);

export default function SlaRulesPage(){
  const [rules,setRules]=useState([
    {cat:"Infrastructure",prio:"HIGH",sla:"24h",esc:"Supervisor 12h"},
    {cat:"Sanitation",prio:"MED",sla:"48h",esc:"L1 24h"},
  ]);
  const [form,setForm]=useState({cat:"Infrastructure",prio:"HIGH",sla:"24h",esc:"Supervisor 12h"});
  const add=(e)=>{e.preventDefault(); setRules([form,...rules]);};

  return (
    <>
      <Styles/>
      <h1 className="title">SLA & Escalation Rules</h1>
      <div className="grid">
        <form className="card" onSubmit={add} style={{display:"grid",gap:10}}>
          <label className="muted">Category<select className="input" value={form.cat} onChange={e=>setForm({...form,cat:e.target.value})}>
            <option>Infrastructure</option><option>Sanitation</option><option>Water</option>
          </select></label>
          <label className="muted">Priority<select className="input" value={form.prio} onChange={e=>setForm({...form,prio:e.target.value})}>
            <option>HIGH</option><option>MED</option><option>LOW</option>
          </select></label>
          <label className="muted">SLA (e.g., 24h)<input className="input" value={form.sla} onChange={e=>setForm({...form,sla:e.target.value})}/></label>
          <label className="muted">Escalation after<input className="input" value={form.esc} onChange={e=>setForm({...form,esc:e.target.value})}/></label>
          <div style={{textAlign:"right"}}><button className="btn">Add Rule</button></div>
        </form>

        <section className="card">
          <table>
            <thead><tr><th>Category</th><th>Priority</th><th>SLA</th><th>Escalation</th></tr></thead>
            <tbody>{rules.map((r,i)=>(<tr key={i}><td>{r.cat}</td><td>{r.prio}</td><td>{r.sla}</td><td>{r.esc}</td></tr>))}</tbody>
          </table>
        </section>
      </div>
    </>
  );
}
