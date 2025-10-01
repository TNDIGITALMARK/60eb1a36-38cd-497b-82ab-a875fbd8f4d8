'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic'

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to Ghoulish app for stealth access
    router.push('/ghoulish');
  }, [router]);

  // Show minimal loading while redirecting (for stealth purposes)
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
      </div>
    </div>
  );
}