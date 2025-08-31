'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '@/lib/api';

export default function DropZone({ onUploadSuccess }) {
    const onDrop = useCallback(async (acceptedFiles) => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('resume', file);
        try {
            const { data } = await api.post('/resumes/upload', formData);
            onUploadSuccess(data);
            alert('Upload successful!');
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please ensure you are logged in.');
        }
    }, [onUploadSuccess]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
        },
        maxSize: 5 * 1024 * 1024, // 5MB
    });

    return (
        <div {...getRootProps()} className="border-2 border-dashed border-gray-400 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 bg-gray-50">
            <input {...getInputProps()} />
            {isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag & drop your resume here, or click to select a file (PDF, DOCX)</p>
            }
        </div>
    );
}