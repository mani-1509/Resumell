import React, { useState, useRef } from 'react';

interface FileUploaderProps {
  accept: string;
  maxSize: number;
  onUpload: (file: File) => void;
  onParseError: (error: Error) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept,
  maxSize,
  onUpload,
  onParseError,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      onParseError(new Error(`File size exceeds ${maxSize / 1048576}MB limit`));
      return false;
    }

    const acceptedTypes = accept.split(',').map(t => t.trim());
    const fileExtension = `.${file.name.split('.').pop()}`;
    if (!acceptedTypes.includes(fileExtension)) {
      onParseError(new Error(`File type not accepted. Accepted: ${accept}`));
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(file);
          onUpload(file);
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Upload file by clicking or dragging"
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      style={{
        border: `2px dashed ${isDragging ? '#6366F1' : 'rgba(255, 255, 255, 0.2)'}`,
        borderRadius: '12px',
        padding: '40px',
        textAlign: 'center',
        cursor: 'pointer',
        background: isDragging
          ? 'rgba(99, 102, 241, 0.1)'
          : 'rgba(255, 255, 255, 0.05)',
        transition: 'all 120ms ease',
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      {isUploading ? (
        <div>
          <div style={{ color: '#FFFFFF', marginBottom: '12px' }}>Uploading...</div>
          <div
            style={{
              width: '100%',
              height: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${uploadProgress}%`,
                height: '100%',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                transition: 'width 100ms linear',
              }}
            />
          </div>
          <div style={{ color: '#A1A1AA', fontSize: '14px', marginTop: '8px' }}>
            {uploadProgress}%
          </div>
        </div>
      ) : uploadedFile ? (
        <div>
          <div style={{ color: '#10B981', fontSize: '32px', marginBottom: '8px' }}>✓</div>
          <div style={{ color: '#FFFFFF' }}>{uploadedFile.name}</div>
          <div style={{ color: '#A1A1AA', fontSize: '14px', marginTop: '4px' }}>
            {(uploadedFile.size / 1048576).toFixed(2)} MB
          </div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
          <div style={{ color: '#FFFFFF', fontSize: '16px', marginBottom: '8px' }}>
            Drop your resume here or click to browse
          </div>
          <div style={{ color: '#A1A1AA', fontSize: '14px' }}>
            {accept} • Max {maxSize / 1048576}MB
          </div>
        </div>
      )}
    </div>
  );
};
