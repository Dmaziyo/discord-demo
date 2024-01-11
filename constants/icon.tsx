import { ChannelType, MemberRole } from '@prisma/client'
import { Crown, Hash, Mic, ShieldCheck, Video } from 'lucide-react'

export const CHANNEL_ICON_MAP = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2 text-zinc-500 " />,
  [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2 text-zinc-500" />,
  [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2 text-zinc-500" />
}

export const MEMBER_ICON_MAP = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 mr-2" />,
  [MemberRole.ADMIN]: <Crown className="w-4 h-4 text-yellow-500 mr-2" />
}

export const ROLE_ICON_MAP = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="w-4 h-4" />,
  ADMIN: <Crown className="w-4 h-4 text-yellow-500" />
}