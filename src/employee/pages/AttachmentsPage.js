import React, { useState } from "react";

const Styles = () => (
  <style>{`
    .title {
      font-size: 2.2rem;
      font-weight: 800;
      margin: 0 0 1.25rem;
      color: #ffffff;
    }
    
    .card {
      background: #151c2b;
      border: 1px solid #24324a;
      border-radius: 14px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    
    .grid {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .muted {
      color: #9ca3af;
      font-size: 0.9rem;
    }
    
    .upload-box {
      border: 2px dashed #3b82f6;
      background: #0b1220;
      border-radius: 12px;
      padding: 2rem 1rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s ease;
      margin-top: 1rem;
    }
    
    .upload-box:hover {
      border-color: #60a5fa;
      background: #0f172a;
    }
    
    .upload-text {
      font-size: 1rem;
      font-weight: 600;
      color: #ffffff;
      margin-bottom: 0.5rem;
    }
    
    .preview-section {
      margin-top: 1.5rem;
    }
    
    .preview-title {
      font-weight: 800;
      color: #ffffff;
      margin-bottom: 1rem;
    }
    
    .thumbs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    
    .thumb {
      background: #0b1220;
      border: 1px solid #24324a;
      border-radius: 10px;
      padding: 0.75rem;
      transition: border-color 0.2s ease;
    }
    
    .thumb:hover {
      border-color: #3b82f6;
    }
    
    .thumb-image {
      width: 100%;
      height: 80px;
      object-fit: cover;
      border-radius: 6px;
      margin-bottom: 0.5rem;
    }
    
    .thumb-placeholder {
      padding: 1.5rem 0;
      color: #9ca3af;
      font-size: 0.8rem;
      text-align: center;
    }
    
    .thumb-name {
      font-size: 0.75rem;
      color: #9ca3af;
      word-break: break-all;
      line-height: 1.2;
    }
    
    .submit-section {
      text-align: right;
    }
    
    .btn {
      background: #3b82f6;
      border: none;
      color: #ffffff;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      font-size: 0.9rem;
      transition: background-color 0.2s ease;
    }
    
    .btn:hover {
      background: #2563eb;
    }
    
    .complaint-info {
      font-weight: 800;
      color: #ffffff;
      margin: 0.5rem 0;
      line-height: 1.4;
    }
    
    .tip {
      color: #9ca3af;
      font-size: 0.85rem;
      font-style: italic;
    }
    
    .hidden-input {
      display: none;
    }
    
    body {
      background: #0f172a;
      color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    @media (max-width: 768px) {
      .title {
        font-size: 1.8rem;
      }
      
      .thumbs {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  `}</style>
);

export default function AttachmentsPage() {
  const [files, setFiles] = useState([]);

  const handleFilePick = (event) => {
    const fileList = Array.from(event.target.files || []);
    const mappedFiles = fileList.map(file => ({
      name: file.name,
      size: file.size,
      type: file.type,
      preview: URL.createObjectURL(file)
    }));
    
    setFiles(prevFiles => [...prevFiles, ...mappedFiles]);
  };

  const handleSubmit = () => {
    alert(`(mock) Uploaded ${files.length} attachment(s) as proof of work`);
  };

  const triggerFileInput = () => {
    document.getElementById("file-picker")?.click();
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return (
        <img 
          alt={file.name} 
          src={file.preview} 
          className="thumb-image"
        />
      );
    }
    
    const fileTypeDisplay = file.type.includes("pdf") ? "PDF" : "Video/Other";
    return <div className="thumb-placeholder">{fileTypeDisplay}</div>;
  };

  return (
    <>
      <Styles />
      <div style={{ padding: '2rem', minHeight: '100vh' }}>
        <h1 className="title">Attachments</h1>
        
        <div className="grid">
          <section className="card">
            <div className="muted">
              Upload images / PDFs as proof of work
            </div>
            
            <div className="upload-box" onClick={triggerFileInput}>
              <div className="upload-text">Click to choose files</div>
              <div className="muted">PNG, JPG, MP4, PDF (mock)</div>
              <input
                id="file-picker"
                type="file"
                multiple
                className="hidden-input"
                onChange={handleFilePick}
                accept="image/*,.pdf,video/*"
              />
            </div>

            {files.length > 0 && (
              <div className="preview-section">
                <div className="preview-title">Preview</div>
                
                <div className="thumbs">
                  {files.map((file, index) => (
                    <div key={index} className="thumb">
                      {renderFilePreview(file)}
                      <div className="thumb-name">{file.name}</div>
                    </div>
                  ))}
                </div>
                
                <div className="submit-section">
                  <button className="btn" onClick={handleSubmit}>
                    Submit Files
                  </button>
                </div>
              </div>
            )}
          </section>

          <aside className="card">
            <div className="muted">Attached to</div>
            <div className="complaint-info">
              Complaint #3 · Water leakage near 5th Ave
            </div>
            <div className="tip">
              Tip: include "before/after" photos for better documentation.
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}