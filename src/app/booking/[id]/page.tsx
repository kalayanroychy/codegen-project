'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { doctors } from '@/lib/data';
import AppointmentForm from '@/components/AppointmentForm';
import AppointmentConfirmation from '@/components/AppointmentConfirmation';

export default function BookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [appointment, setAppointment] = useState<any>(null);
  
  // Find the doctor by ID
  const doctor = doctors.find((doc) => doc.id === params.id);
  
  if (!doctor) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h2>
        <p className="text-gray-600 mb-8">
          The doctor you are looking for does not exist.
        </p>
        <button
          onClick={() => router.push('/')}
          className="btn-primary"
        >
          Go Back to Home
        </button>
      </div>
    );
  }
  
  const handleAppointmentSubmit = (formData: any) => {
    // In a real app, this would be sent to a server
    // For now, we'll just store it in state
    setAppointment(formData);
  };
  
  const handleRegister = () => {
    if (appointment) {
      router.push(`/register?name=${encodeURIComponent(appointment.patientName)}&email=${encodeURIComponent(appointment.patientEmail)}&phone=${encodeURIComponent(appointment.patientPhone)}`);
    } else {
      router.push('/register');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {!appointment ? (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book an Appointment
            </h1>
            <p className="text-gray-600">
              Fill out the form below to schedule your appointment with {doctor.name}.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 relative">
                <div className="h-64 md:h-full relative">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-primary-600 text-white p-4">
                  <h2 className="text-xl font-semibold">{doctor.name}</h2>
                  <p className="text-primary-100">{doctor.specialty}</p>
                </div>
              </div>
              
              <div className="md:w-2/3 p-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Doctor Information
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Rank:</span> {doctor.rank}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Specialty:</span> {doctor.specialty}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Location:</span> {doctor.location.address}
                  </p>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Available Schedule
                  </h3>
                  <ul className="space-y-1">
                    {doctor.schedule.map((slot, index) => (
                      <li key={index} className="text-gray-700">
                        <span className="font-medium">{slot.day}:</span> {slot.hours}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <AppointmentForm
                  doctor={doctor}
                  onSubmit={handleAppointmentSubmit}
                />
              </div>
            </div>
          </div>
        </>
      ) : (
        <AppointmentConfirmation
          doctor={doctor}
          appointment={appointment}
          onRegister={handleRegister}
        />
      )}
    </div>
  );
}

