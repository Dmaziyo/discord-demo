import { v4 as uuidv4 } from 'uuid'
import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { ChannelType, MemberRole } from '@prisma/client'

export async function createServer({ name, image }: { name: string; image: string }) {
  const profile = await currentProfile()
  if (!profile) {
    return null
  }

  return db.server.create({
    data: {
      name,
      image,
      profileId: profile.id,
      inviteCode: uuidv4(),
      members: {
        create: [
          {
            type: MemberRole.ADMIN,
            profileId: profile.id
          }
        ]
      },
      channels: {
        create: [
          {
            name: 'general',
            profileId: profile.id,
            type: ChannelType.TEXT
          }
        ]
      }
    }
  })
}