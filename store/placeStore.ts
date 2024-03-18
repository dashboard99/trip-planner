import { create } from "zustand";

export interface Destination {
  title?: string;
  description?: string;
  time?: string;
}

// export interface daySchedules {
//   day: Destination[] | null;
// }

export interface Trip {
  locationName: string;
  description: string;
  departureDate: string;
  coverImage: string;
  ongoing: boolean;
  schedule?: Destination[][];
}

export interface BasketState {
  trip: Trip | null;

  createTrip: (location: Trip) => void;

  //removeSchedule: (place: Destination) => void;
  recentTrip: Trip[];
  addRecentTrip: (place: Trip) => void;
}

const useBasketStore = create<BasketState>()((set, get) => ({
  trip: null,

  recentTrip: [],
  addRecentTrip: (location) =>
    set((state) => ({
      recentTrip: [...state.recentTrip, { ...location, ongoing: false }],
      trip: null,
    })),
  createTrip: (location) => {
    set((state) => ({ trip: location }));
  },

  // removeSchedule: (place) => {
  //   set((state) => {
  //     return {
  //       destinations: state.destinations.filter(
  //         (p) => p.destination !== place.destination
  //       ),
  //     };
  //   });
  // },
}));

export default useBasketStore;
