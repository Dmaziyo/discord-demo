import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { ChannelType, MemberRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  // 拿到服务器id，以及用户信息后，判断用户是否为管理员然后在相应服务器上创建channel
  try {
    const profile = await currentProfile()
    const { name, type } = await req.json()
    if (!profile) {
      return NextResponse.json({ msg: '[Unauthorized]' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const serverId = searchParams.get('serverId')

    if (!serverId) {
      return NextResponse.json({ msg: '[SERVER_ID_MISSING]' }, { status: 400 })
    }

    if (name === 'general') {
      return NextResponse.json({ msg: '[SERVER_NAME_ERROR]' }, { status: 400, statusText: 'Channel name cannot be general' })
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR]
            }
          }
        }
      },
      data: {
        channels: {
          create: {
            name,
            type,
            profileId: profile.id
          }
        }
      },
      include: {
        channels: true
      }
    })
    return NextResponse.json(server, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: '[CHANNEL_POST_ERROR]' }, { status: 500, statusText: '[CHANNEL_POST_ERROR]' })
  }
}
