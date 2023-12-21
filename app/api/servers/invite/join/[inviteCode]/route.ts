import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'

// 更新服务器邀请码
export async function GET(req: NextRequest, { params }: { params: { inviteCode: string } }) {
  const profile = await currentProfile()

  if (!profile) {
    return NextResponse.redirect('/')
  }
  const existingServer = await db.server.findUnique({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })
  if (existingServer) {
    return NextResponse.json({ msg: 'Already joined', ...existingServer }, { status: 200 })
  }
  const result = await db.server.update({
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: {
          profileId: profile.id
        }
      }
    }
  })
  return NextResponse.json({ msg: 'Successfully joined', ...result }, { status: 200 })
}
