import React, { useState } from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .grid{display:grid;gap:1rem;grid-template-columns:2fr 1fr}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    iframe{width:100%;height:480px;border:0;border-radius:12px}
    .muted{color:#9ca3af}
    .chip{display:inline-block;background:#273244;color:#d1d5db;padding:.25rem .55rem;border-radius:999px;margin:.15rem}
  `}</style>
);

const LOCATIONS=[
  {lat:12.9716,lng:77.5946,label:"CBD"},
  {lat:12.975,lng:77.59,label:"MG Rd"},
  {lat:12.966,lng:77.602,label:"Ulsoor"},
];

export default function MapHeatmapPage(){
  const [focus,setFocus]=useState(LOCATIONS[0]);
  const src=`https://maps.google.com/maps?q=${focus.lat},${focus.lng}&z=13&output=embed`;
  return (
    <>
      <Styles/>
      <h1 className="title">Live Map & Heatmap</h1>
      <div className="grid">
        <section className="card"><iframe title="admin-heatmap" src={src}/></section>
        <aside className="card">
          <div className="muted">Hotspots</div>
          {LOCATIONS.map((p,i)=>(
            <div key={i} className="chip" onClick={()=>setFocus(p)} style={{cursor:"pointer"}}>{p.label}</div>
          ))}
          <p className="muted" style={{marginTop:10}}>Mock map using Google embed.</p>
        </aside>
      </div>
    </>
  );
}
