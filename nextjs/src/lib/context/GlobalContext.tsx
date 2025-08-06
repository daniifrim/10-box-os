// src/lib/context/GlobalContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createSPASassClientAuthenticated as createSPASassClient } from '@/lib/supabase/client';


type User = {
    email: string;
    id: string;
    registered_at: Date;
};

interface GlobalContextType {
    loading: boolean;
    user: User | null;  // Add this
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);  // Add this

    useEffect(() => {
        async function loadData() {
            try {
                // Development bypass - use dummy data if DEV_BYPASS_AUTH is set
                if (process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === 'true') {
                    setUser({
                        email: 'teacher@example.com',
                        id: 'dev-teacher-123',
                        registered_at: new Date('2024-01-01')
                    });
                    return;
                }

                const supabase = await createSPASassClient();
                const client = supabase.getSupabaseClient();

                // Get user data
                const { data: { user } } = await client.auth.getUser();
                if (user) {
                    setUser({
                        email: user.email!,
                        id: user.id,
                        registered_at: new Date(user.created_at)
                    });
                } else {
                    throw new Error('User not found');
                }

            } catch (error) {
                console.error('Error loading data:', error);
                
                // Fallback to dummy data in development if auth fails
                if (process.env.NODE_ENV === 'development') {
                    console.log('Using development fallback user data');
                    setUser({
                        email: 'dev-user@example.com',
                        id: 'dev-user-123',
                        registered_at: new Date('2024-01-01')
                    });
                }
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <GlobalContext.Provider value={{ loading, user }}>
            {children}
        </GlobalContext.Provider>
    );
}

export const useGlobal = () => {
    const context = useContext(GlobalContext);
    if (context === undefined) {
        throw new Error('useGlobal must be used within a GlobalProvider');
    }
    return context;
};