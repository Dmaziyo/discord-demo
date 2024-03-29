import db from '@/lib/db'
import { currentProfileForPage } from '@/lib/db/profile'
import { NextApiResponseServerIO } from '@/type'
import { MemberRole } from '@prisma/client'
import type { NextApiRequest } from 'next'

// 处理编辑和删除channelMessage
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
      message = await db.channelMessage.update({
        where: {
          id: id as string,
          // 只有发送者能更改
          member: {
            profileId: profile.id
          }
        },
        data: {
          content
        },
        include: {
          member: {
            include: {
              Profile: true
            }
          }
        }
      })
    } else if (req.method === 'DELETE') {
      message = await db.channelMessage.update({
        where: {
          id: id as string,
          OR: [
            // 删除人是发送者
            {
              member: {
                profileId: profile.id
              }
            },
            // 删除人是管理员
            {
              channel: {
                Server: {
                  members: {
                    some: {
                      profileId: profile.id,
                      role: {
                        in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                      }
                    }
                  }
                }
              }
            }
          ]
        },
        data: {
          deleted: true
        },
        include: {
          member: {
            include: {
              Profile: true
            }
          }
        }
      })
    }
    res?.socket?.server?.io.emit(`channel:${message?.channelId}:updated`,message)
    return res.status(200).json(message)
  } catch (error) {
    console.log('[ CHANNEL_MESSAGE_ERROR ] >', error)
    res.status(500).json(error)
  }
}
