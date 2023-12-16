import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'
import ServerHeader from './server-header'

interface ServerSideBarProps {
  serverId: string
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
  const role = members.find(item => item.profileId === profile.id)?.type

  return (
    <div className='flex flex-col w-full h-full'>
      <ServerHeader server={server} role={role}></ServerHeader>
    </div>
  )
}

export default ServerSideBar
