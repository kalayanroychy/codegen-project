import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Doctor Appointment System',
  description: 'Book appointments with top doctors in your area',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-primary-600 font-bold text-xl">
                  MediBook
                </a>
              </div>
              <nav className="flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Home
                </a>
                <a href="/nearby" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Nearby Doctors
                </a>
                <a href="/register" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
                  Register
                </a>
              </nav>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="mt-8 md:mt-0 md:order-1">
                <p className="text-center text-base text-gray-500">
                  &copy; {new Date().getFullYear()} MediBook. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

