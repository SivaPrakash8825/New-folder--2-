import { create } from "zustand"

interface UseCityProps {
    city: "madurai" | "chennai" | "erode" | "coimbatore" | ""
    setCity: (city: "madurai" | "chennai" | "erode" | "coimbatore") => void
}

const useCity = create<UseCityProps>()((set) => ({
    city: "",
    setCity: (city) => set({ city }),
}))

export default useCity
