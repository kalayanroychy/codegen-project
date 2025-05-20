'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import RegistrationForm from '@/components/RegistrationForm';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registered, setRegistered] = useState(false);
  
  // Get initial data from query params (if coming from appointment booking)
  const initialData = {
    name: searchParams.get('name') || '',
    email: searchParams.get('email') || '',
    phone: searchParams.get('phone') || '',
  };

  const handleRegistration = (userData: any) => {
    // In a real app, this would be sent to a server
    // For now, we'll just show a success message
    setRegistered(true);
    
    // Redirect to home after 3 seconds
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p className="text-gray-600">
          Register to manage your appointments and medical records.
        </p>
      </div>
      
      {registered ? (
        <div className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-green-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Registration Successful!
          </h2>
          <p className="text-gray-600 mb-4">
            Your account has been created successfully.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to home page...
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8">
          <RegistrationForm
            onSubmit={handleRegistration}
            initialData={initialData}
          />
        </div>
      )}
    </div>
  );
}

