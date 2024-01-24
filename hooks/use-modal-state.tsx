import { Channel, ChannelType, Server } from '@prisma/client'
import { create } from 'zustand'

export type ModalType =
  | 'createServer'
  | 'invite'
  | 'editServer'
  | 'members'
  | 'createChannel'
  | 'leaveServer'
  | 'deleteServer'
  | 'editChannel'
  | 'deleteChannel'
  | 'fileAttachment'

interface ModalData {
  server?: Server
  channelType?: ChannelType
  channel?: Channel
  apiUrl?: string
  query?: Record<string, any>
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
