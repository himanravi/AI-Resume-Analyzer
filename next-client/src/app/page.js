'use client';
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/context/AuthContext';
import DropZone from '@/components/DropZone';
import api from '@/lib/api';

// A helper function to create nice titles from the JSON keys (e.g., "summary_feedback" -> "Summary Feedback")
const formatTitle = (title) => {
    return title.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
};

export default function DashboardPage() {
    const { user, loading, logout } = useContext(AuthContext);
    const router = useRouter();
    
    const [resume, setResume] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [isLoadingAnalysis, setIsLoadingAnalysis] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    const handleAnalyze = async () => {
        if (!resume) return;
        setIsLoadingAnalysis(true);
        setFeedback(null);
        try {
            const { data } = await api.post('/resumes/analyze', {
                resumeId: resume._id,
                jobTitle: 'Software Engineer',
                industry: 'Technology',
            });
            
            // ** THE FIX IS HERE **
            // We must parse the 'analysis' string into a real JavaScript object
            setFeedback(JSON.parse(data.analysis)); 

        } catch (error) {
            console.error('Analysis failed:', error);
            alert('Analysis failed. Please try again.');
        } finally {
            setIsLoadingAnalysis(false);
        }
    };

    if (loading || !user) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }

    return (
        <>
            <header className="sticky top-0 z-10 bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Resume Dashboard</h1>
                <button 
                    onClick={logout} 
                    className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                    Logout
                </button>
            </header>

            <main className="container mx-auto p-4 sm:p-8">
                <div className="max-w-2xl mx-auto mb-8 bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-3 text-center">Step 1: Upload Your Resume</h2>
                    <DropZone onUploadSuccess={setResume} />
                    {resume && (
                        <div className="mt-4 text-center">
                            <p className="text-green-600">Uploaded: <strong>{resume.filename}</strong></p>
                        </div>
                    )}
                </div>

                {resume && (
                    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-3 text-center">Step 2: Get Feedback</h2>
                        <div className="text-center">
                            <button onClick={handleAnalyze} disabled={isLoadingAnalysis || !resume} className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg disabled:bg-gray-400 hover:bg-green-700 transition-colors">
                                {isLoadingAnalysis ? 'Analyzing...' : 'Analyze Resume'}
                            </button>
                        </div>
                    </div>
                )}

                {feedback && (
                    <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2">Analysis Complete!</h2>
                        
                        {Object.entries(feedback).map(([key, value]) => (
                            <div key={key} className="mb-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-2">{formatTitle(key)}</h3>
                                <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">{value}</p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}