import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { NextRequest, NextResponse } from 'next/server'

// 根据serverId和memberId以及role更新其role
export async function PATCH(
  req: NextRequest,
  {
    params
  }: {
    params: {
      memberId: string
    }
  }
) {
  try {
    const searchParams = req.nextUrl.searchParams
    const { role } = await req.json()
    const serverId = searchParams.get('serverId')
    const profile = await currentProfile()
    if (!profile) {
      return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 })
    }
    const memberId = params.memberId
    if (!memberId) {
      return NextResponse.json({ msg: '[MEMBER_ID_MISSING]' }, { status: 400, statusText: '[MEMBER_ID_MISSING]' })
    }
    if (!serverId) {
      return NextResponse.json({ error: '[SERVER_ID_MISSING]' }, { status: 400, statusText: '[SERVER_ID_MISSING]' })
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            OR: [{ type: 'ADMIN' }, { type: 'MODERATOR' }]
          }
        }
      },
      data: {
        members: {
          updateMany: {
            where: {
              id: memberId,
              NOT: {
                profileId: profile.id
              }
            },
            data: {
              type: role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            Profile: true
          }
        }
      }
    })
    return NextResponse.json({ ...server }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}

// 根据serverId和memberId进行删除
export async function DELETE(
  req: NextRequest,
  {
    params
  }: {
    params: {
      memberId: string
    }
  }
) {
  try {
    const searchParams = req.nextUrl.searchParams
    const serverId = searchParams.get('serverId')
    const profile = await currentProfile()
    if (!profile) {
      return NextResponse.json({ msg: 'Unauthorized' }, { status: 401 })
    }
    const memberId = params.memberId
    if (!memberId) {
      return NextResponse.json({ msg: '[MEMBER_ID_MISSING]' }, { status: 400, statusText: '[MEMBER_ID_MISSING]' })
    }
    if (!serverId) {
      return NextResponse.json({ error: '[SERVER_ID_MISSING]' }, { status: 400, statusText: '[SERVER_ID_MISSING]' })
    }
    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            OR: [{ type: 'ADMIN' }, { type: 'MODERATOR' }]
          }
        }
      },
      data: {
        members: {
          deleteMany: {
            id: memberId,
            NOT: {
              profileId: profile.id
            }
          }
        }
      },
      include: {
        members: {
          include: {
            Profile: true
          }
        }
      }
    })
    return NextResponse.json({ ...server }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 })
  }
}
