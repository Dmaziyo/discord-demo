import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatMessage from '@/components/chat/chat-message'
import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'

const ChannelIdPage = async ({
  params
}: {
  params: {
    locale: string
    serverId: string
    channelId: string
  }
}) => {
  // 验证用户
  const profile = await currentProfile()

  if (!profile) {
    return redirect('/')
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId
    }
  })
  // 判断是否为server内的成员
  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id
    }
  })
  if (!channel || !member) {
    return redirect('/')
  }
  return (
    <div className="flex flex-col bg-white dark:bg-[#313338] h-full w-full">
      <ChatHeader locale={params.locale} serverId={params.serverId} type="channel" name={channel.name}></ChatHeader>
      <ChatMessage apiUrl="/api/channelMessage" query={{ channelId: channel.id }} type="channel" name={channel.name}></ChatMessage>
      <ChatInput
        apiUrl="/api/socket/channelMessage"
        query={{ serverId: params.serverId, channelId: params.channelId }}
        name={channel.name}
        type="channel"
      ></ChatInput>
    </div>
  )
}

export default ChannelIdPage
