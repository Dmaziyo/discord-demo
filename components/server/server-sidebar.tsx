import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'
import ServerHeader from './server-header'
import ServerSearch from '@/components/server/server-search'
import { ChannelType, MemberRole } from '@prisma/client'
import { Crown, Hash, Mic, ShieldCheck, Video } from 'lucide-react'

interface ServerSideBarProps {
  serverId: string
}

const CHANNEL_ICON_MAP = {
  [ChannelType.TEXT]: <Hash className="w-4 h-4 mr-2" />,
  [ChannelType.AUDIO]: <Mic className="w-4 h-4 mr-2" />,
  [ChannelType.VIDEO]: <Video className="w-4 h-4 mr-2" />
}

const MEMBER_ICON_MAP = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="w-4 h-4 mr-2" />,
  [MemberRole.ADMIN]: <Crown className="w-4 h-4 text-yellow-500 mr-2" />
}

// 接收serverId,展示频道和成员，并且能够识别用户身份提供成员和频道管理功能
const ServerSideBar = async ({ serverId }: ServerSideBarProps) => {
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }
  //   找到用户存在并且符合服务器id号的server
  const server = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      members: {
        include: {
          Profile: true
        }
      },
      channels: {
        orderBy: {
          createdAt: 'asc'
        }
      }
    }
  })

  if (!server) {
    return redirect('/')
  }
  const members = server.members
  const channels = server.channels

  const role = members.find(item => item.profileId === profile.id)?.role

  return (
    <div className="flex flex-col w-full h-full">
      <ServerHeader server={server} role={role}></ServerHeader>
      <div className="flex-1 px-3">
        <ServerSearch
          searchData={[
            ...Object.values(ChannelType).map(type => ({
              label: type,
              type: 'channel' as 'channel',
              data: channels.filter(channel => channel.type === type).map(channel => ({ ...channel, icon: CHANNEL_ICON_MAP[type] }))
            })),
            {
              label: 'MEMBERS',
              type: 'member' as 'member',
              data: members.map(member => ({
                name: member.Profile.name,
                id: member.id,
                icon: MEMBER_ICON_MAP[member.role]
              }))
            }
          ]}
        ></ServerSearch>
      </div>
    </div>
  )
}

export default ServerSideBar
