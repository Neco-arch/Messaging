import { create } from 'zustand'

const useUserauth = create((set) => ({
    auth: false,
    auth_true: () => set(() => ({ auth: true })),   
    auth_false: () => set(() => ({ auth: false })),
}))

export default useUserauth
