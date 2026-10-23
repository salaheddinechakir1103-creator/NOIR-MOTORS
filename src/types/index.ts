export type VehicleCategory = 
  | 'Supercar'
  | 'Grand Tourer'
  | 'SUV Prestige'
  | 'Cabriolet'
  | 'Berline Élite';

export type MoroccanCity = 
  | 'Casablanca'
  | 'Marrakech'
  | 'Rabat'
  | 'Tanger'
  | 'Agadir';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: VehicleCategory;
  year: number;
  pricePerDayMAD: number;
  depositMAD: number;
  powerHP: number;
  acceleration0to100: number; // in seconds
  topSpeedKmH: number;
  engine: string;
  transmission: string;
  seats: number;
  luggageCount: number;
  availableCities: MoroccanCity[];
  status: 'Disponible' | 'Réservé' | 'En Entretien';
  badge?: 'Exclusivité' | 'Nouveauté' | 'Coup de Cœur';
  image: string;
  gallery: string[];
  colorsAvailable: { name: string; hex: string }[];
  description: string;
  highlights: string[];
}

export interface BookingExtra {
  id: string;
  name: string;
  description: string;
  pricePerDayMAD: number;
  iconName: string;
}

export interface Booking {
  id: string;
  referenceCode: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  city: MoroccanCity;
  pickupLocation: string;
  dropoffLocation: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  basePriceMAD: number;
  discountMAD: number;
  extrasMAD: number;
  totalPriceMAD: number;
  depositMAD: number;
  selectedExtras: string[];
  status: 'En attente' | 'Confirmée' | 'Terminée' | 'Annulée';
  createdAt: string;
  specialRequests?: string;
}

export interface FilterState {
  searchQuery: string;
  category: string;
  brand: string;
  city: string;
  maxPrice: number;
  minPower: number;
  sortBy: 'price-asc' | 'price-desc' | 'power-desc' | 'accel-asc' | 'popular';
}
