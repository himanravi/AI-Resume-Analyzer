'use client';
import { useState, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import api from '@/lib/api';

export default function LoginPage() {
    const [isLoginView, setIsLoginView] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const endpoint = isLoginView ? '/auth/login' : '/auth/register';

        try {
            const { data } = await api.post(endpoint, { email, password });
            login(data.token); // Use the login function from context
        } catch (err) {
            setError(isLoginView ? 'Login failed. Invalid credentials.' : 'Registration failed. User may already exist.');
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div>
                    <h1 className="text-2xl font-bold text-center">
                        {isLoginView ? 'Welcome Back!' : 'Create an Account'}
                    </h1>
                    <p className="text-center text-gray-500">AI Resume Analyzer</p>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="email" 
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className="w-full p-3 border rounded-md"
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="w-full p-3 border rounded-md"
                    />
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button type="submit" className="w-full py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        {isLoginView ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="text-center">
                    <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm text-blue-600 hover:underline">
                        {isLoginView ? 'Need an account? Sign Up' : 'Already have an account? Login'}
                    </button>
                </div>
            </div>
        </div>
    );
}