'use client'

import { useClientTranslation } from '@/hooks/use-i18n'
import { cn } from '@/lib/utils'
import { MessageCircle, Hash } from 'lucide-react'

interface ChatWelcomeProps {
  name: string
  type: 'channel' | 'conversation'
  className?: string
}
const ChatWelcome = ({ name, type, className }: ChatWelcomeProps) => {
  const { t, i18n } = useClientTranslation()
  if (type === 'channel') {
    return (
      <div className={cn('flex gap-2 flex-col', className)}>
        <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
          <Hash className="w-12 h-12 text-white"></Hash>
        </div>
        <div className="text-2xl font-bold">{`${t('Welcome to')} #${name}!`}</div>
        <div className="text-sm text-zinc-500 dark:text-zinc-400">{i18n.t('This is the start of the channel', { name })}</div>
      </div>
    )
  }
  return (
    <div className={cn('flex gap-2 flex-col', className)}>
      <div className="h-[75px] w-[75px] rounded-full bg-zinc-500 dark:bg-zinc-700 flex items-center justify-center">
        <MessageCircle className="w-12 h-12 text-white" />
      </div>
      <div className="text-sm text-zinc-500 dark:text-zinc-400">{i18n.t('This is the start of the conversation with', { name })}</div>
    </div>
  )
}

export default ChatWelcome
