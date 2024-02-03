import { useSocket } from '@/components/providers/socket-provider'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

interface useSocketChatProps {
  queryKey: string
  addKey: string
  updateKey: string
}
const useSocketChat = ({ queryKey, addKey, updateKey }: useSocketChatProps) => {
  const { socket } = useSocket()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (!socket) {
      return
    }
    socket.on(addKey, message => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        const newPages = oldData.pages.slice()
        newPages[0] = Object.assign({}, newPages[0], { items: [message, ...newPages[0].items] })
        return Object.assign({}, oldData, { pages: newPages })
      })
    })

    socket.on(updateKey, (message: any) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        const newPages = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: any) => {
              if (item.id === message.id) {
                return message
              }
              return item
            })
          }
        })
        return Object.assign({}, oldData, { pages: newPages })
      })
    })

    return () => {
      socket.off(addKey)
      socket.off(updateKey)
    }
  })
}

export default useSocketChat
