'use client'
import ActionToolTip from '@/components/action-tooltip'
import { useClientTranslation } from '@/hooks/use-i18n'
import { useModal } from '@/hooks/use-modal-state'
import { ServerWithMemberWithProfilesWithChannel } from '@/type'
import { ChannelType, MemberRole } from '@prisma/client'
import { Plus, Settings } from 'lucide-react'

type ServerSectionType = 'channels' | 'members'
interface ServerSectionProps {
  label: string
  type: ServerSectionType
  role?: MemberRole
  server: ServerWithMemberWithProfilesWithChannel
  channelType?: ChannelType
}
const ACTION_ICON_MAP = {
  channels: <Plus className="w-4 h-4" />,
  members: <Settings className="w-4 h-4" />
}

const TYPE_TOOLTIP_MAP = {
  channels: 'Create Channel' as const,
  members: 'Manage People' as const
}
const ServerSection = ({ label, type, role, channelType, server }: ServerSectionProps) => {
  const { t } = useClientTranslation()
  const { onOpen } = useModal()
  const onClick = (type: ServerSectionType, channelType?: ChannelType) => {
    if (type === 'members') {
      onOpen('members', { server })
    } else {
      onOpen('createChannel', { channelType })
    }
  }
  return (
    <div className="flex py-2 justify-between text-xs text-zinc-500">
      <span className="uppercase font-semibold">{label}</span>
      {role !== 'GUEST' && (
        <ActionToolTip label={t(TYPE_TOOLTIP_MAP[type])}>
          <button onClick={() => onClick(type, channelType)} className="capitalize">
            {ACTION_ICON_MAP[type]}
          </button>
        </ActionToolTip>
      )}
    </div>
  )
}

export default ServerSection
