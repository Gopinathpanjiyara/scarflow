import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const TIMEOUT_DURATION = 3 * 60 * 1000; // 3 minutes in milliseconds

export function useSessionTimeout() {
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout>();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(async () => {
      try {
        // Call logout API
        await fetch('/api/admin/logout', { method: 'POST' });
        // Redirect to login page
        router.push('/admindsh');
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    // Set up event listeners for user activity
    const events = [
      'mousemove',
      'mousedown',
      'keydown',
      'touchstart',
      'scroll',
      'click'
    ];

    // Reset timeout on any user activity
    const handleActivity = () => {
      resetTimeout();
    };

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, handleActivity);
    });

    // Initial timeout
    resetTimeout();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        document.removeEventListener(event, handleActivity);
      });
    };
  }, [router]);

  return resetTimeout;
} 