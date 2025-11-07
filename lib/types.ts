export interface Venue {
  id: string;
  slug: string;
  name: string;
  type: 'restaurant' | 'bar' | 'hotel' | 'theater' | 'event_space';
  description: string;
  shortDescription: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  heroImage: string;
  thumbnail: string;
  gallery: string[];
  cuisineType?: string[];
  priceRange?: 1 | 2 | 3 | 4;
  features: string[];
  hours: {
    [key: string]: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isActive: boolean;
  isFeatured: boolean;
}

export interface Event {
  id: string;
  venueId: string;
  venueName: string;
  title: string;
  slug: string;
  description: string;
  eventType: 'concert' | 'comedy' | 'tasting' | 'special_dinner' | 'theater' | 'other';
  posterUrl: string;
  heroImage: string;
  startDateTime: string;
  endDateTime?: string;
  doorsOpen?: string;
  showTime?: string;
  ticketPrice?: number;
  ticketPriceRange?: {
    min: number;
    max: number;
  };
  artistName?: string;
  artistBio?: string;
  artistPhoto?: string;
  status: 'upcoming' | 'sold_out' | 'cancelled' | 'completed';
  isFeatured: boolean;
  capacity?: number;
  ticketsSold?: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  offerType: 'discount' | 'freebie' | 'early_access' | 'exclusive' | 'flash';
  validFrom: string;
  validUntil: string;
  backgroundImage?: string;
  backgroundColor: string;
  textColor: string;
  venues: string[];
  venueNames?: string[];
  isFeatured: boolean;
  redemptionCode?: string;
  termsAndConditions?: string;
}

export interface MenuItem {
  id: string;
  venueId: string;
  name: string;
  description: string;
  category: string;
  price: number;
  imageUrl?: string;
  dietaryTags: string[];
  allergens: string[];
  isAvailable: boolean;
  isFeatured: boolean;
}

export interface Reservation {
  id: string;
  userId: string;
  venueId: string;
  venueName: string;
  partySize: number;
  dateTime: string;
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  specialRequests?: string;
  confirmationCode: string;
}

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  profilePhoto?: string;
  dietaryPreferences: string[];
  favoriteVenues: string[];
  notificationSettings: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
}

export type VenueType = 'restaurant' | 'bar' | 'hotel' | 'theater' | 'event_space';
export type EventType = 'concert' | 'comedy' | 'tasting' | 'special_dinner' | 'theater' | 'other';
export type OfferType = 'discount' | 'freebie' | 'early_access' | 'exclusive' | 'flash';
