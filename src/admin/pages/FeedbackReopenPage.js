import React from "react";

const Styles=()=>(
  <style>{`
    .title{font-size:2.2rem;font-weight:800;margin:0 0 1.2rem}
    .card{background:#151c2b;border:1px solid #24324a;border-radius:14px;padding:1rem}
    table{width:100%;border-collapse:collapse}
    th,td{padding:.6rem;border-bottom:1px solid #223049;text-align:left}
    th{color:#9ca3af}
    .btn{background:#3b82f6;border:0;color:#fff;padding:.45rem .8rem;border-radius:10px;cursor:pointer}
    .danger{background:#ef4444}
    .pill{display:inline-block;background:#22c55e;color:#082c16;padding:.1rem .45rem;border-radius:999px;font-size:.75rem;font-weight:800}
  `}</style>
);

const FEEDBACK=[
  {id:14, rating:2, text:"Not cleaned fully", citizen:"Meera"},
  {id:12, rating:5, text:"Fast fix!", citizen:"Rahul"},
];

export default function FeedbackReopenPage(){
  const reopen=(id)=>alert(`(mock) Re-opened complaint #${id}`);
  const accept=(id)=>alert(`(mock) Accepted resolution for #${id}`);
  return (
    <>
      <Styles/>
      <h1 className="title">Feedback & Re-open</h1>
      <div className="card">
        <table>
          <thead><tr><th>Complaint</th><th>Rating</th><th>Comment</th><th>Citizen</th><th>Action</th></tr></thead>
          <tbody>
            {FEEDBACK.map(f=>(
              <tr key={f.id}>
                <td>#{f.id}</td>
                <td><span className="pill">{f.rating}★</span></td>
                <td>{f.text}</td>
                <td>{f.citizen}</td>
                <td>
                  <button className="btn danger" onClick={()=>reopen(f.id)}>Re-open</button>{' '}
                  <button className="btn" onClick={()=>accept(f.id)}>Accept</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
