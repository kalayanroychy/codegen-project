'use client';

import { useState, useEffect } from 'react';
import DoctorCard from '@/components/DoctorCard';
import { doctors } from '@/lib/data';
import { findNearbyDoctors } from '@/lib/utils';

export default function NearbyPage() {
  const [nearbyDoctors, setNearbyDoctors] = useState<typeof doctors>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [maxDistance, setMaxDistance] = useState(10); // Default 10km
  
  const handleFindNearbyDoctors = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          
          // Find nearby doctors
          const nearby = findNearbyDoctors(
            doctors,
            latitude,
            longitude,
            maxDistance
          );
          
          setNearbyDoctors(nearby);
          setLoading(false);
        },
        (err) => {
          setError('Unable to access your location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  };
  
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxDistance(parseInt(e.target.value));
    
    // If user location is already set, update the nearby doctors
    if (userLocation) {
      const nearby = findNearbyDoctors(
        doctors,
        userLocation.latitude,
        userLocation.longitude,
        parseInt(e.target.value)
      );
      setNearbyDoctors(nearby);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Find Nearby Doctors
        </h1>
        <p className="text-gray-600">
          Discover doctors close to your current location.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label htmlFor="distance" className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Distance (km)
            </label>
            <input
              type="range"
              id="distance"
              min="1"
              max="50"
              step="1"
              value={maxDistance}
              onChange={handleDistanceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 km</span>
              <span>{maxDistance} km</span>
              <span>50 km</span>
            </div>
          </div>
          
          <button
            onClick={handleFindNearbyDoctors}
            disabled={loading}
            className="btn-primary flex items-center justify-center gap-2 py-3 md:py-2"
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {loading ? 'Finding Doctors...' : 'Find Nearby Doctors'}
          </button>
        </div>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md border border-red-200">
            {error}
          </div>
        )}
      </div>
      
      {userLocation ? (
        <>
          <h2 className="section-title">
            {nearbyDoctors.length > 0
              ? `Doctors within ${maxDistance} km of your location`
              : 'No doctors found nearby'}
          </h2>
          
          {nearbyDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {nearbyDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-gray-600 mb-4">
                No doctors found within {maxDistance} km of your location.
              </p>
              <p className="text-gray-500">
                Try increasing the distance range or check back later.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12 bg-blue-50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto text-blue-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <p className="text-blue-700 text-lg font-medium mb-2">
            Share Your Location
          </p>
          <p className="text-blue-600 mb-4">
            Click the "Find Nearby Doctors" button to discover doctors in your area.
          </p>
          <p className="text-blue-500 text-sm">
            Your location will only be used to find nearby doctors and will not be stored.
          </p>
        </div>
      )}
    </div>
  );
}

