import React, { useState, useCallback } from 'react';

const FileDropzone = ({ onFilesSelected }) => {
    const [isDragActive, setIsDragActive] = useState(false);

    // Prevents the browser's default behavior for drag events
    const handleDrag = useCallback((event) => {
        event.preventDefault();
        event.stopPropagation();
    }, []);

    const handleDragIn = useCallback((event) => {
        handleDrag(event);
        setIsDragActive(true);
    }, [handleDrag]);

    const handleDragOut = useCallback((event) => {
        handleDrag(event);
        setIsDragActive(false);
    }, [handleDrag]);

    const handleDrop = useCallback((event) => {
        handleDrag(event);
        setIsDragActive(false);
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            onFilesSelected(Array.from(event.dataTransfer.files));
            event.dataTransfer.clearData();
        }
    }, [handleDrag, onFilesSelected]);

    const handleFileChange = (event) => {
        if (event.target.files) {
            onFilesSelected(Array.from(event.target.files));
        }
    };

    return (
        // Add the drag event handlers to this div
        <div 
            className={`file-dropzone ${isDragActive ? 'active' : ''}`}
            onDragEnter={handleDragIn}
            onDragLeave={handleDragOut}
            onDragOver={handleDragIn}
            onDrop={handleDrop}
        >
            <input 
                type="file" 
                multiple 
                onChange={handleFileChange} 
                id="file-input"
                className="file-input"
            />
            <label htmlFor="file-input" className="file-label">
                <p>Drag 'n' drop files here, or <strong>click to select</strong></p>
            </label>
        </div>
    );
};

export default FileDropzone;