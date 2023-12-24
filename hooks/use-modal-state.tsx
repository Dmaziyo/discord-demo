import { Server } from '@prisma/client'
import { create } from 'zustand'

type ModalType = 'createServer' | 'invite' | 'editServer'

interface ModalData {
  server?: Server
}

interface ModalState {
  type: ModalType | null
  isOpen: Boolean
  data: ModalData
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const useModal = create<ModalState>(set => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ isOpen: false, type: null })
}))
