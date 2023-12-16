import { Server, Member, Profile, Channel } from '@prisma/client'

export type ServerWithMemberWithProfilesWithChannel = Server & {
  members: (Member & { Profile: Profile })[]
  channels: Channel[]
}
