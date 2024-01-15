import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'

// 根据serverId加载并跳转到server的默认频道
const ServerIdPage = async ({
  params
}: {
  params: {
    serverId: string
    locale: string
  }
}) => {
  // 验证用户是否为该server成员
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id
        }
      }
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc'
        },
        where: {
          name: 'general'
        }
      }
    }
  })
  if (!server || !server.channels[0]) {
    return redirect('/')
  }
  return redirect(`/servers/${server.id}/channels/${server.channels[0].id}`)
}

export default ServerIdPage
