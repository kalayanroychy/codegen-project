import { Doctor } from '@/types';

// Calculate distance between two coordinates using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Find nearby doctors based on user's location
export function findNearbyDoctors(
  doctors: Doctor[],
  userLat: number,
  userLon: number,
  maxDistance: number = 10 // Default max distance in km
): Doctor[] {
  return doctors.filter((doctor) => {
    const distance = calculateDistance(
      userLat,
      userLon,
      doctor.location.latitude,
      doctor.location.longitude
    );
    return distance <= maxDistance;
  });
}

// Format date to readable string
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Generate a unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

