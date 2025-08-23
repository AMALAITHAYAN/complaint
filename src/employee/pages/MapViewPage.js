import React, { useState } from "react";
import { MapPin, Navigation, AlertTriangle, Lightbulb, Droplets, Trash2 } from "lucide-react";

const PLACES = [
  { 
    id: 3, 
    title: "Water leakage", 
    lat: 11.0168, 
    lng: 76.9558, // Near Race Course Road, Coimbatore
    type: "water",
    priority: "high",
    reported: "2 hours ago"
  },
  { 
    id: 2, 
    title: "Garbage not collected", 
    lat: 11.0041, 
    lng: 76.9721, // Near Gandhipuram, Coimbatore
    type: "garbage",
    priority: "medium",
    reported: "1 day ago"
  },
  { 
    id: 1, 
    title: "Street light issue", 
    lat: 11.0210, 
    lng: 76.9635, // Near Peelamedu, Coimbatore
    type: "light",
    priority: "low",
    reported: "3 days ago"
  },
];

const getIcon = (type) => {
  switch(type) {
    case 'water': return <Droplets className="w-4 h-4" />;
    case 'garbage': return <Trash2 className="w-4 h-4" />;
    case 'light': return <Lightbulb className="w-4 h-4" />;
    default: return <AlertTriangle className="w-4 h-4" />;
  }
};

const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'text-red-400 bg-red-900/30 border-red-500/50';
    case 'medium': return 'text-yellow-400 bg-yellow-900/30 border-yellow-500/50';
    case 'low': return 'text-green-400 bg-green-900/30 border-green-500/50';
    default: return 'text-gray-400 bg-gray-900/30 border-gray-500/50';
  }
};

const Styles = () => (
  <style>{`
    .container {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      min-height: 100vh;
      padding: 2rem;
      color: #f8fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    
    .title {
      font-size: 2.5rem;
      font-weight: 900;
      margin: 0 0 2rem;
      background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    
    .grid {
      display: grid;
      gap: 2rem;
      grid-template-columns: 2fr 1fr;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .card {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent);
    }
    
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.35);
      border-color: rgba(148, 163, 184, 0.2);
    }
    
    .map-container {
      position: relative;
      overflow: hidden;
      border-radius: 16px;
    }
    
    iframe {
      width: 100%;
      height: 500px;
      border: 0;
      border-radius: 16px;
      filter: brightness(0.9) contrast(1.1) saturate(0.9);
      transition: filter 0.3s ease;
    }
    
    iframe:hover {
      filter: brightness(1) contrast(1.2) saturate(1);
    }
    
    .sidebar-title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 1.5rem;
      color: #e2e8f0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .list-item {
      border-bottom: 1px solid rgba(51, 65, 85, 0.3);
      padding: 1.25rem 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      transition: all 0.2s ease;
    }
    
    .list-item:hover {
      background: rgba(30, 41, 59, 0.3);
      margin: 0 -1rem;
      padding: 1.25rem 1rem;
      border-radius: 12px;
    }
    
    .list-item:last-child {
      border-bottom: none;
    }
    
    .complaint-info {
      flex: 1;
    }
    
    .complaint-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.5rem;
    }
    
    .complaint-id {
      font-weight: 800;
      font-size: 1.1rem;
      color: #f1f5f9;
    }
    
    .complaint-title {
      color: #cbd5e1;
      font-weight: 600;
    }
    
    .complaint-meta {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      font-size: 0.875rem;
    }
    
    .coordinates {
      color: #64748b;
      font-family: 'Monaco', 'Menlo', monospace;
    }
    
    .timestamp {
      color: #475569;
      font-style: italic;
    }
    
    .priority-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border: 1px solid;
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
    }
    
    .focus-btn {
      background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
      color: white;
      border: 0;
      padding: 0.75rem 1.25rem;
      border-radius: 12px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.875rem;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
      position: relative;
      overflow: hidden;
    }
    
    .focus-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }
    
    .focus-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
    }
    
    .focus-btn:hover::before {
      left: 100%;
    }
    
    .focus-btn:active {
      transform: translateY(0);
    }
    
    .focus-btn.active {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 1rem;
      }
      
      .grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .title {
        font-size: 2rem;
      }
      
      .card {
        padding: 1.5rem;
      }
      
      iframe {
        height: 400px;
      }
    }
  `}</style>
);

export default function MapViewPage() {
  const [active, setActive] = useState(PLACES[0]);

  const src = `https://maps.google.com/maps?q=${active.lat},${active.lng}&z=16&output=embed`;

  return (
    <div className="container">
      <Styles />
      <h1 className="title">
        <MapPin className="w-10 h-10" />
        Public Complaints Map - Coimbatore
      </h1>
      
      <div className="grid">
        <section className="card">
          <div className="map-container">
            <iframe 
              title="Interactive Map" 
              src={src} 
              loading="lazy"
              allowFullScreen
            />
          </div>
        </section>
        
        <aside className="card">
          <h3 className="sidebar-title">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            Active Complaints
          </h3>
          
          <ul className="list">
            {PLACES.map(place => (
              <li key={place.id} className="list-item">
                <div className="complaint-info">
                  <div className="complaint-header">
                    {getIcon(place.type)}
                    <span className="complaint-id">#{place.id}</span>
                    <span className="complaint-title">{place.title}</span>
                  </div>
                  
                  <div className="complaint-meta">
                    <div className="coordinates">
                      📍 {place.lat.toFixed(4)}, {place.lng.toFixed(4)}
                    </div>
                    <div className="timestamp">
                      Reported {place.reported}
                    </div>
                    <div className={`priority-badge ${getPriorityColor(place.priority)}`}>
                      <div className="w-2 h-2 rounded-full bg-current"></div>
                      {place.priority} priority
                    </div>
                  </div>
                </div>
                
                <button 
                  className={`focus-btn ${active.id === place.id ? 'active' : ''}`}
                  onClick={() => setActive(place)}
                >
                  <Navigation className="w-4 h-4" />
                  {active.id === place.id ? 'Focused' : 'Focus'}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}