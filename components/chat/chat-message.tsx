'use client'
import ChatWelcome from '@/components/chat/chat-welcome'
import { ChannelMessage, Profile } from '@prisma/client'
import { Fragment, useEffect, useState } from 'react'
import qs from 'query-string'
import axios from 'axios'
import useChatQuery from '@/hooks/use-chat-query'
import { Loader2, ServerCrash } from 'lucide-react'
import { useClientTranslation } from '@/hooks/use-i18n'

interface ChatMessageProps {
  name: string
  type: 'channel' | 'conversation'
  apiUrl: string
  query: Partial<Record<'conversationId' | 'channelId', string>>
}
type ChannelMessageWithMemberProfile = ChannelMessage & {
  member: {
    Profile: Profile
  }
}
const ChatMessage = ({ name, type, apiUrl, query }: ChatMessageProps) => {
  const { t } = useClientTranslation()
  const queryKey = `chat:${query.channelId || query.conversationId}`

  const { data, status, fetchNextPage } = useChatQuery({ apiUrl, query, queryKey })
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
    <div className="flex flex-col-reverse flex-1">
      <ChatWelcome className="order-1 ml-4" name={name} type={type}></ChatWelcome>
      {data?.pages.length && (
        <div className="flex flex-col-reverse">
          {data.pages.map(group =>
            group.items.map((message: ChannelMessageWithMemberProfile) => (
              <Fragment key={message.id}>
                <div>{message.content}</div>
              </Fragment>
            ))
          )}
        </div>
      )}
    </div>
  )
}
export default ChatMessage
