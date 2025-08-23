import React from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .grid{display:grid;gap:1rem;grid-template-columns:repeat(3,minmax(0,1fr))}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .muted{color:#9ca3af}
    .bar{height:12px;background:#273244;border-radius:8px;overflow:hidden}
    .bar>span{display:block;height:100%;background:#3b82f6}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.5rem .9rem;border-radius:10px;cursor:pointer}
  `}</style>
);

const MOCK=[
  {user:"employee1",dept:"Infra",load:70,open:12},
  {user:"employee2",dept:"Sanitation",load:35,open:5},
  {user:"employee3",dept:"Water",load:55,open:9},
];

export default function WorkloadBalancerPage(){
  const auto=()=>alert("(mock) Auto-assigned 7 complaints using skills & zones");
  return (
    <>
      <Styles/>
      <h1 className="title">Workload & Assignment</h1>
      <div className="grid">
        {MOCK.map(m=>(
          <div key={m.user} className="card">
            <div style={{fontWeight:800}}>{m.user}</div>
            <div className="muted">{m.dept}</div>
            <div className="bar" style={{margin:"10px 0"}}><span style={{width:`${m.load}%`}}/></div>
            <div className="muted">{m.open} open complaints</div>
          </div>
        ))}
      </div>
      <div style={{textAlign:"right",marginTop:10}}><button className="btn" onClick={auto}>Auto Balance</button></div>
    </>
  );
}
