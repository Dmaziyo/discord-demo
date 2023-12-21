import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidV4 } from 'uuid'

// 更新服务器邀请码
export async function PATCH(req: NextRequest, { params }: { params: { serverId: string } }) {
  try {
    const serverId = params.serverId
    const profile = await currentProfile()

    if (!profile) {
      redirect('/')
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
        inviteCode: uuidV4()
      }
    })

    return NextResponse.json({ ...server }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 })
  }
}
