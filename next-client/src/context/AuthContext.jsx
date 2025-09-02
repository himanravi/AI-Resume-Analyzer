'use client';
import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check if a token exists in localStorage to keep the user logged in
        const token = localStorage.getItem('token');
        if (token) {
            // In a real app, you'd verify the token with the backend here
            // For now, we'll just assume the token is valid
            setUser({ loggedIn: true });
        }
        setLoading(false);
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setUser({ loggedIn: true });
        router.push('/'); // Redirect to the main dashboard after login
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}