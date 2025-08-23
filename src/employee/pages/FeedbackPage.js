import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .grid{display:grid;gap:1rem;grid-template-columns:2fr 1fr}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .muted{color:#9ca3af}
    .input,textarea,select{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.6rem 1rem;border-radius:10px;cursor:pointer}
    .pill{display:inline-block;background:#22c55e;color:#082c16;padding:.2rem .5rem;border-radius:999px;font-size:.75rem;font-weight:800}
  `}</style>
);

export default function FeedbackPage(){
  const [list,setList]=useState([
    {id:3, rating:4, text:"Fixed quickly, thanks!", by:"Rahul"},
    {id:2, rating:2, text:"Not cleaned fully.", by:"Meera"},
  ]);
  const [form,setForm]=useState({complaintId:"3", rating:5, text:""});

  const add=(e)=>{
    e.preventDefault();
    setList([{id:form.complaintId, rating:form.rating, text:form.text||"(no comment)", by:"Citizen"}, ...list]);
    setForm({...form, text:""});
    alert("(mock) feedback recorded");
  };

  return (
    <>
      <Styles/>
      <h1 className="title">Citizen Feedback</h1>
      <div className="grid">
        <form className="card" onSubmit={add} style={{display:"grid",gap:10}}>
          <div className="muted">Complaint ID</div>
          <input className="input" value={form.complaintId} onChange={e=>setForm({...form,complaintId:e.target.value})}/>
          <div className="muted">Rating</div>
          <select className="input" value={form.rating} onChange={e=>setForm({...form,rating:Number(e.target.value)})}>
            {[5,4,3,2,1].map(n=><option key={n} value={n}>{n}</option>)}
          </select>
          <div className="muted">Comment</div>
          <textarea rows={3} className="input" value={form.text} onChange={e=>setForm({...form,text:e.target.value})} placeholder="Citizen comment…" />
          <div style={{textAlign:"right"}}><button className="btn" type="submit">Add (mock)</button></div>
        </form>

        <section className="card">
          <div className="muted">Recent Feedback</div>
          <ul style={{listStyle:"none",padding:0,marginTop:8}}>
            {list.map((f,i)=>(
              <li key={i} style={{borderBottom:"1px solid #223049",padding:".6rem 0"}}>
                <div><strong>#{f.id}</strong> · <span className="pill">{f.rating}★</span></div>
                <div style={{color:"#d1d5db"}}>{f.text}</div>
                <div className="muted">by {f.by}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
