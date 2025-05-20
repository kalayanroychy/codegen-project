# Doctor Appointment System

A professional and responsive doctor appointment system website built with Next.js and Tailwind CSS.

## Features

- **Doctor Listings**: View all available doctors with their details (name, rank, specialty, schedule)
- **Appointment Booking**: Book appointments with doctors
- **Appointment Confirmation**: Print or download appointment details as PDF or image
- **User Registration**: Register to manage appointments
- **Nearby Doctors**: Find doctors based on your current location
- **Responsive Design**: Works on all devices (mobile, tablet, desktop)

## Tech Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **HTML2Canvas**: For capturing appointment details as images
- **jsPDF**: For generating PDF documents

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/doctor-appointment-system.git
   cd doctor-appointment-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Next.js app router pages
- `src/components`: Reusable React components
- `src/lib`: Utility functions and data
- `src/types`: TypeScript type definitions

## Key Pages

- `/`: Home page with doctor listings
- `/booking/[id]`: Appointment booking page for a specific doctor
- `/register`: User registration page
- `/nearby`: Find nearby doctors based on geolocation

## Screenshots

(Screenshots will be added here)

## Future Enhancements

- User authentication and login
- Admin dashboard for doctors
- Appointment management (reschedule, cancel)
- Email notifications for appointments
- Online payment integration
- Doctor reviews and ratings

## License

This project is licensed under the MIT License.

