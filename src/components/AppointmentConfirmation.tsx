import { useRef } from 'react';
import { Doctor } from '@/types';
import { formatDate } from '@/lib/utils';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface AppointmentConfirmationProps {
  doctor: Doctor;
  appointment: any;
  onRegister: () => void;
}

export default function AppointmentConfirmation({
  doctor,
  appointment,
  onRegister,
}: AppointmentConfirmationProps) {
  const confirmationRef = useRef<HTMLDivElement>(null);

  const downloadAsPDF = async () => {
    if (!confirmationRef.current) return;
    
    const canvas = await html2canvas(confirmationRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`appointment-${appointment.id}.pdf`);
  };

  const downloadAsImage = async () => {
    if (!confirmationRef.current) return;
    
    const canvas = await html2canvas(confirmationRef.current);
    const link = document.createElement('a');
    link.download = `appointment-${appointment.id}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Confirmed!</h2>
        <p className="text-gray-600 mt-1">
          Your appointment has been successfully scheduled.
        </p>
      </div>

      <div
        ref={confirmationRef}
        className="bg-gray-50 p-6 rounded-md border border-gray-200 mb-6"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {doctor.name}
            </h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              Appointment ID
            </p>
            <p className="text-sm text-gray-600">{appointment.id}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-900">Patient</p>
            <p className="text-sm text-gray-600">{appointment.patientName}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Contact</p>
            <p className="text-sm text-gray-600">{appointment.patientEmail}</p>
            <p className="text-sm text-gray-600">{appointment.patientPhone}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Date</p>
            <p className="text-sm text-gray-600">
              {formatDate(appointment.date)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Time</p>
            <p className="text-sm text-gray-600">{appointment.time}</p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm font-medium text-gray-900">Location</p>
          <p className="text-sm text-gray-600">{doctor.location.address}</p>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Please arrive 15 minutes before your scheduled appointment time.
            If you need to reschedule, please contact us at least 24 hours in advance.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={downloadAsPDF}
          className="btn-primary flex-1 flex justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
              clipRule="evenodd"
            />
          </svg>
          Download PDF
        </button>
        <button
          onClick={downloadAsImage}
          className="btn-secondary flex-1 flex justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          Download Image
        </button>
      </div>

      <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
        <h3 className="text-sm font-medium text-blue-800">
          Create an account to manage your appointments
        </h3>
        <p className="text-sm text-blue-600 mt-1">
          Register to view, reschedule, or cancel your appointments anytime.
        </p>
        <button
          onClick={onRegister}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

