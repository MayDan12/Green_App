// import ridesData from "@/data/ride.json";
// import type { Ride } from "@/types/index";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface CompletedRide {
//   id: number;
//   date: string;
//   time: string;
//   vehicleType: string;
//   from: string;
//   to: string;
//   price: number;
//   co2Saved: number;
//   status: string;
// }

// interface RideState {
//   rides: Ride[];
//   bookedRide: Ride | null;
//   totalRides: number;
//   totalCO2: number;
//   ecoPoints: number;
//   completedRides: CompletedRide[];
//   bookRide: (ride: Ride) => void;
//   completeRide: () => void;
//   addCompletedRide: (ride: CompletedRide) => void;
//   clearBookedRide: () => void;
// }

// export const useRideStore = create<RideState>()(
//   persist(
//     (set, get) => ({
//       rides: ridesData,
//       bookedRide: null,
//       totalRides: 0,
//       totalCO2: 0,
//       ecoPoints: 0,
//       completedRides: [],

//       bookRide: (ride) => set({ bookedRide: ride }),

//       completeRide: () =>
//         set((state) => {
//           if (!state.bookedRide) return state;

//           const points = Math.round(state.bookedRide.co2Saved * 10);
//           const completedRide: CompletedRide = {
//             id: Date.now(),
//             date: new Date().toISOString().split("T")[0],
//             time: new Date().toLocaleTimeString("en-US", {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//             vehicleType: state.bookedRide.vehicleType,
//             from: "123 Main St, Downtown", // Default pickup
//             to: "456 Oak Ave, Uptown", // Default dropoff
//             price: state.bookedRide.price,
//             co2Saved: state.bookedRide.co2Saved,
//             status: "completed",
//           };

//           return {
//             bookedRide: null,
//             totalRides: state.totalRides + 1,
//             totalCO2: state.totalCO2 + state.bookedRide.co2Saved,
//             ecoPoints: state.ecoPoints + points,
//             completedRides: [completedRide, ...state.completedRides],
//           };
//         }),

//       addCompletedRide: (ride: CompletedRide) =>
//         set((state) => ({
//           completedRides: [ride, ...state.completedRides],
//         })),

//       clearBookedRide: () => set({ bookedRide: null }),
//     }),
//     {
//       name: "greenride-storage",
//       version: 1,
//     }
//   )
// );
import ridesData from "@/data/ride.json";
import type { Ride } from "@/types/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface CompletedRide {
  id: number;
  date: string;
  time: string;
  vehicleType: string;
  from: string;
  to: string;
  price: number;
  co2Saved: number;
  status: string;
}

interface RideState {
  rides: Ride[];
  bookedRide: Ride | null;
  totalRides: number;
  totalCO2: number;
  ecoPoints: number;
  completedRides: CompletedRide[];
  bookRide: (ride: Ride) => void;
  completeRide: () => void;
  addCompletedRide: (ride: CompletedRide) => void;
  clearBookedRide: () => void;
}

export const useRideStore = create<RideState>()(
  persist(
    (set, get) => ({
      rides: ridesData,
      bookedRide: null,
      totalRides: 0,
      totalCO2: 0,
      ecoPoints: 0,
      completedRides: [],

      bookRide: (ride) => set({ bookedRide: ride }),

      completeRide: () =>
        set((state) => {
          if (!state.bookedRide) return state;

          const points = Math.round(state.bookedRide.co2Saved * 10);
          const completedRide: CompletedRide = {
            id: Date.now(),
            date: new Date().toISOString().split("T")[0],
            time: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            vehicleType: state.bookedRide.vehicleType,
            from: "123 Main St, Downtown",
            to: "456 Oak Ave, Uptown",
            price: state.bookedRide.price,
            co2Saved: state.bookedRide.co2Saved,
            status: "completed",
          };

          return {
            bookedRide: null,
            totalRides: state.totalRides + 1,
            totalCO2: state.totalCO2 + state.bookedRide.co2Saved,
            ecoPoints: state.ecoPoints + points,
            completedRides: [completedRide, ...state.completedRides],
          };
        }),

      addCompletedRide: (ride: CompletedRide) =>
        set((state) => ({
          completedRides: [ride, ...state.completedRides],
        })),

      clearBookedRide: () => set({ bookedRide: null }),
    }),
    {
      name: "greenride-storage",
      version: 1,
      storage: createJSONStorage(() => AsyncStorage), // 👈 Fix here
    }
  )
);
