import { create } from "zustand";

interface UseUserProps {
  user: UserProps | null;
  setUser: (user: UserProps | null) => void;
}

const useUser = create<UseUserProps>()((set) => ({
  user: null,
  setUser: (user) => set({ user: user }),
}));

export default useUser;
