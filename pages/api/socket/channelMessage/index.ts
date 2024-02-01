import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '@/type'
import { NextApiRequest } from 'next'
import { currentProfileForPage } from '@/lib/db/profile'
import db from '@/lib/db'

export default async function channelMessageHandler(req: NextApiRequest, res: NextApiResponseServerIO) {
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
      const { serverId, channelId } = req.query
      const { content, fileUrl } = req.body
      if (!serverId) {
        return res.status(400).json({ error: 'SERVER_ID_MISSING' })
      }
      if (!channelId) {
        return res.status(400).json({ error: 'CHANNEL_ID_MISSING' })
      }
      if (!content) {
        return res.status(400).json({ error: 'CONTENT_MISSING' })
      }
      // 先确定是否为该群成员
      const server = await db.server.findFirst({
        where: {
          id: serverId as string,
          members: {
            some: {
              profileId: profile.id
            }
          }
        },
        include: {
          members: {
            where: {
              profileId: profile.id
            }
          }
        }
      })
      if (!server) {
        return res.status(400).json({ error: 'Server not found' })
      }
      if (!server?.members.length) {
        return res.status(400).json({ error: 'Member not found' })
      }

      // 创建消息至channel
      const channel = await db.channel.update({
        where: {
          id: channelId as string
        },
        data: {
          channelMessages: {
            create: {
              memberId: server?.members[0].id as string,
              content: content as string,
              fileUrl
            }
          }
        }
      })
      res.socket.server.io.emit(`channel:${channel.id}:messages`)

      res.status(200).json({ message: 'create succeeded' })
    }
  } catch (error) {
    console.log('[CHANNEL_MESSAGE_POST ] >', error)
    return res.status(500).json({ error })
  }
}
