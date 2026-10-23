import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ComparisonBar } from './components/ComparisonBar';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { FleetPage } from './pages/FleetPage';
import { VehicleDetailPage } from './pages/VehicleDetailPage';
import { ComparePage } from './pages/ComparePage';
import { ServicesPage } from './pages/ServicesPage';
import { ReservationPage } from './pages/ReservationPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Vehicle } from './types';

function MainApp() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  const [bookingVehicle, setBookingVehicle] = useState<Vehicle | null>(null);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleNavigate = (page: string, params?: { vehicleId?: string }) => {
    if (params?.vehicleId) {
      setSelectedVehicleId(params.vehicleId);
    }
    setCurrentPage(page);
  };

  const handleOpenBooking = (vehicle: Vehicle) => {
    setBookingVehicle(vehicle);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08080a] text-white selection:bg-orange-500 selection:text-black">
      {/* Navigation Header adhering to the Top Bar Contract */}
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'fleet' && (
          <FleetPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'detail' && (
          <VehicleDetailPage
            vehicleId={selectedVehicleId}
            onBack={() => setCurrentPage('fleet')}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'compare' && (
          <ComparePage
            onBack={() => setCurrentPage('fleet')}
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'reservation' && (
          <ReservationPage
            initialVehicleId={selectedVehicleId}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage />
        )}

        {currentPage === 'admin' && (
          <AdminPage />
        )}
      </main>

      {/* Sticky Vehicle Comparison Bar */}
      <ComparisonBar onCompareNow={() => handleNavigate('compare')} />

      {/* Global Quick Booking Modal */}
      {bookingVehicle && (
        <BookingModal
          vehicle={bookingVehicle}
          onClose={() => setBookingVehicle(null)}
          onSuccess={(ref) => {
            // Can redirect to admin or keep modal for voucher printing
          }}
        />
      )}

      {/* Moroccan VIP Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
