import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Styles = () => (
  <style>{`
    /* --- Card & Detail Styles --- */
    .details-card {
      background: #1f2937;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #374151;
    }
    .detail-item { margin-bottom: 1.5rem; }
    .detail-item:last-child { margin-bottom: 0; }

    .detail-item strong {
      color: #9ca3af;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .detail-item strong svg { width: 16px; height: 16px; }
    .detail-item p {
      font-size: 1rem;
      color: #d1d5db;
      margin: 0;
      line-height: 1.6;
      padding-left: 1.5rem;
    }

    /* --- TIMELINE STYLES (fixed) --- */
    .status-timeline {
      display: flex;
      align-items: flex-start;
      position: relative;
      margin-top: 1rem;
      padding: 0 1rem;
      --tl-pad: 15%;            /* left/right inset for the track */
    }
    .timeline-line-bg {
      position: absolute;
      top: 16px;
      left: var(--tl-pad);
      right: var(--tl-pad);
      height: 4px;
      background-color: #374151;
      z-index: 1;
    }
    .timeline-line-progress {
      position: absolute;
      top: 16px;
      left: var(--tl-pad);
      height: 4px;
      background-color: #22c55e; /* Green progress */
      z-index: 2;
      /* width = progress fraction * visible track width */
      width: calc(var(--p, 0) * (100% - (2 * var(--tl-pad))));
      transition: width 0.5s ease-in-out;
    }
    .timeline-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      z-index: 3;
      width: 33.33%;
      position: relative;
    }
    .timeline-icon-wrapper {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: #374151; /* Default inactive color */
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.3s;
    }
    .timeline-icon-wrapper svg { width: 18px; height: 18px; color: #9ca3af; }

    .timeline-step.completed .timeline-icon-wrapper,
    .timeline-step.active .timeline-icon-wrapper {
      background-color: #22c55e; /* Green for completed/active */
    }
    .timeline-step.active .timeline-icon-wrapper {
      box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.3);
    }
    .timeline-step.completed .timeline-icon-wrapper svg,
    .timeline-step.active .timeline-icon-wrapper svg { color: #fff; }

    .timeline-label {
      margin-top: 0.75rem;
      font-size: 0.9rem;
      color: #9ca3af;
      font-weight: 500;
    }
    .timeline-step.active .timeline-label {
      color: #fff;
      font-weight: bold;
    }
  `}</style>
);

/* --- SVG Icons for the Timeline --- */
const PendingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const InProgressIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
  </svg>
);
const ResolvedIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

/* --- SVG Icons for Details --- */
const DescriptionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);
const AssignedToIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  </svg>
);
const CategoryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
  </svg>
);

/* --- Status Timeline Component --- */
const StatusTimeline = ({ currentStatus }) => {
  const statuses = [
    { name: 'PENDING',      icon: <PendingIcon /> },
    { name: 'IN_PROGRESS',  icon: <InProgressIcon /> },
    { name: 'RESOLVED',     icon: <ResolvedIcon /> },
  ];
  const currentIndex = statuses.findIndex(s => s.name === currentStatus);

  // progress fraction: 0..1 (safe if status not found)
  const progress = currentIndex >= 0 ? (currentIndex / (statuses.length - 1)) : 0;

  return (
    <div className="status-timeline">
      <div className="timeline-line-bg"></div>
      {/* Pass progress via CSS var so width = progress * visible track */}
      <div className="timeline-line-progress" style={{ '--p': progress }} />
      {statuses.map((status, index) => {
        let stepClass = 'timeline-step';
        if (index < currentIndex) stepClass += ' completed';
        else if (index === currentIndex) stepClass += ' active';

        return (
          <div className={stepClass} key={status.name}>
            <div className="timeline-icon-wrapper">{status.icon}</div>
            <div className="timeline-label">{status.name.replace('_', ' ')}</div>
          </div>
        );
      })}
    </div>
  );
};

const ComplaintDetailsTab = () => {
  const { complaint } = useOutletContext();
  const details = complaint.details;

  return (
    <>
      <Styles />
      <div className="details-card">
        <div className="detail-item">
          <strong>Status</strong>
          <StatusTimeline currentStatus={details.status} />
        </div>

        <div className="detail-item" style={{ marginTop: '2.5rem' }}>
          <strong><DescriptionIcon /> Description</strong>
          <p>{details.description}</p>
        </div>

        <div className="detail-item">
          <strong><AssignedToIcon /> Assigned To</strong>
          <p>{details.assignedTo || 'Not yet assigned'}</p>
        </div>

        <div className="detail-item">
          <strong><CategoryIcon /> Category</strong>
          <p>{details.category}</p>
        </div>
      </div>
    </>
  );
};

export default ComplaintDetailsTab;
