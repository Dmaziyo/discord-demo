import ChatWelcome from '@/components/chat/chat-welcome'

interface ChatMessageProps {
  name: string
  type: 'channel' | 'conversation'
}
const ChatMessage = ({ name, type }: ChatMessageProps) => {
  return (
    <div className="flex flex-col-reverse flex-1">
      <ChatWelcome name={name} type={type}></ChatWelcome>
    </div>
  )
}

export default ChatMessage
