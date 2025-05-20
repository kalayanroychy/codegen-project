import { useState } from 'react';
import { Doctor } from '@/types';
import { generateId } from '@/lib/utils';

interface AppointmentFormProps {
  doctor: Doctor;
  onSubmit: (formData: any) => void;
}

export default function AppointmentForm({ doctor, onSubmit }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create appointment object
    const appointment = {
      id: generateId(),
      doctorId: doctor.id,
      ...formData,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };
    
    onSubmit(appointment);
  };

  // Generate available dates (next 14 days)
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return date.toISOString().split('T')[0];
  });

  // Generate available time slots
  const generateTimeSlots = () => {
    const slots = [];
    const [startHour, startMinute] = doctor.schedule[0]?.hours.split(' - ')[0].split(':');
    const [endHour, endMinute] = doctor.schedule[0]?.hours.split(' - ')[1].split(':');
    
    const start = parseInt(startHour);
    const end = parseInt(endHour);
    
    for (let hour = start; hour < end; hour++) {
      slots.push(`${hour}:00`);
      slots.push(`${hour}:30`);
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="patientName"
          name="patientName"
          required
          className="input-field mt-1"
          value={formData.patientName}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="patientEmail"
          name="patientEmail"
          required
          className="input-field mt-1"
          value={formData.patientEmail}
          onChange={handleChange}
        />
      </div>
      
      <div>
        <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="patientPhone"
          name="patientPhone"
          required
          className="input-field mt-1"
          value={formData.patientPhone}
          onChange={handleChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <select
            id="date"
            name="date"
            required
            className="input-field mt-1"
            value={formData.date}
            onChange={handleChange}
          >
            <option value="">Select a date</option>
            {availableDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time
          </label>
          <select
            id="time"
            name="time"
            required
            className="input-field mt-1"
            value={formData.time}
            onChange={handleChange}
          >
            <option value="">Select a time</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-8">
        <button type="submit" className="btn-primary w-full">
          Confirm Appointment
        </button>
      </div>
    </form>
  );
}

