import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'
import ServerHeader from './server-header'
import ServerSearch from '@/components/server/server-search'
import { ChannelType } from '@prisma/client'
import { ScrollArea } from '@/components/ui/scroll-area'
import ServerSection from '@/components/server/server-section'
import { Separator } from '@/components/ui/separator'
import initTranslations from '@/app/i18n'
import ServerChannel from '@/components/server/server-channel'
import { CHANNEL_ICON_MAP, MEMBER_ICON_MAP } from '@/constants/icon'

interface ServerSideBarProps {
  serverId: string
  locale: string
}

// 接收serverId,展示频道和成员，并且能够识别用户身份提供成员和频道管理功能
const ServerSideBar = async ({ serverId, locale }: ServerSideBarProps) => {
  const profile = await currentProfile()
  const { t } = await initTranslations(locale)

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
        <Separator className="mb-3"></Separator>
        <ScrollArea>
          {...Object.values(ChannelType).map(type => {
            return (
              <>
                <ServerSection
                  channelType={type}
                  role={role}
                  label={`${t(type)} ${t('Channel')}`}
                  type="channels"
                  server={server}
                ></ServerSection>
                {channels
                  .filter(channel => channel.type === type)
                  .map(channel => (
                    <div className="mb-4" key={channel.id}>
                      <ServerChannel id={channel.id} icon={CHANNEL_ICON_MAP[channel.type]} name={channel.name} role={role}></ServerChannel>
                    </div>
                  ))}
              </>
            )
          })}
          {<ServerSection server={server} role={role} label={t('members')} type="members"></ServerSection>}
        </ScrollArea>
      </div>
    </div>
  )
}

export default ServerSideBar
