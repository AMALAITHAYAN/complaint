import React from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.25rem}
    .grid{display:grid;gap:1rem;grid-template-columns:repeat(3,minmax(0,1fr))}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    .muted{color:#9ca3af}
    .bar{height:12px;background:#273244;border-radius:8px;overflow:hidden}
    .bar>span{display:block;height:100%;background:#3b82f6}
    .wide{grid-column:1 / -1}
    table{width:100%;border-collapse:collapse}
    th,td{padding:.6rem;border-bottom:1px solid #223049;text-align:left}
    th{color:#9ca3af}
  `}</style>
);

export default function ReportsPage(){
  return (
    <>
      <Styles/>
      <h1 className="title">Reports (Employee)</h1>
      <div className="grid">
        <div className="card">
          <div className="muted">Resolved this month</div>
          <div style={{fontSize:"2rem",fontWeight:800}}>34</div>
          <div className="bar"><span style={{width:"68%"}}/></div>
        </div>
        <div className="card">
          <div className="muted">Avg SLA</div>
          <div style={{fontSize:"2rem",fontWeight:800}}>2.1d</div>
          <div className="bar"><span style={{width:"70%"}}/></div>
        </div>
        <div className="card">
          <div className="muted">Backlog</div>
          <div style={{fontSize:"2rem",fontWeight:800}}>11</div>
          <div className="bar"><span style={{width:"35%"}}/></div>
        </div>

        <div className="card wide">
          <div className="muted">By Category</div>
          <table>
            <thead><tr><th>Category</th><th>Resolved</th><th>Pending</th></tr></thead>
            <tbody>
              <tr><td>Infrastructure</td><td>12</td><td>4</td></tr>
              <tr><td>Sanitation</td><td>9</td><td>3</td></tr>
              <tr><td>Water</td><td>7</td><td>2</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
