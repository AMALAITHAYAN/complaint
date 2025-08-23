import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .grid{display:grid;gap:1rem;grid-template-columns:1fr 2fr}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .muted{color:#9ca3af}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.55rem .9rem;border-radius:10px;cursor:pointer}
    table{width:100%;border-collapse:collapse}
    th,td{padding:.6rem;border-bottom:1px solid #223049;text-align:left}
    th{color:#9ca3af}
    .pill{display:inline-block;padding:.2rem .5rem;border-radius:999px;font-size:.72rem;font-weight:800}
  `}</style>
);

const MOCK=[
  {id:101,title:"Pothole on 4th Ave",cat:"Infrastructure",prio:"HIGH",age:"2d",status:"NEW"},
  {id:102,title:"Garbage overflow",cat:"Sanitation",prio:"MED",age:"10h",status:"ESCALATED"},
  {id:103,title:"Streetlight out",cat:"Power",prio:"LOW",age:"4d",status:"OVERDUE"},
];

export default function TriageDashboardPage(){
  const [selected,setSelected]=useState([]);
  const toggle=(id)=> setSelected(s=> s.includes(id)? s.filter(x=>x!==id):[...s,id]);
  const bulkAssign=()=> alert(`(mock) Assign ${selected.length} complaints`);

  return (
    <>
      <Styles/>
      <h1 className="title">Triage Dashboard</h1>
      <div className="grid">
        <aside className="card">
          <div className="muted">Filters</div>
          <ul style={{color:"#d1d5db",lineHeight:"1.9"}}>
            <li>New</li><li>Escalated</li><li>Overdue</li><li>Re-opened</li>
          </ul>
          <button className="btn" onClick={bulkAssign} disabled={!selected.length}>Bulk Assign</button>
        </aside>

        <section className="card">
          <table>
            <thead><tr>
              <th></th><th>ID</th><th>Title</th><th>Category</th><th>Priority</th><th>Age</th><th>Status</th>
            </tr></thead>
            <tbody>
              {MOCK.map(r=>(
                <tr key={r.id}>
                  <td><input type="checkbox" checked={selected.includes(r.id)} onChange={()=>toggle(r.id)}/></td>
                  <td>#{r.id}</td>
                  <td>{r.title}</td>
                  <td>{r.cat}</td>
                  <td><span className="pill" style={{background:r.prio==="HIGH"?"#f97316":r.prio==="MED"?"#f59e0b":"#64748b",color:"#0b1220"}}>{r.prio}</span></td>
                  <td>{r.age}</td>
                  <td>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
