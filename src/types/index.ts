export interface Doctor {
  id: string;
  name: string;
  rank: string;
  specialty: string;
  image: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  schedule: {
    day: string;
    hours: string;
  }[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointments: string[]; // Array of appointment IDs
}

