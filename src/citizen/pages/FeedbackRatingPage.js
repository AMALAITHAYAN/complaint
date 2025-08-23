import React, { useState } from "react";

const Styles = () => (
  <style>{`
    .feedback-page * {
      box-sizing: border-box;
    }
    
    .feedback-page {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      min-height: 100vh;
      color: #fff;
    }
    
    .feedback-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .feedback-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    
    .feedback-title {
      font-size: 2.5rem;
      font-weight: 800;
      margin: 0 0 0.5rem;
      background: linear-gradient(45deg, #3b82f6, #8b5cf6);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    .feedback-subtitle {
      color: #94a3b8;
      font-size: 1.1rem;
      margin: 0;
    }
    
    .feedback-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      align-items: start;
    }
    
    @media (max-width: 768px) {
      .feedback-grid {
        grid-template-columns: 1fr;
      }
    }
    
    .feedback-card {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid #334155;
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
    }
    
    .feedback-form-group {
      margin-bottom: 1.5rem;
    }
    
    .feedback-label {
      display: block;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
    }
    
    .feedback-input, .feedback-textarea {
      width: 100%;
      background: rgba(15, 23, 42, 0.8);
      color: #fff;
      border: 1px solid #475569;
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      transition: all 0.2s ease;
    }
    
    .feedback-input:focus, .feedback-textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .feedback-textarea {
      resize: vertical;
      min-height: 100px;
    }
    
    .feedback-rating-container {
      margin: 1rem 0;
    }
    
    .feedback-stars {
      display: flex;
      gap: 0.25rem;
      margin-bottom: 0.5rem;
    }
    
    .feedback-star {
      font-size: 2.5rem;
      cursor: pointer;
      transition: all 0.2s ease;
      user-select: none;
    }
    
    .feedback-star:hover {
      transform: scale(1.1);
    }
    
    .feedback-rating-label {
      color: #94a3b8;
      font-size: 0.9rem;
    }
    
    .feedback-char-count {
      text-align: right;
      color: #64748b;
      font-size: 0.8rem;
      margin-top: 0.25rem;
    }
    
    .feedback-btn-container {
      text-align: right;
      padding-top: 1rem;
    }
    
    .feedback-btn {
      background: linear-gradient(45deg, #3b82f6, #1d4ed8);
      border: none;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 0.75rem;
      cursor: pointer;
      font-weight: 600;
      font-size: 1rem;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .feedback-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
    }
    
    .feedback-btn:active {
      transform: translateY(0);
    }
    
    .feedback-btn:disabled {
      background: #059669;
      cursor: not-allowed;
      transform: none;
    }
    
    .feedback-spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: feedback-spin 1s linear infinite;
    }
    
    @keyframes feedback-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .feedback-sidebar {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .feedback-info-card {
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid #334155;
      border-radius: 1rem;
      padding: 1.5rem;
    }
    
    .feedback-info-header {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .feedback-info-icon {
      width: 32px;
      height: 32px;
      border-radius: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }
    
    .feedback-info-icon.blue {
      background: #3b82f6;
    }
    
    .feedback-info-icon.green {
      background: #10b981;
    }
    
    .feedback-info-title {
      font-weight: 600;
      color: #fff;
      margin: 0;
    }
    
    .feedback-info-text {
      color: #cbd5e1;
      line-height: 1.6;
      margin: 0;
      font-size: 0.9rem;
    }
    
    .feedback-thank-you-card {
      background: linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
      border: 1px solid rgba(59, 130, 246, 0.3);
      text-align: center;
    }
    
    .feedback-thank-you-icon {
      font-size: 2rem;
      margin-bottom: 0.5rem;
    }
    
    .feedback-thank-you-title {
      font-weight: 600;
      color: #fff;
      margin: 0 0 0.25rem;
    }
    
    .feedback-thank-you-text {
      color: #cbd5e1;
      font-size: 0.9rem;
      margin: 0;
    }
  `}</style>
);

export default function FeedbackRatingPage() {
  const [id, setId] = useState("14");
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = () => {
    setIsSubmitted(true);
    
    setTimeout(() => {
      alert(`Feedback for #${id}\nRating: ${rating}/5 stars\nComment: ${text || "(none)"}`);
      setText("");
      setIsSubmitted(false);
    }, 500);
  };

  const ratingLabels = {
    1: "Very Poor",
    2: "Poor", 
    3: "Average",
    4: "Good",
    5: "Excellent"
  };

  return (
    <div className="feedback-page">
      <Styles />
      <div className="feedback-container">
        <div className="feedback-header">
          <h1 className="feedback-title">Rate Resolution & Give Feedback</h1>
          <p className="feedback-subtitle">Help us improve by sharing your experience with our service</p>
        </div>
        
        <div className="feedback-grid">
          <div className="feedback-card">
            <div className="feedback-form-group">
              <label className="feedback-label">Resolved Complaint ID</label>
              <input
                className="feedback-input"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Enter complaint ID"
              />
            </div>

            <div className="feedback-form-group">
              <label className="feedback-label">How would you rate our service?</label>
              <div className="feedback-rating-container">
                <div className="feedback-stars">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <span
                      key={n}
                      className="feedback-star"
                      onMouseEnter={() => setHover(n)}
                      onMouseLeave={() => setHover(0)}
                      onClick={() => setRating(n)}
                      style={{
                        color: (hover || rating) >= n ? "#f59e0b" : "#64748b",
                        textShadow: (hover || rating) >= n ? "0 0 10px rgba(245, 158, 11, 0.5)" : "none"
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
                {rating > 0 && (
                  <div className="feedback-rating-label">
                    {rating}/5 - {ratingLabels[rating]}
                  </div>
                )}
              </div>
            </div>

            <div className="feedback-form-group">
              <label className="feedback-label">Additional Comments (Optional)</label>
              <textarea
                className="feedback-textarea"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Tell us about your experience. What went well? What could be improved?"
                maxLength={500}
              />
              <div className="feedback-char-count">{text.length}/500</div>
            </div>

            <div className="feedback-btn-container">
              <button
                className="feedback-btn"
                onClick={submit}
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <div className="feedback-spinner"></div>
                    Submitting...
                  </>
                ) : (
                  "Submit Feedback"
                )}
              </button>
            </div>
          </div>

          <div className="feedback-sidebar">
            <div className="feedback-info-card">
              <div className="feedback-info-header">
                <div className="feedback-info-icon blue">💡</div>
                <h3 className="feedback-info-title">Why feedback matters</h3>
              </div>
              <p className="feedback-info-text">
                Your rating and comments help us understand what we're doing well and where we can improve. 
                Every piece of feedback contributes to better service quality and accountability.
              </p>
            </div>

            <div className="feedback-info-card">
              <div className="feedback-info-header">
                <div className="feedback-info-icon green">🔒</div>
                <h3 className="feedback-info-title">Privacy & Security</h3>
              </div>
              <p className="feedback-info-text">
                Your feedback is confidential and used solely for service improvement. 
                We respect your privacy and handle all data securely.
              </p>
            </div>

            <div className="feedback-info-card feedback-thank-you-card">
              <div className="feedback-thank-you-icon">⭐</div>
              <p className="feedback-thank-you-title">Thank you!</p>
              <p className="feedback-thank-you-text">Your feedback helps us serve you better</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}