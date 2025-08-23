import React, { useState, useCallback } from "react";
import { Upload, Image, FileText, Video, X, Check, AlertTriangle, Camera, File, Trash2, Eye } from "lucide-react";

const SUPPORTED_FORMATS = {
  images: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  videos: ['mp4', 'mov', 'avi', 'mkv'],
  documents: ['pdf', 'doc', 'docx']
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 10;

const Styles = () => (
  <style>{`
    * {
      box-sizing: border-box;
    }
    
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    
    .upload-app {
      min-height: 100vh;
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
      color: white;
      padding: 2rem;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .main-title {
      font-size: 3rem;
      font-weight: 800;
      background: linear-gradient(135deg, #60a5fa, #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin: 0 0 0.5rem;
    }
    
    .subtitle {
      color: #cbd5e1;
      font-size: 1.125rem;
    }
    
    .grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
    }
    
    @media (max-width: 1024px) {
      .grid {
        grid-template-columns: 1fr;
      }
    }
    
    .card {
      background: rgba(30, 41, 59, 0.5);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 1rem;
      padding: 2rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin: 0 0 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .card-description {
      color: #cbd5e1;
      margin: 0 0 2rem;
    }
    
    .upload-icon {
      color: #60a5fa;
    }
    
    .dropzone {
      border: 2px dashed rgba(96, 165, 250, 0.3);
      background: rgba(15, 23, 42, 0.5);
      border-radius: 1rem;
      padding: 3rem 2rem;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .dropzone:hover {
      border-color: #60a5fa;
      background: rgba(15, 23, 42, 0.7);
      transform: translateY(-2px);
    }
    
    .dropzone.dragover {
      border-color: #60a5fa;
      background: rgba(59, 130, 246, 0.1);
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
    }
    
    .dropzone-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    
    .dropzone-icon {
      width: 4rem;
      height: 4rem;
      color: #60a5fa;
      stroke-width: 1;
    }
    
    .dropzone-text {
      font-size: 1.25rem;
      font-weight: 600;
      color: white;
      margin: 0;
    }
    
    .dropzone-subtext {
      color: #94a3b8;
      font-size: 0.875rem;
      margin: 0;
    }
    
    .file-input {
      display: none;
    }
    
    .preview-section {
      margin-top: 2rem;
    }
    
    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .preview-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .clear-all {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.3);
      color: #f87171;
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .clear-all:hover {
      background: rgba(239, 68, 68, 0.3);
      border-color: rgba(239, 68, 68, 0.5);
    }
    
    .file-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1rem;
    }
    
    .file-card {
      background: rgba(15, 23, 42, 0.5);
      border: 1px solid rgba(71, 85, 105, 0.3);
      border-radius: 0.75rem;
      padding: 1rem;
      position: relative;
      transition: all 0.3s ease;
    }
    
    .file-card:hover {
      background: rgba(15, 23, 42, 0.7);
      border-color: rgba(71, 85, 105, 0.5);
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    }
    
    .file-preview {
      width: 100%;
      height: 120px;
      border-radius: 0.5rem;
      object-fit: cover;
      margin-bottom: 0.75rem;
    }
    
    .file-placeholder {
      width: 100%;
      height: 120px;
      background: rgba(51, 65, 85, 0.5);
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.75rem;
      gap: 0.5rem;
    }
    
    .placeholder-icon {
      width: 2rem;
      height: 2rem;
      color: #94a3b8;
    }
    
    .placeholder-text {
      color: #94a3b8;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .file-info {
      text-align: center;
    }
    
    .file-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: white;
      margin: 0 0 0.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .file-size {
      font-size: 0.75rem;
      color: #94a3b8;
      margin: 0;
    }
    
    .file-status {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .status-success {
      background: rgba(16, 185, 129, 0.2);
      color: #10b981;
    }
    
    .status-error {
      background: rgba(239, 68, 68, 0.2);
      color: #f87171;
    }
    
    .remove-file {
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 1.5rem;
      height: 1.5rem;
      background: rgba(0, 0, 0, 0.7);
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      opacity: 0;
    }
    
    .file-card:hover .remove-file {
      opacity: 1;
    }
    
    .remove-file:hover {
      background: rgba(239, 68, 68, 0.8);
      transform: scale(1.1);
    }
    
    .submit-section {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    
    .file-count {
      color: #cbd5e1;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .submit-button {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border: none;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 0.75rem;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }
    
    .submit-button:hover {
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }
    
    .submit-button:disabled {
      background: rgba(71, 85, 105, 0.5);
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }
    
    .sidebar-section {
      margin-bottom: 2rem;
    }
    
    .section-title {
      font-size: 1rem;
      font-weight: 600;
      margin: 0 0 0.75rem;
      color: #cbd5e1;
    }
    
    .input {
      width: 100%;
      background: rgba(15, 23, 42, 0.7);
      border: 2px solid rgba(71, 85, 105, 0.3);
      border-radius: 0.75rem;
      padding: 0.75rem 1rem;
      color: white;
      font-size: 1rem;
      transition: all 0.3s ease;
    }
    
    .input:focus {
      outline: none;
      border-color: #60a5fa;
      box-shadow: 0 0 0 4px rgba(96, 165, 250, 0.1);
      background: rgba(15, 23, 42, 0.9);
    }
    
    .info-list {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      color: #94a3b8;
      font-size: 0.875rem;
      border-bottom: 1px solid rgba(71, 85, 105, 0.2);
    }
    
    .info-item:last-child {
      border-bottom: none;
    }
    
    .info-icon {
      width: 1rem;
      height: 1rem;
      color: #60a5fa;
    }
    
    .upload-stats {
      background: rgba(15, 23, 42, 0.3);
      border-radius: 0.75rem;
      padding: 1rem;
      margin-top: 1rem;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-number {
      font-size: 1.25rem;
      font-weight: 600;
      color: #60a5fa;
      margin: 0;
    }
    
    .stat-label {
      font-size: 0.75rem;
      color: #94a3b8;
      margin: 0;
    }
    
    .error-message {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 0.5rem;
      padding: 0.75rem;
      margin-top: 1rem;
      color: #f87171;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `}</style>
);

const FileCard = ({ file, onRemove, index }) => {
  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return Image;
    if (type.startsWith('video/')) return Video;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const isValidFile = file.size <= MAX_FILE_SIZE;
  const Icon = getFileIcon(file.type);

  return (
    <div className="file-card">
      <button className="remove-file" onClick={() => onRemove(index)}>
        <X style={{ width: '0.75rem', height: '0.75rem' }} />
      </button>
      
      <div className="file-status">
        {isValidFile ? (
          <Check className="status-success" style={{ width: '1rem', height: '1rem' }} />
        ) : (
          <AlertTriangle className="status-error" style={{ width: '1rem', height: '1rem' }} />
        )}
      </div>

      {file.type.startsWith('image/') ? (
        <img src={file.preview} alt={file.name} className="file-preview" />
      ) : (
        <div className="file-placeholder">
          <Icon className="placeholder-icon" />
          <span className="placeholder-text">
            {file.type.includes('pdf') ? 'PDF' : file.type.startsWith('video/') ? 'Video' : 'Document'}
          </span>
        </div>
      )}

      <div className="file-info">
        <p className="file-name" title={file.name}>{file.name}</p>
        <p className="file-size">{formatFileSize(file.size)}</p>
      </div>
    </div>
  );
};

export default function EvidenceUploadPage() {
  const [files, setFiles] = useState([]);
  const [complaintId, setComplaintId] = useState("12");
  const [dragOver, setDragOver] = useState(false);
  const [errors, setErrors] = useState([]);

  const validateFile = (file) => {
    const errors = [];
    const extension = file.name.split('.').pop().toLowerCase();
    const allFormats = [...SUPPORTED_FORMATS.images, ...SUPPORTED_FORMATS.videos, ...SUPPORTED_FORMATS.documents];
    
    if (!allFormats.includes(extension)) {
      errors.push(`${file.name}: Unsupported file format`);
    }
    
    if (file.size > MAX_FILE_SIZE) {
      errors.push(`${file.name}: File size exceeds 10MB limit`);
    }
    
    return errors;
  };

  const processFiles = useCallback((fileList) => {
    const newErrors = [];
    const validFiles = [];

    Array.from(fileList).forEach(file => {
      const fileErrors = validateFile(file);
      newErrors.push(...fileErrors);
      
      if (fileErrors.length === 0) {
        validFiles.push({
          name: file.name,
          type: file.type,
          size: file.size,
          preview: URL.createObjectURL(file),
          file: file
        });
      }
    });

    if (files.length + validFiles.length > MAX_FILES) {
      newErrors.push(`Cannot upload more than ${MAX_FILES} files`);
      const allowedCount = MAX_FILES - files.length;
      validFiles.splice(allowedCount);
    }

    setErrors(newErrors);
    if (validFiles.length > 0) {
      setFiles(prev => [...prev, ...validFiles]);
    }
  }, [files.length]);

  const handleFileSelect = (e) => {
    if (e.target.files?.length) {
      processFiles(e.target.files);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const removeFile = (index) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const clearAllFiles = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
    setErrors([]);
  };

  const handleSubmit = () => {
    const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);
    if (validFiles.length === 0) {
      alert('No valid files to upload!');
      return;
    }
    alert(`✅ Successfully prepared ${validFiles.length} file(s) for complaint #${complaintId}\n\nFiles will be uploaded to the government portal.`);
  };

  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  const validFiles = files.filter(file => file.size <= MAX_FILE_SIZE);

  return (
    <div className="upload-app">
      <Styles />
      
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="main-title">Evidence Upload</h1>
          <p className="subtitle">Attach photos, videos, and documents to support your complaint</p>
        </div>

        <div className="grid">
          {/* Main Upload Section */}
          <div className="card">
            <h2 className="card-title">
              <Camera className="upload-icon" />
              Upload Evidence
            </h2>
            <p className="card-description">
              Drag and drop files here or click to select. Multiple files supported.
            </p>

            <div 
              className={`dropzone ${dragOver ? 'dragover' : ''}`}
              onClick={() => document.getElementById('file-input').click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="dropzone-content">
                <Upload className="dropzone-icon" />
                <p className="dropzone-text">
                  {dragOver ? 'Drop files here' : 'Click to upload or drag & drop'}
                </p>
                <p className="dropzone-subtext">
                  JPG, PNG, MP4, PDF up to 10MB each
                </p>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/*,video/*,.pdf,.doc,.docx"
                onChange={handleFileSelect}
                className="file-input"
              />
            </div>

            {errors.length > 0 && (
              <div className="error-message">
                <AlertTriangle style={{ width: '1rem', height: '1rem' }} />
                <div>
                  {errors.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              </div>
            )}

            {files.length > 0 && (
              <div className="preview-section">
                <div className="preview-header">
                  <h3 className="preview-title">
                    <Eye style={{ width: '1.25rem', height: '1.25rem' }} />
                    File Preview ({files.length})
                  </h3>
                  <button className="clear-all" onClick={clearAllFiles}>
                    <Trash2 style={{ width: '1rem', height: '1rem' }} />
                    Clear All
                  </button>
                </div>

                <div className="file-grid">
                  {files.map((file, index) => (
                    <FileCard
                      key={index}
                      file={file}
                      index={index}
                      onRemove={removeFile}
                    />
                  ))}
                </div>

                <div className="submit-section">
                  <div className="file-count">
                    <File style={{ width: '1rem', height: '1rem' }} />
                    {validFiles.length} of {files.length} files ready to upload
                  </div>
                  <button
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={validFiles.length === 0}
                  >
                    <Upload style={{ width: '1.25rem', height: '1.25rem' }} />
                    Submit Evidence
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="card">
            <div className="sidebar-section">
              <h3 className="section-title">Complaint Details</h3>
              <input
                className="input"
                placeholder="Enter complaint ID"
                value={complaintId}
                onChange={(e) => setComplaintId(e.target.value)}
              />
            </div>

            <div className="sidebar-section">
              <h3 className="section-title">Supported Formats</h3>
              <ul className="info-list">
                <li className="info-item">
                  <Image className="info-icon" />
                  Images: JPG, PNG, GIF, WebP
                </li>
                <li className="info-item">
                  <Video className="info-icon" />
                  Videos: MP4, MOV, AVI, MKV
                </li>
                <li className="info-item">
                  <FileText className="info-icon" />
                  Documents: PDF, DOC, DOCX
                </li>
              </ul>
            </div>

            {files.length > 0 && (
              <div className="upload-stats">
                <h4 className="section-title">Upload Statistics</h4>
                <div className="stats-grid">
                  <div className="stat-item">
                    <p className="stat-number">{files.length}</p>
                    <p className="stat-label">Total Files</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-number">{(totalSize / (1024 * 1024)).toFixed(1)}MB</p>
                    <p className="stat-label">Total Size</p>
                  </div>
                </div>
              </div>
            )}

            <div className="sidebar-section">
              <h3 className="section-title">Guidelines</h3>
              <ul className="info-list">
                <li className="info-item">
                  <Check className="info-icon" />
                  Maximum 10 files per complaint
                </li>
                <li className="info-item">
                  <Check className="info-icon" />
                  Each file up to 10MB
                </li>
                <li className="info-item">
                  <Check className="info-icon" />
                  Clear, well-lit photos work best
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}