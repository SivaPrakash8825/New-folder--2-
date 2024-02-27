import { create } from "zustand"

interface UseUserProps {
    user: UserProps | null
    setUser: (user: UserProps) => void
}

const useUser = create<UseUserProps>()((set) => ({
    user: null,
    setUser: (user) => set({ user }),
}))

export default useUser
