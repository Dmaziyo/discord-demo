import MobileAction from '@/components/mobile-action'
import { Hash } from 'lucide-react'

interface ChatHeaderProps {
  serverId: string
  locale: string
  name: string
  type: 'member' | 'channel'
  imageUrl?: string
}

const ChatHeader = ({ serverId, type, name, imageUrl, locale }: ChatHeaderProps) => {
  if (type === 'channel') {
    return (
      <div className="flex p-3 items-center border-b-2">
        <MobileAction locale={locale} serverId={serverId}></MobileAction>
        <Hash className="w-5 h-5 mr-2 text-zinc-500  dark:text-zinc-400" />
        {name}
      </div>
    )
  }
}

export default ChatHeader
