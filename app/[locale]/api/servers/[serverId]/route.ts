import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

// 更新服务器
export async function PATCH(req: NextRequest, { params }: { params: { serverId: string } }) {
  try {
    const serverId = params.serverId
    const profile = await currentProfile()

    if (!profile) {
      redirect('/')
    }

    if (!serverId) {
      return NextResponse.json({ msg: '[SERVER_ID_MISSING]' }, { status: 400 })
    }
    const { image, name } = await req.json()
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
        image,
        name
      }
    })

    return NextResponse.json({ ...server }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 })
  }
}

// 删除服务器，只有群主才能删
export async function DELETE(req: NextRequest, { params }: { params: { serverId: string } }) {
  try {
    const profile = await currentProfile()
    const serverId = params.serverId
    if (!profile) {
      return NextResponse.json({ msg: '[Unauthorized]' }, { status: 401 })
    }

    if (!serverId) {
      return NextResponse.json({ msg: '[SERVER_ID_MISSING]' }, { status: 400 })
    }

    const server = await db.server.deleteMany({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server, { status: 200 })
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500, statusText: '[SERVER_DELETE_ERROR]' })
  }
}
