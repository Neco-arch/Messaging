import { create } from 'zustand'

const selectchat = create((set) => ({
  selectedChatId: null,
  setSelectedChatId: (chatId) => set({ selectedChatId: chatId }),
  clearSelectedChat: () => set({ selectedChatId: null }),
}))

export default selectchat