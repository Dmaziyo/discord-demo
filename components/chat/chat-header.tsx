import MobileAction from '@/components/mobile-action'
import SocketIndicator from '@/components/socket-indicator'
import { Badge } from '@/components/ui/badge'
import UserAvatar from '@/components/user-avator'
import { Hash } from 'lucide-react'

interface ChatHeaderProps {
  serverId: string
  locale: string
  name: string
  type: 'member' | 'channel'
  imageUrl?: string
}

const ChatHeader = ({ serverId, type, name, imageUrl, locale }: ChatHeaderProps) => {
  return (
    <div className="h-[50px] flex px-3 items-center border-b-2">
      <MobileAction locale={locale} serverId={serverId}></MobileAction>
      {type === 'channel' ? (
        <Hash className="w-5 h-5 mr-2 text-zinc-500  dark:text-zinc-400" />
      ) : (
        <UserAvatar className="md:w-9 md:h-9 mr-3" src={imageUrl} />
      )}
      {name}
      <SocketIndicator className='ml-auto'></SocketIndicator>
    </div>
  )
}

export default ChatHeader
