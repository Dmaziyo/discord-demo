import { create } from 'zustand'

type ModalType = 'createServer'

interface ModalState {
  type: ModalType | null
  isOpen: Boolean
  onOpen: (type: ModalType) => void
  onClose: () => void
}

export const useModal = create<ModalState>(set => ({
  type: null,
  isOpen: false,
  onOpen: type => set({ isOpen: true, type }),
  onClose: () => set({ isOpen: false })
}))
