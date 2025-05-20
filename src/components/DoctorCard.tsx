import Image from 'next/image';
import Link from 'next/link';
import { Doctor } from '@/types';

interface DoctorCardProps {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="card">
      <div className="relative h-48 w-full">
        <Image
          src={doctor.image}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
        <p className="text-sm text-primary-600 font-medium mt-1">{doctor.rank}</p>
        <p className="text-gray-700 mt-2">{doctor.specialty}</p>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900">Schedule:</h4>
          <ul className="mt-2 space-y-1">
            {doctor.schedule.map((slot, index) => (
              <li key={index} className="text-sm text-gray-600">
                {slot.day}: {slot.hours}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6">
          <Link 
            href={`/booking/${doctor.id}`}
            className="btn-primary block text-center"
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

