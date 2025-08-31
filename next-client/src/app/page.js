'use client';
import { useState } from 'react';
import DropZone from '@/components/DropZone';
import api from '@/lib/api';

export default function Home() {
    const [resume, setResume] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!resume) return;
        setIsLoading(true);
        setFeedback(null);
        try {
            const { data } = await api.post('/resumes/analyze', {
                resumeId: resume._id,
                jobTitle: 'Software Engineer',
                industry: 'Technology',
            });
            setFeedback(data.analysis);
        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <main className="container mx-auto p-4 sm:p-8">
            <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">AI Resume Analyzer</h1>
                <p className="text-gray-600 mb-8">Get instant, AI-powered feedback to improve your resume.</p>
            </div>

            <div className="max-w-md mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">Step 1: Login or Register</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const email = e.target.email.value;
                    const password = e.target.password.value;
                    try {
                        const { data } = await api.post('/auth/login', { email, password });
                        localStorage.setItem('token', data.token);
                        alert('Logged in successfully!');
                    } catch {
                        try {
                            const { data } = await api.post('/auth/register', { email, password });
                            localStorage.setItem('token', data.token);
                            alert('Registered and logged in successfully!');
                        } catch (regError) {
                            alert('Registration failed. The user might already exist.');
                        }
                    }
                }}>
                    <input type="email" name="email" placeholder="test@example.com" required className="w-full p-2 mb-2 border rounded" />
                    <input type="password" name="password" placeholder="password123" required className="w-full p-2 mb-4 border rounded" />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors">Login / Register</button>
                </form>
            </div>

            <div className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">Step 2: Upload Your Resume</h2>
                <DropZone onUploadSuccess={setResume} />
                {resume && (
                    <div className="mt-4 text-center">
                        <p className="text-green-600">Uploaded: <strong>{resume.filename}</strong></p>
                    </div>
                )}
            </div>

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3 text-center">Step 3: Get Feedback</h2>
                <div className="text-center">
                    <button onClick={handleAnalyze} disabled={isLoading || !resume} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg disabled:bg-gray-400 hover:bg-green-700 transition-colors">
                        {isLoading ? 'Analyzing...' : 'Analyze Resume'}
                    </button>
                    {!resume && <p className="text-sm text-gray-500 mt-2">Please upload a resume first.</p>}
                </div>
            </div>

            {feedback && (
                <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Analysis Complete!</h2>
                    <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap text-sm leading-6">{JSON.stringify(feedback, null, 2)}</pre>
                </div>
            )}
        </main>
    );
}