import React, { useCallback, useState } from 'react';
import { UploadIcon } from '../../constants';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  acceptedTypes: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect, acceptedTypes }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };
  
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  }, [onFileSelect]);


  return (
    <label 
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`flex justify-center w-full h-64 px-4 transition bg-white border-2 ${isDragging ? 'border-cyan-400' : 'border-gray-300'} border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none`}>
      <span className="flex items-center space-x-2">
        <UploadIcon className="w-8 h-8 text-gray-500" />
        <span className="font-medium text-gray-500">
          Drop files to Attach, or
          <span className="text-cyan-500 underline ml-1">browse</span>
        </span>
      </span>
      <input type="file" name="file_upload" className="hidden" accept={acceptedTypes} onChange={handleFileChange} />
    </label>
  );
};

export default FileUpload;