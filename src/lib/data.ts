import { Doctor, Appointment, User } from '@/types';

export const doctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    rank: 'Senior Specialist',
    specialty: 'Cardiology',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    location: {
      address: '123 Medical Center Dr, New York, NY',
      latitude: 40.7128,
      longitude: -74.0060,
    },
    schedule: [
      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 3:00 PM' },
    ],
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    rank: 'Chief Physician',
    specialty: 'Neurology',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    location: {
      address: '456 Health Parkway, New York, NY',
      latitude: 40.7282,
      longitude: -73.9942,
    },
    schedule: [
      { day: 'Tuesday', hours: '8:00 AM - 4:00 PM' },
      { day: 'Thursday', hours: '8:00 AM - 4:00 PM' },
      { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
    ],
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    rank: 'Attending Physician',
    specialty: 'Pediatrics',
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    location: {
      address: '789 Children\'s Hospital Blvd, New York, NY',
      latitude: 40.7549,
      longitude: -73.9840,
    },
    schedule: [
      { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Thursday', hours: '8:00 AM - 6:00 PM' },
    ],
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    rank: 'Department Head',
    specialty: 'Orthopedics',
    image: 'https://randomuser.me/api/portraits/men/46.jpg',
    location: {
      address: '321 Sports Medicine Ave, New York, NY',
      latitude: 40.7392,
      longitude: -74.0089,
    },
    schedule: [
      { day: 'Wednesday', hours: '7:00 AM - 3:00 PM' },
      { day: 'Thursday', hours: '7:00 AM - 3:00 PM' },
      { day: 'Friday', hours: '7:00 AM - 3:00 PM' },
    ],
  },
  {
    id: '5',
    name: 'Dr. Olivia Thompson',
    rank: 'Specialist',
    specialty: 'Dermatology',
    image: 'https://randomuser.me/api/portraits/women/26.jpg',
    location: {
      address: '555 Skin Care Center, New York, NY',
      latitude: 40.7489,
      longitude: -73.9680,
    },
    schedule: [
      { day: 'Monday', hours: '10:00 AM - 6:00 PM' },
      { day: 'Wednesday', hours: '10:00 AM - 6:00 PM' },
      { day: 'Friday', hours: '10:00 AM - 4:00 PM' },
    ],
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    rank: 'Associate Professor',
    specialty: 'Ophthalmology',
    image: 'https://randomuser.me/api/portraits/men/29.jpg',
    location: {
      address: '888 Vision Center Rd, New York, NY',
      latitude: 40.7420,
      longitude: -73.9890,
    },
    schedule: [
      { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Saturday', hours: '9:00 AM - 1:00 PM' },
    ],
  },
];

// Mock appointments data
export const appointments: Appointment[] = [];

// Mock users data
export const users: User[] = [];

