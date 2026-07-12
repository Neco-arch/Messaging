import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserauth = create(
  persist(
    (set) => ({
      auth: false,
      auth_true: () => set({ auth: true }),
      auth_false: () => set({ auth: false }),
    }),
    { name: 'user-auth-storage' } 
  )
)

export default useUserauth
