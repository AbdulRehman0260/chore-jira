import { create } from "zustand";

export const useHouseholdStore = create((set) => ({
    household: null,
    households: [],
    noHouseholdMessage: false,
    setHousehold: (house) => set({ household: house }),
    setHouseholds: (houses) => set({ households: houses }),
    setNoHouseholdMessage: (bool) => set({ noHouseholdMessage: bool })
}))