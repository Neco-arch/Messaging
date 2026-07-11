import { create } from 'zustand'

const useToken = create((set) => ({
    token : null,
    save_token : (token) => set(() => ({ auth: true })),   
}))

export default useToken