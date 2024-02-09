import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '@/type'
import { NextApiRequest } from 'next'
import { currentProfileForPage } from '@/lib/db/profile'
import db from '@/lib/db'

export default async function directMessageHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
  // 初始化socket server
  try {
    if (!res.socket.server.io) {
      return res.status(500).send({ error: 'SOCKET SERVER DISCONNECTED' })
    }
    const profile = await currentProfileForPage(req)
    if (!profile) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    if (req.method === 'POST') {
      const { conversationId } = req.query
      const { content, fileUrl } = req.body
      if (!conversationId) {
        return res.status(400).json({ error: 'CONVERSATION_ID_MISSING' })
      }
      if (!content) {
        return res.status(400).json({ error: 'CONTENT_MISSING' })
      }

      // 创建消息
      const message = await db.directMessage.create({
        data: {
          conversationId: conversationId as string,
          profileId: profile.id,
          content: content as string,
          fileUrl
        },
        include: {
          profile: true
        }
      })
      res.socket.server.io.emit(`conversation:${conversationId}:added`, message)

      res.status(200).json({ message: 'create succeeded' })
    }
  } catch (error) {
    console.log('[CHANNEL_MESSAGE_POST ] >', error)
    return res.status(500).json({ error })
  }
}
