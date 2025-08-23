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

export default function RbacManagementPage(){
  const [users,setUsers]=useState([
    {name:"admin", role:"ADMIN"},
    {name:"supervisor1", role:"SUPERVISOR"},
    {name:"employee1", role:"EMPLOYEE"},
  ]);
  const [form,setForm]=useState({name:"",role:"EMPLOYEE"});

  const add=(e)=>{e.preventDefault(); if(!form.name) return; setUsers([{...form},...users]); setForm({name:"",role:"EMPLOYEE"});};

  return (
    <>
      <Styles/>
      <h1 className="title">Users & Roles (RBAC)</h1>
      <div className="grid">
        <form className="card" onSubmit={add} style={{display:"grid",gap:10}}>
          <label className="muted">Username<input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
          <label className="muted">Role<select className="input" value={form.role} onChange={e=>setForm({...form,role:e.target.value})}>
            <option>ADMIN</option><option>SUPERVISOR</option><option>EMPLOYEE</option><option>CITIZEN</option>
          </select></label>
          <div style={{textAlign:"right"}}><button className="btn">Add User</button></div>
        </form>

        <section className="card">
          <table>
            <thead><tr><th>User</th><th>Role</th></tr></thead>
            <tbody>{users.map((u,i)=>(<tr key={i}><td>{u.name}</td><td>{u.role}</td></tr>))}</tbody>
          </table>
        </section>
      </div>
    </>
  );
}
