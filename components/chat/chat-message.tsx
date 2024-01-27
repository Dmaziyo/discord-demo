'use client'
import ChatWelcome from '@/components/chat/chat-welcome'
import { ChannelMessage, Profile } from '@prisma/client'
import { useEffect, useState } from 'react'
import qs from 'query-string'
import axios from 'axios'

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
  const [messages, setMessages] = useState<ChannelMessageWithMemberProfile[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query
      })
      const res = await axios.get(url)
      console.log('[ res ] >', res)
      setMessages(res.data.items)
    }
    fetchData()
  }, [apiUrl, query])
  return (
    <div className="flex flex-col-reverse flex-1">
      <ChatWelcome className="order-1 ml-4" name={name} type={type}></ChatWelcome>
      {messages.length && (
        <div className="flex flex-col-reverse">
          {messages.map((message, idx) => (
            <div key={message.id}>{message.content}</div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChatMessage
