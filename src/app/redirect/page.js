"use client"
import React, { useEffect } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const roleRedirectMap = {
  admin: '/admin',

};

export default function Home() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const handleRoleBasedRedirect = () => {
            if (status === 'authenticated' && session?.user?.roles) {
                const primaryRole = session.user.roles[2];                
                const redirectPath = roleRedirectMap[primaryRole] || '/user';                
                router.push(redirectPath);
            } else if (status === 'unauthenticated') {
                signIn();
            }
        };

        handleRoleBasedRedirect();
    }, [session, status, router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-xl font-semibold">Redirecting...</h1>
        </div>
    );
};