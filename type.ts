import { Server, Member, Profile, Channel } from '@prisma/client'
import { NextApiResponse } from 'next'
import { Server as NetServer, Socket } from 'net'
import { Server as SocketIOServer } from 'socket.io'

export type ServerWithMemberWithProfilesWithChannel = Server & {
  members: (Member & { Profile: Profile })[]
  channels: Channel[]
}

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}
