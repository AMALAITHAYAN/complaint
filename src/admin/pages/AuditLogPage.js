import React from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .item{border-left:3px solid #3b82f6;margin:.6rem 0;padding:.2rem .8rem}
    .muted{color:#9ca3af}
  `}</style>
);

const LOG=[
  {t:"2025-08-21 10:01", by:"admin", msg:"Changed SLA for Infrastructure HIGH from 24h → 18h"},
  {t:"2025-08-21 09:40", by:"supervisor1", msg:"Reassigned #101 to employee2"},
  {t:"2025-08-20 17:00", by:"system", msg:"Auto-escalated #102 to L1"},
];

export default function AuditLogPage(){
  return (
    <>
      <Styles/>
      <h1 className="title">Audit Log</h1>
      <section className="card">
        {LOG.map((e,i)=>(
          <div key={i} className="item">
            <div style={{fontWeight:800}}>{e.t} · {e.by}</div>
            <div>{e.msg}</div>
          </div>
        ))}
        <div className="muted">Mock data for demo.</div>
      </section>
    </>
  );
}
