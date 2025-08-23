import React, { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import complaintService from '../../services/complaintService';
import CategorySelect from '../components/CategorySelect';
import FileDropzone from '../components/FileDropzone';

// The new Chatbot component is placed here for easy integration.
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! How can I assist you with your complaint submission today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const getBotResponse = (userInput) => {
    const lowerInput = userInput.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello there! How can I help you?';
    }
    if (lowerInput.includes('category') || lowerInput.includes('type')) {
      return 'You can select a category like Infrastructure, Sanitation, or Public Safety from the dropdown menu in the form.';
    }
    if (lowerInput.includes('file') || lowerInput.includes('attachment') || lowerInput.includes('upload')) {
      return 'You can attach up to 5 files (images or PDFs) by dragging them into the dropzone or clicking to select them.';
    }
    if (lowerInput.includes('submit') || lowerInput.includes('send')) {
      return 'Once you fill out all required fields (marked with *), click the "Submit Complaint" button at the bottom.';
    }
    if (lowerInput.includes('username')) {
        return 'The username is a unique identifier you create. It helps you track all complaints submitted under that name on the "My Complaints" page.'
    }
    return "I'm sorry, I don't understand that. You can ask me about categories, file attachments, or how to submit the form.";
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (!trimmedInput) return;

    const newUserMessage = { id: Date.now(), sender: 'user', text: trimmedInput };
    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse = getBotResponse(trimmedInput);
      const newBotMessage = { id: Date.now() + 1, sender: 'bot', text: botResponse };
      setMessages(prev => [...prev, newBotMessage]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Support Chat</h3>
            <button onClick={toggleChat} className="chatbot-close-btn">&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="chatbot-input"
            />
            <button type="submit" className="chatbot-send-btn">Send</button>
          </form>
        </div>
      )}
      <button onClick={toggleChat} className="chatbot-toggle-btn">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </button>
    </div>
  );
};


const Styles = () => (
  <style>{`
    /* Page layout with modern spacing */
    .page-wrap { 
      max-width: 1000px; 
      margin: 0 auto; 
      padding: 2rem 1.5rem;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      min-height: 100vh;
    }
    
    .page-title { 
      font-size: 3rem; 
      font-weight: 800; 
      margin-bottom: 2.5rem;
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #1d4ed8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-align: center;
      letter-spacing: -0.02em;
      position: relative;
    }
    
    .page-title::after {
      content: '';
      position: absolute;
      bottom: -0.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      border-radius: 2px;
    }

    /* Glassmorphism card with enhanced effects */
    .form-card {
      background: rgba(30, 41, 59, 0.7);
      backdrop-filter: blur(20px);
      padding: 3rem;
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 
        0 25px 50px -12px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(148, 163, 184, 0.05),
        inset 0 1px 0 rgba(148, 163, 184, 0.1);
      position: relative;
      overflow: hidden;
    }
    
    .form-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.3), transparent);
    }

    /* Form controls with modern styling */
    .form-group { 
      margin-bottom: 2rem; 
      position: relative;
    }
    
    .form-label {
      display: block;
      margin-bottom: 0.75rem;
      color: #f1f5f9;
      font-weight: 600;
      font-size: 1.05rem;
      letter-spacing: 0.3px;
      position: relative;
    }

    .form-control {
      width: 100%;
      padding: 1rem 1.25rem;
      background: rgba(51, 65, 85, 0.6);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(148, 163, 184, 0.2);
      border-radius: 14px;
      color: #f8fafc;
      font-size: 1rem;
      outline: none;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      box-shadow: 
        0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    
    .form-control::placeholder { 
      color: #94a3b8; 
      font-style: italic;
    }
    
    .form-control:focus {
      border-color: #60a5fa;
      box-shadow: 
        0 0 0 4px rgba(96, 165, 250, 0.15),
        0 8px 25px -8px rgba(96, 165, 250, 0.3);
      background: rgba(51, 65, 85, 0.8);
      transform: translateY(-1px);
    }
    
    .form-control:hover:not(:focus) {
      border-color: rgba(148, 163, 184, 0.4);
      background: rgba(51, 65, 85, 0.7);
    }
    
    .form-control.invalid { 
      border-color: #f87171;
      background: rgba(127, 29, 29, 0.1);
    }
    
    .form-control.invalid:focus { 
      box-shadow: 
        0 0 0 4px rgba(248, 113, 113, 0.2),
        0 8px 25px -8px rgba(248, 113, 113, 0.3);
    }

    /* Enhanced textarea */
    .textarea {
      min-height: 180px;
      line-height: 1.6;
      resize: vertical;
      font-family: inherit;
    }

    /* Label row with better spacing */
    .label-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 1rem;
      margin-bottom: 0.75rem;
    }
    
    .muted { 
      color: #94a3b8; 
      font-size: 0.875rem;
      font-weight: 500;
    }
    
    .counter { 
      color: #94a3b8; 
      font-size: 0.875rem;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    /* Enhanced helper and error text */
    .help { 
      color: #94a3b8; 
      font-size: 0.875rem; 
      margin-top: 0.5rem;
      font-style: italic;
    }
    
    .error { 
      color: #fca5a5; 
      font-size: 0.9rem; 
      margin-top: 0.5rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .error::before {
      content: '⚠';
      font-size: 1rem;
    }

    /* Modern file list */
    .file-list { 
      list-style: none; 
      padding: 0; 
      margin-top: 1.5rem; 
      space-y: 0.75rem;
    }
    
    .file-list-item {
      display: flex; 
      justify-content: space-between; 
      align-items: center;
      background: rgba(45, 55, 72, 0.6);
      backdrop-filter: blur(10px);
      padding: 1rem 1.25rem; 
      border-radius: 12px;
      margin-bottom: 0.75rem; 
      font-size: 0.95rem; 
      border: 1px solid rgba(148, 163, 184, 0.15);
      transition: all 0.2s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .file-list-item:hover {
      background: rgba(45, 55, 72, 0.8);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .remove-file-btn {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #fca5a5;
      cursor: pointer;
      font-size: 1.3rem;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      font-weight: bold;
    }
    
    .remove-file-btn:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
      color: #ef4444;
      transform: scale(1.1);
    }

    /* Premium button with gradient and effects */
    .btn { 
      padding: 1rem 2rem; 
      border-radius: 14px; 
      border: none; 
      cursor: pointer; 
      font-weight: 700;
      font-size: 1.1rem;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      min-width: 200px;
    }
    
    .btn-primary { 
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
      color: #ffffff;
      box-shadow: 
        0 8px 25px -8px rgba(59, 130, 246, 0.4),
        0 4px 12px -4px rgba(0, 0, 0, 0.1);
    }
    
    .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.6s ease;
    }
    
    .btn-primary:hover::before {
      left: 100%;
    }
    
    .btn-primary:hover { 
      transform: translateY(-2px);
      box-shadow: 
        0 12px 35px -8px rgba(59, 130, 246, 0.5),
        0 8px 20px -4px rgba(0, 0, 0, 0.15);
    }
    
    .btn-primary:active {
      transform: translateY(0);
    }
    
    .btn-primary:disabled { 
      background: linear-gradient(135deg, #64748b, #475569);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .btn-primary:disabled::before {
      display: none;
    }

    /* Floating animation for the form */
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-5px); }
    }
    
    .form-card {
      animation: float 6s ease-in-out infinite;
    }

    /* Responsive enhancements */
    @media (max-width: 768px) {
      .page-wrap { 
        padding: 1.5rem 1rem; 
      }
      
      .page-title { 
        font-size: 2.5rem; 
      }
      
      .form-card { 
        padding: 2rem 1.5rem; 
      }
      
      .form-control {
        padding: 0.875rem 1rem;
      }
      
      .btn {
        min-width: 100%;
        padding: 1rem;
      }
    }

    /* Enhanced File Dropzone Styling */
    .file-dropzone {
      border: 2px dashed rgba(96, 165, 250, 0.4);
      border-radius: 16px;
      padding: 2.5rem 2rem;
      text-align: center;
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(51, 65, 85, 0.2) 100%);
      backdrop-filter: blur(10px);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      margin-top: 0.75rem;
    }
    
    .file-dropzone::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(96, 165, 250, 0.1) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    
    .file-dropzone:hover::before {
      opacity: 1;
    }
    
    .file-dropzone:hover {
      border-color: rgba(96, 165, 250, 0.6);
      background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(51, 65, 85, 0.4) 100%);
      transform: translateY(-2px);
      box-shadow: 0 10px 30px -10px rgba(96, 165, 250, 0.3);
    }
    
    .file-dropzone.dragover {
      border-color: #60a5fa;
      background: linear-gradient(135deg, rgba(96, 165, 250, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%);
      transform: scale(1.02);
      box-shadow: 
        0 0 0 4px rgba(96, 165, 250, 0.2),
        0 15px 40px -10px rgba(96, 165, 250, 0.4);
    }
    
    .file-dropzone-content {
      position: relative;
      z-index: 1;
    }
    
    .file-dropzone-icon {
      font-size: 3rem;
      color: #60a5fa;
      margin-bottom: 1rem;
      filter: drop-shadow(0 4px 8px rgba(96, 165, 250, 0.3));
    }
    
    .file-dropzone-text {
      color: #f1f5f9;
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      letter-spacing: 0.3px;
    }
    
    .file-dropzone-subtext {
      color: #94a3b8;
      font-size: 0.9rem;
      font-style: italic;
    }
    
    .file-dropzone-input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
    
    /* File type icons for different file types */
    .file-list-item {
      position: relative;
    }
    
    .file-list-item::before {
      content: '📄';
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }
    
    .file-list-item[data-type*="image"]::before {
      content: '🖼️';
    }
    
    .file-list-item[data-type*="pdf"]::before {
      content: '📋';
    }
    
    /* Enhanced file upload button */
    .file-upload-btn {
      background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.2s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-top: 1rem;
      box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
    }
    
    .file-upload-btn:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(96, 165, 250, 0.4);
    }

    /* Custom scrollbar */
    .textarea::-webkit-scrollbar {
      width: 8px;
    }
    
    .textarea::-webkit-scrollbar-track {
      background: rgba(51, 65, 85, 0.3);
      border-radius: 4px;
    }
    
    .textarea::-webkit-scrollbar-thumb {
      background: rgba(148, 163, 184, 0.5);
      border-radius: 4px;
    }
    
    .textarea::-webkit-scrollbar-thumb:hover {
      background: rgba(148, 163, 184, 0.7);
    }

    /* Focus indicators for accessibility */
    .form-control:focus-visible {
      outline: 2px solid #60a5fa;
      outline-offset: 2px;
    }
    
    .btn:focus-visible {
      outline: 2px solid #60a5fa;
      outline-offset: 2px;
    }

    /* Chatbot Styling */
    .chatbot-container {
      position: fixed;
      bottom: 25px;
      right: 25px;
      z-index: 1000;
    }

    .chatbot-toggle-btn {
      width: 65px;
      height: 65px;
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
      color: white;
      border-radius: 50%;
      border: none;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 8px 25px -8px rgba(59, 130, 246, 0.6);
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .chatbot-toggle-btn:hover {
      transform: scale(1.1) rotate(15deg);
      box-shadow: 0 12px 35px -8px rgba(59, 130, 246, 0.7);
    }

    .chatbot-window {
      position: absolute;
      bottom: 85px; /* Position above the toggle button */
      right: 0;
      width: 370px;
      height: 500px;
      background: rgba(30, 41, 59, 0.8);
      backdrop-filter: blur(15px);
      border-radius: 20px;
      border: 1px solid rgba(148, 163, 184, 0.2);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .chatbot-header {
      padding: 1rem 1.5rem;
      background: rgba(51, 65, 85, 0.5);
      border-bottom: 1px solid rgba(148, 163, 184, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .chatbot-header h3 {
      margin: 0;
      color: #f1f5f9;
      font-weight: 600;
    }

    .chatbot-close-btn {
      background: none;
      border: none;
      color: #94a3b8;
      font-size: 1.75rem;
      cursor: pointer;
      transition: color 0.2s ease;
    }

    .chatbot-close-btn:hover {
      color: #f1f5f9;
    }

    .chatbot-messages {
      flex-grow: 1;
      padding: 1.5rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .chatbot-messages::-webkit-scrollbar { width: 6px; }
    .chatbot-messages::-webkit-scrollbar-track { background: transparent; }
    .chatbot-messages::-webkit-scrollbar-thumb { background: rgba(148, 163, 184, 0.4); border-radius: 3px; }
    .chatbot-messages::-webkit-scrollbar-thumb:hover { background: rgba(148, 163, 184, 0.6); }

    .message {
      padding: 0.75rem 1.25rem;
      border-radius: 18px;
      max-width: 80%;
      line-height: 1.5;
      color: #f8fafc;
      word-wrap: break-word;
    }

    .message.bot {
      background: rgba(51, 65, 85, 0.9);
      border-bottom-left-radius: 4px;
      align-self: flex-start;
    }

    .message.user {
      background: #3b82f6;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }

    .chatbot-input-form {
      display: flex;
      padding: 1rem;
      border-top: 1px solid rgba(148, 163, 184, 0.2);
      background: rgba(30, 41, 59, 0.6);
    }

    .chatbot-input {
      flex-grow: 1;
      padding: 0.75rem 1rem;
      background: rgba(51, 65, 85, 0.6);
      border: 2px solid rgba(148, 163, 184, 0.2);
      border-radius: 12px;
      color: #f8fafc;
      font-size: 1rem;
      outline: none;
      transition: border-color 0.2s ease;
    }

    .chatbot-input:focus {
      border-color: #60a5fa;
    }

    .chatbot-send-btn {
      margin-left: 0.75rem;
      padding: 0.75rem 1.25rem;
      border: none;
      background: #3b82f6;
      color: white;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .chatbot-send-btn:hover {
      background: #2563eb;
    }

    @media (max-width: 768px) {
      .chatbot-window {
        width: 100%;
        height: 100%;
        max-width: 100vw;
        max-height: 100vh;
        border-radius: 0;
        bottom: 0;
        right: 0;
      }
      .chatbot-toggle-btn {
        bottom: 15px;
        right: 15px;
      }
    }
  `}</style>
);

const MIN_DESC = 10;
const MAX_DESC = 500;

const NewComplaintPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('INFRASTRUCTURE');

  // Identity
  const [username, setUsername] = useState('');       // used for /my and submit
  const [submittedBy, setSubmittedBy] = useState(''); // display name on ticket

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    description: false,
    submittedBy: false,
    username: false,
  });

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedName = localStorage.getItem('submittedBy');
    if (savedUsername) setUsername(savedUsername);
    if (savedName) setSubmittedBy(savedName);
  }, []);

  const descLen = description.length;
  const remaining = MAX_DESC - descLen;

  const errors = useMemo(() => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required.';
    if (descLen < MIN_DESC) e.description = `Description must be at least ${MIN_DESC} characters.`;
    if (descLen > MAX_DESC) e.description = `Description must be at most ${MAX_DESC} characters.`;
    if (!submittedBy.trim()) e.submittedBy = 'Your name is required.';
    if (!username.trim()) e.username = 'Username is required (used to link your complaint).';
    return e;
  }, [title, descLen, submittedBy, username]);

  const handleFilesSelected = (selectedFiles) => {
    const arr = Array.from(selectedFiles || []);
    setFiles(prev => [...prev, ...arr]);
  };

  const removeFile = (fileName) => {
    setFiles(prev => prev.filter(f => f.name !== fileName));
  };

  const parseSpringValidation = (err) => {
    const data = err?.response?.data;
    if (!data) return err?.message || 'Request failed';
    if (data.errors && typeof data.errors === 'object') {
      const msgs = [];
      Object.entries(data.errors).forEach(([field, arr]) => {
        if (Array.isArray(arr) && arr.length) msgs.push(`${field}: ${arr[0]}`);
      });
      if (msgs.length) return msgs.join('\n');
    }
    if (data.detail) return data.detail;
    if (data.message) return data.message;
    const raw = String(data);
    if (raw.includes('size must be')) {
      return 'Validation failed: description must be between 10 and 500 characters.';
    }
    return 'Request failed';
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setTouched({ title: true, description: true, submittedBy: true, username: true });

    if (Object.keys(errors).length > 0) {
      toast.error('Please fix the highlighted errors.');
      return;
    }

    setLoading(true);
    try {
      await complaintService.submitComplaint({
        title: title.trim(),
        description: description.trim(),
        category,
        submittedBy: submittedBy.trim(),
        username: username.trim(),
        files,
      });

      localStorage.setItem('username', username.trim());
      localStorage.setItem('submittedBy', submittedBy.trim());

      toast.success('Complaint submitted successfully!');
      setTitle('');
      setDescription('');
      setCategory('INFRASTRUCTURE');
      setFiles([]);
      setTouched({ title: false, description: false, submittedBy: false, username: false });
    } catch (err) {
      console.error('Submit failed:', err?.response?.data || err);
      toast.error(parseSpringValidation(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Styles />
      <div className="page-wrap">
        <h1 className="page-title">Submit a New Complaint</h1>

        <div className="form-card">
          <div onSubmit={handleSubmit}>
            {/* Title */}
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className={`form-control ${touched.title && errors.title ? 'invalid' : ''}`}
                value={title}
                placeholder="e.g., Streetlight not working near Park Road"
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, title: true }))}
              />
              {touched.title && errors.title && <div className="error">{errors.title}</div>}
            </div>

            {/* Description */}
            <div className="form-group">
              <div className="label-row">
                <label className="form-label" style={{ marginBottom: 0 }}>Description *</label>
                <span className="counter">{remaining}/{MAX_DESC}</span>
              </div>
              <textarea
                className={`form-control textarea ${touched.description && errors.description ? 'invalid' : ''}`}
                value={description}
                placeholder="Describe the issue with clear details such as location, time, and what happened…"
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, description: true }))}
                minLength={MIN_DESC}
                maxLength={MAX_DESC}
              />
              {touched.description && errors.description
                ? <div className="error">{errors.description}</div>
                : <div className="help">Be specific and include landmarks or addresses if possible.</div>}
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category *</label>
              <CategorySelect
                value={category}
                onChange={(val) => {
                  const next = typeof val === 'string' ? val : val?.target?.value ?? '';
                  setCategory(next);
                }}
              />
            </div>

            {/* Username */}
            <div className="form-group">
              <label className="form-label">Username (for My Complaints) *</label>
              <input
                type="text"
                className={`form-control ${touched.username && errors.username ? 'invalid' : ''}`}
                value={username}
                placeholder="e.g., citizen1"
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, username: true }))}
              />
              {touched.username && errors.username && <div className="error">{errors.username}</div>}
            </div>

            {/* Submitted By (display name) */}
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input
                type="text"
                className={`form-control ${touched.submittedBy && errors.submittedBy ? 'invalid' : ''}`}
                value={submittedBy}
                placeholder="Your full name"
                onChange={(e) => setSubmittedBy(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, submittedBy: true }))}
              />
              {touched.submittedBy && errors.submittedBy && <div className="error">{errors.submittedBy}</div>}
            </div>

            {/* Attachments */}
            <div className="form-group">
              <div className="label-row">
                <label className="form-label" style={{ marginBottom: 0 }}>Attachments (Optional)</label>
                <span className="muted">Images/PDF up to 5 files</span>
              </div>
              
              {/* Enhanced File Dropzone */}
              <div className="file-dropzone" onClick={() => document.getElementById('file-input').click()}>
                <input
                  id="file-input"
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  className="file-dropzone-input"
                  onChange={(e) => handleFilesSelected(e.target.files)}
                />
                <div className="file-dropzone-content">
                  <div className="file-dropzone-icon">📎</div>
                  <div className="file-dropzone-text">
                    Drag 'n' drop files here, or click to select
                  </div>
                  <div className="file-dropzone-subtext">
                    Support for images and PDF files
                  </div>
                  <button type="button" className="file-upload-btn">
                    Choose Files
                  </button>
                </div>
              </div>
              
              {files.length > 0 && (
                <ul className="file-list">
                  {files.map((file, i) => (
                    <li 
                      key={i} 
                      className="file-list-item"
                      data-type={file.type}
                    >
                      <span>{file.name}</span>
                      <button
                        type="button"
                        className="remove-file-btn"
                        onClick={() => removeFile(file.name)}
                        aria-label={`Remove ${file.name}`}
                      >
                        &times;
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div type="submit" className="btn btn-primary" disabled={loading} onClick={handleSubmit} style={{cursor: loading ? 'not-allowed' : 'pointer'}}>
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </div>
          </div>
        </div>
      </div>
      <Chatbot />
    </>
  );
};

export default NewComplaintPage;