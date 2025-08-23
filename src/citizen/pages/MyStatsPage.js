import React, { useState, useEffect } from "react";
import { TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
    
    * { box-sizing: border-box; }
    
    body { 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      margin: 0;
      min-height: 100vh;
    }
    
    .container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
      min-height: 100vh;
    }
    
    .header {
      margin-bottom: 2rem;
      animation: slideDown 0.6s ease-out;
    }
    
    .title {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 0.5rem;
      background: linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .subtitle {
      color: #64748b;
      font-size: 1.1rem;
      font-weight: 500;
      margin: 0;
    }
    
    .grid {
      display: grid;
      gap: 1.5rem;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      margin-bottom: 2rem;
    }
    
    .card {
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(148, 163, 184, 0.1);
      border-radius: 20px;
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation: fadeInUp 0.6s ease-out backwards;
    }
    
    .card:nth-child(1) { animation-delay: 0.1s; }
    .card:nth-child(2) { animation-delay: 0.2s; }
    .card:nth-child(3) { animation-delay: 0.3s; }
    .card:nth-child(4) { animation-delay: 0.4s; }
    
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--accent-color, #3b82f6);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.3s ease;
    }
    
    .card:hover {
      transform: translateY(-4px);
      border-color: rgba(148, 163, 184, 0.2);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    
    .card:hover::before {
      transform: scaleX(1);
    }
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .card-icon {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--icon-bg, rgba(59, 130, 246, 0.15));
      color: var(--accent-color, #3b82f6);
    }
    
    .card-label {
      color: #94a3b8;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .kpi {
      font-size: 2.5rem;
      font-weight: 800;
      color: #ffffff;
      margin: 0;
      line-height: 1;
    }
    
    .kpi-change {
      font-size: 0.85rem;
      font-weight: 600;
      margin-top: 0.5rem;
      padding: 0.25rem 0.5rem;
      border-radius: 8px;
      display: inline-block;
    }
    
    .change-positive {
      color: #10b981;
      background: rgba(16, 185, 129, 0.15);
    }
    
    .change-neutral {
      color: #64748b;
      background: rgba(100, 116, 139, 0.15);
    }
    
    .progress-card {
      grid-column: 1 / -1;
      animation: fadeInUp 0.6s ease-out 0.5s backwards;
    }
    
    .progress-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .progress-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
      margin: 0;
    }
    
    .progress-percentage {
      font-size: 1.5rem;
      font-weight: 800;
      color: #3b82f6;
    }
    
    .progress-bar {
      height: 16px;
      background: rgba(30, 41, 59, 0.8);
      border-radius: 12px;
      overflow: hidden;
      position: relative;
      margin-bottom: 1rem;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%);
      border-radius: 12px;
      position: relative;
      transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
      animation: progressGlow 2s ease-in-out infinite alternate;
    }
    
    .progress-fill::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%);
      animation: shimmer 2s infinite;
    }
    
    .progress-stats {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #94a3b8;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes progressGlow {
      0% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
      100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    @keyframes countUp {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    .count-animation {
      animation: countUp 0.5s ease-out;
    }
    
    @media (max-width: 768px) {
      .container { padding: 1rem; }
      .title { font-size: 2rem; }
      .grid { grid-template-columns: 1fr; gap: 1rem; }
      .card { padding: 1.25rem; }
      .kpi { font-size: 2rem; }
    }
  `}</style>
);

export default function EnhancedStatsPage() {
  const [animatedValues, setAnimatedValues] = useState({ total: 0, pending: 0, resolved: 0, avg: 0 });
  const [progressWidth, setProgressWidth] = useState(0);
  
  // Static data - in a real app, this would come from props or API
  const data = {
    total: 8,
    pending: 3,
    resolved: 5,
    avg: 2.4
  };
  
  const pct = Math.round((data.resolved / Math.max(1, data.total)) * 100);
  
  // Animation effects
  useEffect(() => {
    const animateNumbers = () => {
      const duration = 1500;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        setAnimatedValues({
          total: Math.round(data.total * easeProgress),
          pending: Math.round(data.pending * easeProgress),
          resolved: Math.round(data.resolved * easeProgress),
          avg: parseFloat((data.avg * easeProgress).toFixed(1))
        });
        
        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedValues(data);
        }
      }, stepDuration);
    };
    
    const animateProgress = () => {
      setTimeout(() => {
        setProgressWidth(pct);
      }, 800);
    };
    
    animateNumbers();
    animateProgress();
  }, []);
  
  const cards = [
    {
      label: "Total Complaints",
      value: animatedValues.total,
      icon: AlertCircle,
      color: "#f59e0b",
      iconBg: "rgba(245, 158, 11, 0.15)",
      change: "+2 this month",
      changeType: "neutral"
    },
    {
      label: "Pending Review",
      value: animatedValues.pending,
      icon: Clock,
      color: "#ef4444",
      iconBg: "rgba(239, 68, 68, 0.15)",
      change: "3 active",
      changeType: "neutral"
    },
    {
      label: "Resolved Cases",
      value: animatedValues.resolved,
      icon: CheckCircle,
      color: "#10b981",
      iconBg: "rgba(16, 185, 129, 0.15)",
      change: "+2 this week",
      changeType: "positive"
    },
    {
      label: "Avg Resolution",
      value: `${animatedValues.avg}d`,
      icon: TrendingUp,
      color: "#3b82f6",
      iconBg: "rgba(59, 130, 246, 0.15)",
      change: "15% faster",
      changeType: "positive"
    }
  ];
  
  return (
    <>
      <Styles />
      <div className="container">
        <div className="header">
          <h1 className="title">Complaint Management</h1>
          <p className="subtitle">Track and monitor your complaint resolution progress</p>
        </div>
        
        <div className="grid">
          {cards.map((card, index) => (
            <div key={index} className="card" style={{ '--accent-color': card.color, '--icon-bg': card.iconBg }}>
              <div className="card-header">
                <div className="card-icon">
                  <card.icon size={20} />
                </div>
                <div className="card-label">{card.label}</div>
              </div>
              <div className="kpi count-animation">{card.value}</div>
              <div className={`kpi-change ${card.changeType === 'positive' ? 'change-positive' : 'change-neutral'}`}>
                {card.change}
              </div>
            </div>
          ))}
          
          <div className="card progress-card" style={{ '--accent-color': '#3b82f6' }}>
            <div className="progress-header">
              <h3 className="progress-title">Resolution Progress</h3>
              <div className="progress-percentage">{pct}%</div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progressWidth}%` }}
              />
            </div>
            
            <div className="progress-stats">
              <div className="stat-item">
                <CheckCircle size={16} />
                <span>{data.resolved} resolved</span>
              </div>
              <div className="stat-item">
                <Clock size={16} />
                <span>{data.pending} pending</span>
              </div>
              <div className="stat-item">
                <TrendingUp size={16} />
                <span>62.5% success rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}