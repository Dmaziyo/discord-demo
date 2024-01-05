import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { NextRequest, NextResponse } from 'next/server'

// 退出server
export async function PATCH(
  req: NextRequest,
  {
    params
  }: {
    params: {
      serverId: string
    }
  }
) {
  try {
    const profile = await currentProfile()
    if (!profile) {
      return NextResponse.json({ msg: '[Unauthorized]' }, { status: 401 })
    }

    if (!params.serverId) {
      return NextResponse.json({ msg: '[SERVER_ID_MISSING]' }, { status: 400 })
    }

    const server = await db.server.update({
      // 是成员且不是群主
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id
        },
        members: {
          some: {
            profileId: profile.id
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id
          }
        }
      }
    })
    return NextResponse.json(server, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: '[SERVER_LEAVE_ERROR]' }, { status: 500, statusText: '[CHANNEL_POST_ERROR]' })
  }
}
