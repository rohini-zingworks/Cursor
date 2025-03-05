'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function Protected() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey');
    
    if (!apiKey) {
      toast.error('No API key found. Please authenticate first.');
      router.push('/background');
      return;
    }

    // Verify the API key is still valid
    const verifyApiKey = async () => {
      try {
        const response = await fetch('/api/validate-key', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ apiKey }),
        });

        const data = await response.json();

        if (!data.valid) {
          toast.error('Invalid or expired API key. Please authenticate again.');
          localStorage.removeItem('apiKey');
          router.push('/background');
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        toast.error('An error occurred while validating your API key.');
        router.push('/background');
      }
    };

    verifyApiKey();
  }, [router]);

  if (!isAuthorized) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Protected Page
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Welcome! You have successfully authenticated with a valid API key.
          </p>
        </div>
        
        <div className="mt-10">
          <button
            onClick={() => {
              localStorage.removeItem('apiKey');
              router.push('/background');
              toast.success('Successfully logged out');
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}