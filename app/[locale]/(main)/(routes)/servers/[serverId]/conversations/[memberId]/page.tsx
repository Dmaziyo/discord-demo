import ChatHeader from '@/components/chat/chat-header'
import db from '@/lib/db'
import { findOrCreateConversation } from '@/lib/db/conversation'
import { currentProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'

const ConversationPage = async ({
  params
}: {
  params: {
    locale: string
    serverId: string
    memberId: string
  }
}) => {
  const profile = await currentProfile()
  // 找到当前用户在该server的信息
  const currentMember = await db.member.findFirst({
    where: {
      profileId: profile.id,
      serverId: params.serverId
    },
    include: {
      Profile: true
    }
  })
  // 说明该用户不属于这个server
  if (!currentMember) {
    return redirect('/')
  }

  const conversation = await findOrCreateConversation(currentMember.id, params.memberId)
  if (!conversation) {
    console.log('[ CONVERSATION_SETUP_ERROR ]')
    return redirect(`/servers/${params.serverId}`)
  }
  const { initiator, receiver } = conversation
  const targetMember = currentMember.id === initiator.id ? receiver : initiator
  return (
    <div className="bg-white dark:bg-[#313338] h-full w-full ">
      <ChatHeader
        name={targetMember.Profile.name}
        serverId={params.serverId}
        locale={params.locale}
        type="member"
        imageUrl={targetMember.Profile.image}
      ></ChatHeader>
    </div>
  )
}

export default ConversationPage
