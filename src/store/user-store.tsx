import { create } from "zustand";

const useUserStore = create((set, get) => ({
    loggedInUser: {
        id:null,
        name:null,
        token:null,
        tokenExpiration:null
    },
    setLoggedInUser: (sessionData:any) => set((state:any)=>({loggedInUser:sessionData}))
}))

export default useUserStore;