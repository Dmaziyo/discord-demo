'use client'
import ChatWelcome from '@/components/chat/chat-welcome'
import { ChannelMessage, DirectMessage, Member, Profile } from '@prisma/client'
import { Fragment, useRef } from 'react'
import useChatQuery from '@/hooks/use-chat-query'
import { Loader2, ServerCrash } from 'lucide-react'
import { useClientTranslation } from '@/hooks/use-i18n'
import ChatItem from '@/components/chat/chat-item'
import dateFormat from '@/lib/date-format'
import useSocketChat from '@/hooks/use-socket-chat'
import useScrollChat from '@/hooks/use-scroll-chat'
import { MemberWithProfile } from '@/type'

interface ChatMessageProps {
  name: string
  type: 'channel' | 'conversation'
  apiUrl: string
  query: Partial<Record<'conversationId' | 'channelId', string>>
  member: MemberWithProfile
}
type ChannelMessageWithMemberProfile = ChannelMessage & {
  member: MemberWithProfile
}

type directMessageProfile = DirectMessage & {
  profile: Profile
}
const ChatMessage = ({ name, type, apiUrl, query, member }: ChatMessageProps) => {
  const { t } = useClientTranslation()
  const queryKey = `${type}:${query.channelId || query.conversationId}`
  const addKey = `${queryKey}:added`
  const updateKey = `${queryKey}:updated`
  const scrollRef = useRef<HTMLDivElement>(null)
  const { data, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useChatQuery({ apiUrl, query, queryKey })
  useSocketChat({ queryKey, addKey, updateKey })
  useScrollChat({ loadMoreData: fetchNextPage, scrollRef, enabled: !isFetchingNextPage && !!hasNextPage })
  if (status === 'pending') {
    return (
      <div className="flex flex-col gap-1 flex-1 items-center justify-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin" />
        <span className="text-zinc-400">{t('Loading...')}</span>
      </div>
    )
  } else if (status === 'error') {
    return (
      <div className="flex flex-col gap-1 flex-1 items-center justify-center">
        <ServerCrash className="w-7 h-7 text-rose-500 " />
        <span className="text-zinc-400">{t('Something went wrong')}</span>
      </div>
    )
  }
  return (
    <div ref={scrollRef} className="flex flex-col-reverse flex-1 overflow-y-auto">
      {hasNextPage && (
        <div className="flex justify-center  align-center p-3 order-1">
          {isFetchingNextPage ? (
            <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
          ) : (
            <span onClick={() => fetchNextPage()} className="text-sm cursor-pointer hover:underline text-zinc-400">
              {t('load previous messages')}
            </span>
          )}
        </div>
      )}
      {!hasNextPage && <ChatWelcome className="mt-2 ml-4 order-1" name={name} type={type}></ChatWelcome>}
      {data?.pages.length && (
        <div className="flex flex-col-reverse">
          {data.pages.map(group =>
            type === 'channel'
              ? group.items.map((message: ChannelMessageWithMemberProfile) => (
                  <Fragment key={message.id}>
                    <ChatItem
                      deleted={message.deleted}
                      currentMember={member}
                      fileUrl={message.fileUrl}
                      timestamp={dateFormat(message.createdAt)}
                      member={message.member}
                      content={message.content}
                      edited={message.updatedAt !== message.createdAt}
                      apiUrl={`/api/socket/${type}Message/${message.id}`}
                    ></ChatItem>
                  </Fragment>
                ))
              : group.items.map((message: directMessageProfile) => (
                  <Fragment key={message.id}>
                    <ChatItem
                      deleted={message.deleted}
                      currentMember={member}
                      fileUrl={message.fileUrl}
                      timestamp={dateFormat(message.createdAt)}
                      member={{ profileId: message.profile.id, Profile: message.profile } as MemberWithProfile}
                      content={message.content}
                      edited={message.updatedAt !== message.createdAt}
                      apiUrl={`/api/socket/${type}Message/${message.id}`}
                    ></ChatItem>
                  </Fragment>
                ))
          )}
        </div>
      )}
    </div>
  )
}
export default ChatMessage
