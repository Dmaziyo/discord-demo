import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { MemberRole } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: { channelId: string } }) {
  // 拿到服务器id，以及用户信息后，判断用户是否为管理员然后在相应服务器上根据channelId删除channel
  try {
    const profile = await currentProfile()
    if (!profile) {
      return NextResponse.json({ msg: '[Unauthorized]' }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const serverId = searchParams.get('serverId')

    if (!serverId) {
      return NextResponse.json({ msg: '[SERVER_ID_MISSING]' }, { status: 400 })
    }
    if (!params.channelId) {
      return NextResponse.json({ msg: '[CHANNEL_ID_MISSING]' }, { status: 400 })
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
          deleteMany: {
            id: params.channelId,
            name: {
              not: 'general'
            }
          }
        }
      }
    })
    return NextResponse.json(server, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500, statusText: '[CHANNEL_DELETE_ERROR]' })
  }
}
