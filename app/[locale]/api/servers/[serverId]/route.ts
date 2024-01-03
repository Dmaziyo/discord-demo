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
