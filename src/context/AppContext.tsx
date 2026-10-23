import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, Booking } from '../types';
import { INITIAL_VEHICLES, INITIAL_BOOKINGS } from '../data/vehicles';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface AppContextType {
  vehicles: Vehicle[];
  bookings: Booking[];
  favorites: string[];
  compareList: string[];
  toasts: Toast[];
  toggleFavorite: (vehicleId: string) => void;
  toggleCompare: (vehicleId: string) => void;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;
  createBooking: (booking: Omit<Booking, 'id' | 'referenceCode' | 'createdAt'>) => Booking;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addVehicle: (vehicle: Omit<Vehicle, 'id'>) => void;
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  resetToDefaults: () => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  VEHICLES: 'noir_motors_vehicles_v1',
  BOOKINGS: 'noir_motors_bookings_v1',
  FAVORITES: 'noir_motors_favorites_v1',
  COMPARE: 'noir_motors_compare_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Vehicles
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.VEHICLES);
      if (!stored) return INITIAL_VEHICLES;
      const saved = JSON.parse(stored) as Vehicle[];
      if (!Array.isArray(saved)) return INITIAL_VEHICLES;
      const defaultsById = new Map(INITIAL_VEHICLES.map(v => [v.id, v]));
      // Migrate legacy Vite source URLs without overwriting user-added vehicles or admin edits.
      return saved.map(vehicle => {
        const current = defaultsById.get(vehicle.id);
        if (!current) return vehicle;
        const broken = (url: string | undefined) => !url || url.startsWith('/src/assets/') || url.includes('/src/assets/');
        return {
          ...vehicle,
          image: broken(vehicle.image) ? current.image : vehicle.image,
          gallery: (vehicle.gallery || []).map((url, index) =>
            broken(url) ? (current.gallery[index] || current.image) : url
          ),
        };
      });
    } catch {
      return INITIAL_VEHICLES;
    }
  });

  // 2. Bookings
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return stored ? JSON.parse(stored) : INITIAL_BOOKINGS;
    } catch {
      return INITIAL_BOOKINGS;
    }
  });

  // 3. Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 4. Comparison list (max 3)
  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.COMPARE);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // 5. Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VEHICLES, JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPARE, JSON.stringify(compareList));
  }, [compareList]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleFavorite = (vehicleId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(vehicleId);
      if (exists) {
        showToast('Véhicule retiré des favoris', 'info');
        return prev.filter((id) => id !== vehicleId);
      } else {
        showToast('Véhicule ajouté à vos favoris', 'success');
        return [...prev, vehicleId];
      }
    });
  };

  const toggleCompare = (vehicleId: string) => {
    setCompareList((prev) => {
      if (prev.includes(vehicleId)) {
        showToast('Véhicule retiré du comparateur', 'info');
        return prev.filter((id) => id !== vehicleId);
      }
      if (prev.length >= 3) {
        showToast('Maximum 3 véhicules dans le comparateur', 'error');
        return prev;
      }
      showToast('Véhicule ajouté au comparateur', 'success');
      return [...prev, vehicleId];
    });
  };

  const removeFromCompare = (vehicleId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== vehicleId));
    showToast('Véhicule retiré du comparateur', 'info');
  };

  const clearCompare = () => {
    setCompareList([]);
  };

  const createBooking = (bookingData: Omit<Booking, 'id' | 'referenceCode' | 'createdAt'>): Booking => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${Date.now()}`,
      referenceCode: `NOIR-2026-${randomCode}`,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Réservation ${newBooking.referenceCode} enregistrée avec succès`, 'success');
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
    showToast(`Statut de la réservation mis à jour : ${status}`, 'info');
  };

  const addVehicle = (vehicleData: Omit<Vehicle, 'id'>) => {
    const id = vehicleData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newVehicle: Vehicle = { ...vehicleData, id };
    setVehicles((prev) => [newVehicle, ...prev]);
    showToast(`${newVehicle.name} a été ajouté à la flotte`, 'success');
  };

  const updateVehicle = (id: string, updates: Partial<Vehicle>) => {
    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updates } : v))
    );
    showToast('Véhicule mis à jour', 'success');
  };

  const deleteVehicle = (id: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast('Véhicule retiré de la flotte', 'info');
  };

  const resetToDefaults = () => {
    setVehicles(INITIAL_VEHICLES);
    setBookings(INITIAL_BOOKINGS);
    setFavorites([]);
    setCompareList([]);
    localStorage.removeItem(STORAGE_KEYS.VEHICLES);
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.COMPARE);
    showToast('Données démo réinitialisées par défaut', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        vehicles,
        bookings,
        favorites,
        compareList,
        toasts,
        toggleFavorite,
        toggleCompare,
        removeFromCompare,
        clearCompare,
        createBooking,
        updateBookingStatus,
        addVehicle,
        updateVehicle,
        deleteVehicle,
        resetToDefaults,
        showToast,
        removeToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-2xl text-xs font-medium border flex items-center justify-between gap-3 transition-all transform animate-in fade-in slide-in-from-bottom-2 ${
              toast.type === 'success'
                ? 'bg-zinc-900/95 border-orange-500/60 text-white shadow-[0_4px_20px_rgba(249,115,22,0.2)]'
                : toast.type === 'error'
                ? 'bg-zinc-900/95 border-red-500/60 text-red-200'
                : 'bg-zinc-900/95 border-zinc-700 text-zinc-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${toast.type === 'success' ? 'bg-orange-500' : toast.type === 'error' ? 'bg-red-500' : 'bg-blue-400'}`} />
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-400 hover:text-white text-xs font-bold px-1"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
