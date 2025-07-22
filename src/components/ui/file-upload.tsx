"use client";

import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';

interface FileUploadProps {
  onUploadComplete: (fileUrl: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  type?: 'resume' | 'image';
  required?: boolean;
}

export function FileUpload({ 
  onUploadComplete, 
  accept = ".pdf,.doc,.docx,image/*", 
  maxSize = 5, // 5MB default
  type = 'resume',
  required = false
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      handleFile(files[0]);
    }
  };

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size should not exceed ${maxSize}MB`;
    }

    // Check file type for resume
    if (type === 'resume') {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        return 'Please upload a PDF or Word document';
      }
    }

    // Check file type for image
    if (type === 'image') {
      if (!file.type.startsWith('image/')) {
        return 'Please upload a valid image file (JPEG, PNG, or GIF)';
      }
    }

    return null;
  };

  const handleFile = async (file: File) => {
    setError(null);

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setFileName(file.name);
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      onUploadComplete(data.fileUrl);
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload file. Please try again.');
      setFileName(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onUploadComplete(''); // Clear the uploaded file URL
  };

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
          ${error ? 'border-red-500 bg-red-50' : ''}
          ${fileName ? 'border-green-500 bg-green-50' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          required={required}
        />

        {isUploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            <p className="mt-2 text-sm text-gray-500">Uploading...</p>
          </div>
        ) : fileName ? (
          <div className="flex items-center justify-center gap-2">
            {type === 'resume' ? (
              <FileText className="w-8 h-8 text-green-500" />
            ) : (
              <ImageIcon className="w-8 h-8 text-green-500" />
            )}
            <span className="text-sm text-gray-600">{fileName}</span>
            <button
              type="button"
              onClick={handleRemove}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">
              Drag & drop your {type === 'resume' ? 'resume' : 'image'} here, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {type === 'resume' ? 'PDF or Word documents' : 'JPEG, PNG or GIF'} up to {maxSize}MB
            </p>
            {required && (
              <p className="text-xs text-red-500 mt-1">*Required</p>
            )}
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 