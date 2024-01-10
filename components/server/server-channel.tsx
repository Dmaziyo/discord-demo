'use client'
import ActionToolTip from '@/components/action-tooltip'
import { useClientTranslation } from '@/hooks/use-i18n'
import { cn } from '@/lib/utils'
import { MemberRole } from '@prisma/client'
import { Edit, Lock, Trash } from 'lucide-react'
import { useParams } from 'next/navigation'

interface ServerChannelProps {
  id: string
  name: string
  role?: MemberRole
  icon?: React.ReactNode
}
const ServerChannel = ({ name, role, icon, id }: ServerChannelProps) => {
  const { t } = useClientTranslation()
  const params = useParams<{ serverId: string; channelId: string }>()
  return (
    <div className=" group flex items-center p-2 mb-2 hover-animation rounded-md">
      {icon}
      <span className={cn('text-zinc-500', params.channelId === id && 'text-black dark:text-zinc-200')}>{name}</span>
      {role !== 'GUEST' &&
        (name === 'general' ? (
          <Lock className="hidden group-hover:block ml-auto h-4 w-4 text-zinc-400" />
        ) : (
          <div className="hidden group-hover:flex group-hover:items-center group-hover:gap-2 ml-auto ">
            <ActionToolTip label={t('Edit')}>
              <button onClick={() => {}} className="">
                <Edit className="h-4 w-4 text-zinc-400"></Edit>
              </button>
            </ActionToolTip>
            <ActionToolTip label={t('Delete')}>
              <button onClick={() => {}} className="">
                <Trash className="h-4 w-4 text-zinc-400"></Trash>
              </button>
            </ActionToolTip>
          </div>
        ))}
    </div>
  )
}

export default ServerChannel
