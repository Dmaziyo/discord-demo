import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatMessage from '@/components/chat/chat-message'
import { findOrCreateConversation } from '@/lib/db/conversation'
import { currentProfile } from '@/lib/db/profile'
import { MemberWithProfile } from '@/type'
import { redirect } from 'next/navigation'

const ConversationPage = async ({
  params
}: {
  params: {
    locale: string
    serverId: string
    profileId: string
  }
}) => {
  const profile = await currentProfile()
  // 不能自己跟自己聊天
  if (profile.id === params.profileId) {
    return redirect(`/`)
  }
  // 根据两个profileId去寻找
  const conversation = await findOrCreateConversation(profile.id, params.profileId)
  if (!conversation) {
    console.log('[ CONVERSATION_SETUP_ERROR ]')
    return redirect(`/servers/${params.serverId}`)
  }
  const { initiator, receiver } = conversation
  const targetProfile = profile.id === initiator.id ? receiver : initiator
  return (
    <div className="flex flex-col bg-white dark:bg-[#313338] h-full w-full ">
      <ChatHeader
        name={targetProfile.name}
        serverId={params.serverId}
        locale={params.locale}
        type="member"
        imageUrl={targetProfile.image}
      ></ChatHeader>
      <ChatMessage
        member={{ id: '', role: 'GUEST', profileId: profile.id, Profile: profile } as MemberWithProfile}
        apiUrl="/api/directMessage"
        query={{ conversationId: conversation.id }}
        type="conversation"
        name={targetProfile.name}
      ></ChatMessage>
      <ChatInput
        apiUrl="/api/socket/directMessage"
        query={{ conversationId: conversation.id }}
        name={targetProfile.name}
        type="member"
      ></ChatInput>
    </div>
  )
}

export default ConversationPage
