import React from "react";

const Styles = () => (
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .grid{display:grid;gap:1rem;grid-template-columns:repeat(4,minmax(0,1fr))}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .kpi{font-size:2rem;font-weight:800}
    .muted{color:#9ca3af}
    .wide{grid-column:1 / -1}
    .bar{height:12px;background:#273244;border-radius:8px;overflow:hidden}
    .bar>span{display:block;height:100%;background:#3b82f6}
    .badge{display:inline-block;background:#22c55e;color:#082c16;padding:.2rem .5rem;border-radius:999px;font-size:.75rem;font-weight:800}
  `}</style>
);

export default function PerformanceDashboardPage(){
  const weeklyResolved = 9, avgResolution = 1.8, pending=12, inProgress=4;
  const target = 10, pct = Math.min(100, Math.round((weeklyResolved/target)*100));

  return (
    <>
      <Styles/>
      <h1 className="title">Performance Dashboard</h1>
      <div className="grid">
        <div className="card"><div className="muted">Resolved (7d)</div><div className="kpi">{weeklyResolved}</div></div>
        <div className="card"><div className="muted">Avg. Resolution</div><div className="kpi">{avgResolution}d</div></div>
        <div className="card"><div className="muted">Pending</div><div className="kpi">{pending}</div></div>
        <div className="card"><div className="muted">In Progress</div><div className="kpi">{inProgress}</div></div>

        <div className="card wide">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div className="muted">Weekly target</div>
            <span className="badge">{pct}% of target</span>
          </div>
          <div className="bar" style={{marginTop:8}}><span style={{width:`${pct}%`}}/></div>
          <div className="muted" style={{marginTop:6}}>Goal: {target} · Achieved: {weeklyResolved}</div>
        </div>
      </div>
    </>
  );
}
