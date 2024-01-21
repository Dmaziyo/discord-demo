'use client'

import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { useContext } from 'react'

interface SocketContextState {
  socket: Socket | null
  isConnected: boolean
}

export const SocketContext = createContext<SocketContextState>({} as SocketContextState)

export const useSocket = () => {
  return useContext(SocketContext)
}

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketClient = io(process.env.NEXT_PUBLIC_SITE!, {
      path: '/api/socket',
      addTrailingSlash: false
    })
    socketClient.on('connect', () => {
      console.log('[SOCKET CONNECTED] >', socketClient.id)
      setIsConnected(true)
      setSocket(socketClient)
    })

    if (socketClient) {
      return () => {
        socketClient.disconnect()
      }
    }
  }, [])
  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>
}

export default SocketProvider
