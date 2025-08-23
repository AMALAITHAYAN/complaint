import React from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .grid{display:grid;gap:1rem;grid-template-columns:repeat(4,minmax(0,1fr))}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .kpi{font-size:2rem;font-weight:800}
    .muted{color:#9ca3af}
    .wide{grid-column:1 / -1}
    .bar{height:12px;background:#273244;border-radius:8px;overflow:hidden}
    .bar>span{display:block;height:100%;background:#3b82f6}
  `}</style>
);

export default function KpisDashboardPage(){
  const total=128, newToday=9, overdue=14, sla=88;
  return (
    <>
      <Styles/>
      <h1 className="title">Performance & KPIs</h1>
      <div className="grid">
        <div className="card"><div className="muted">Total Complaints</div><div className="kpi">{total}</div></div>
        <div className="card"><div className="muted">New Today</div><div className="kpi">{newToday}</div></div>
        <div className="card"><div className="muted">Overdue</div><div className="kpi">{overdue}</div></div>
        <div className="card"><div className="muted">SLA Compliance</div><div className="kpi">{sla}%</div></div>

        <div className="card wide">
          <div className="muted">Resolution Progress</div>
          <div className="bar" style={{marginTop:8}}><span style={{width:`${(100-overdue/total*100).toFixed(0)}%`}}/></div>
        </div>
      </div>
    </>
  );
}
