import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '@/type'
import { NextApiRequest } from 'next'

export const config = {
  api: {
    bodyParser: false
  }
}

export default  async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  // 初始化socket server
  if (!res.socket.server.io) {
    const httpServer = res.socket.server as any
    console.log('[ Socket Server initializing ] ')
    const io = new ServerIO(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false
    })
    res.socket.server.io = io
  }
  res.end()
}
