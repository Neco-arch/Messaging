import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useToken = create(
    persist(
        (set) => ({
            token: null,
            save_token: (token) => set({ token }),
        }),
        { name: 'token-storage' } // localStorage key
    )
)

export default useToken