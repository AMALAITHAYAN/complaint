import React from "react";

const MOCK = [
  { id:"n4", t:"2025-08-20 10:15", type:"ASSIGNED", text:"Complaint #3 assigned to you (Water leakage near 5th Ave)." },
  { id:"n3", t:"2025-08-20 09:00", type:"COMMENT", text:"Citizen added a comment on #2." },
  { id:"n2", t:"2025-08-19 18:40", type:"ESCALATION", text:"#7 escalated by Admin." },
  { id:"n1", t:"2025-08-19 10:05", type:"REMINDER", text:"You have 2 tasks due today." },
];

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px}
    .item{padding:1rem 1.2rem;border-bottom:1px solid #223049;display:flex;gap:.75rem}
    .badge{font-size:.75rem;font-weight:800;padding:.25rem .5rem;border-radius:999px;color:#fff}
    .muted{color:#9ca3af}
  `}</style>
);
const color=(t)=>({ASSIGNED:"#3b82f6",COMMENT:"#06b6d4",ESCALATION:"#ef4444",REMINDER:"#f59e0b"}[t]||"#6b7280");

export default function NotificationsPage(){
  return (
    <>
      <Styles/>
      <h1 className="title">Notification Center</h1>
      <div className="card">
        {MOCK.map(n=>(
          <div key={n.id} className="item">
            <span className="badge" style={{background:color(n.type)}}>{n.type}</span>
            <div>
              <div>{n.text}</div>
              <div className="muted">{n.t}</div>
            </div>
          </div>
        ))}
        <div style={{padding:"1rem 1.2rem",color:"#9ca3af"}}>End of notifications</div>
      </div>
    </>
  );
}
