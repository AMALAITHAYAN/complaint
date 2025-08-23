import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .grid{display:grid;gap:1rem;grid-template-columns:2fr 1fr}
    .muted{color:#9ca3af}
    .input{width:100%;background:#0b1220;color:#fff;border:1px solid #24324a;border-radius:10px;padding:.6rem}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.6rem 1rem;border-radius:10px;cursor:pointer}
    .avatar{width:84px;height:84px;border-radius:50%;background:#273244;display:flex;align-items:center;justify-content:center;font-weight:800}
  `}</style>
);

export default function ProfileSettingsPage(){
  const [form,setForm]=useState({name:"employee1", phone:"9876543210", dept:"Infrastructure", email:"employee1@example.com"});

  const save=(e)=>{ e.preventDefault(); alert(`(mock) profile saved:\n${JSON.stringify(form,null,2)}`); };
  const upd=(k)=>e=>setForm({...form,[k]:e.target.value});

  return (
    <>
      <Styles/>
      <h1 className="title">Profile Settings</h1>
      <div className="grid">
        <form className="card" onSubmit={save} style={{display:"grid",gap:10}}>
          <label className="muted">Full Name<input className="input" value={form.name} onChange={upd("name")}/></label>
          <label className="muted">Email<input className="input" value={form.email} onChange={upd("email")}/></label>
          <label className="muted">Phone<input className="input" value={form.phone} onChange={upd("phone")}/></label>
          <label className="muted">Department<input className="input" value={form.dept} onChange={upd("dept")}/></label>
          <div style={{textAlign:"right"}}><button className="btn" type="submit">Save Changes</button></div>
        </form>

        <aside className="card">
          <div className="muted">Avatar</div>
          <div className="avatar" title="mock avatar">E1</div>
          <div className="muted" style={{marginTop:8}}>Upload coming soon (mock)</div>
        </aside>
      </div>
    </>
  );
}
