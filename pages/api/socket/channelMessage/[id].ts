import db from '@/lib/db'
import { currentProfileForPage } from '@/lib/db/profile'
import { NextApiResponseServerIO } from '@/type'
import type { NextApiRequest } from 'next'

// 处理编辑和删除channelMessage
export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  const { id } = req.query
  if (req.method !== 'PATCH' && req.method !== 'DELETE') {
    return res.status(405).json({ error: 'Methods not allowed' })
  }
  //   权限验证
  const profile = await currentProfileForPage(req)
  if (!profile) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  if (req.method === 'PATCH') {
    const { content } = req.body as { content: string }
    const message = await db.channelMessage.update({
      where: {
        id: id as string,
        // 只有发送者能更改
        member: {
          profileId: profile.id
        }
      },
      data: {
        content
      }
    })
    res?.socket?.server?.io.emit(`chat:channel:${message.channelId}:updated`)
    return res.status(200).json(message)
  } else if (req.method === 'DELETE') {
  }
}
