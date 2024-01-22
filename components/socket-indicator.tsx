'use client'
import { useSocket } from '@/components/providers/socket-provider'
import { Badge } from '@/components/ui/badge'
import { useClientTranslation } from '@/hooks/use-i18n'
import { cn } from '@/lib/utils'

interface SocketIndicatorProps {
  className?: string
}

const SocketIndicator = ({ className }: SocketIndicatorProps) => {
  const { isConnected } = useSocket()

  const { t } = useClientTranslation()
  return (
    <Badge variant={'outline'} className={cn(isConnected ? 'bg-emerald-500' : 'bg-yellow-400', 'text-white font-semibold', className)}>
      {isConnected ? t('live') : t('disconnected')}
    </Badge>
  )
}

export default SocketIndicator
