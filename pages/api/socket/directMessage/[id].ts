import db from '@/lib/db'
import { currentProfileForPage } from '@/lib/db/profile'
import { NextApiResponseServerIO } from '@/type'
import { MemberRole } from '@prisma/client'
import type { NextApiRequest } from 'next'

// 处理编辑和删除directMessage
export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  try {
    const { id } = req.query
    if (req.method !== 'PATCH' && req.method !== 'DELETE') {
      return res.status(405).json({ error: 'Methods not allowed' })
    }
    //   权限验证
    const profile = await currentProfileForPage(req)
    if (!profile) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
    let message = null
    if (req.method === 'PATCH') {
      const { content } = req.body as { content: string }
      message = await db.directMessage.update({
        where: {
          id: id as string,
          // 只有发送者能更改
          profileId: profile.id
        },
        data: {
          content
        },
        include: {
          profile: true
        }
      })
    } else if (req.method === 'DELETE') {
      message = await db.directMessage.update({
        where: {
          id: id as string,
          // 删除人是发送者
          profileId: profile.id
        },
        data: {
          deleted: true
        },
        include: {
          profile: true
        }
      })
    }
    res?.socket?.server?.io.emit(`conversation:${message?.conversationId}:updated`, message)
    return res.status(200).json(message)
  } catch (error) {
    console.log('[ DIRECT_MESSAGE_ERROR ] >', error)
    res.status(500).json(error)
  }
}
