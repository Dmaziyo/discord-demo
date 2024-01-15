'use client'
import { ServerWithMemberWithProfilesWithChannel } from '@/type'
import { MemberRole } from '@prisma/client'

interface ServerHeaderProps {
  server: ServerWithMemberWithProfilesWithChannel
  role?: MemberRole
}
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown, LogOut, Plus, Settings, Trash, UserPlus, Users } from 'lucide-react'
import { useModal } from '@/hooks/use-modal-state'
import { useClientTranslation } from '@/hooks/use-i18n'
import { useEffect, useState } from 'react'

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const { onOpen } = useModal()
  const [isMounted, setIsMounted] = useState(false)
  const { t } = useClientTranslation()
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  const isAdmin = role === 'ADMIN'
  const isModerator = role === 'MODERATOR' || role === 'ADMIN'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer focus:outline-none">
        <button className="flex items-center p-3 border-b-2 hover-animation">
          {server.name}
          <ChevronDown className="hidden md:block ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:text-neutral-400 ">
        {isAdmin && (
          <DropdownMenuItem
            onClick={() => onOpen('invite', { server })}
            className="text-sm py-2 text-indigo-500 flex items-center cursor-pointer"
          >
            {t('Invite People')} <UserPlus className="h-4 w-4 ml-auto"></UserPlus>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem onClick={() => onOpen('editServer', { server })} className="text-sm  cursor-pointer">
            {t('Server Settings')} <Settings className="h-4 w-4 ml-auto"></Settings>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="text-sm  flex items-center cursor-pointer" onClick={() => onOpen('members', { server })}>
            {t('Manage People')} <Users className="h-4 w-4 ml-auto"></Users>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem onClick={() => onOpen('createChannel', { server })} className="text-sm  flex items-center cursor-pointer">
            {t('Create Channel')} <Plus className="h-4 w-4 ml-auto"></Plus>
          </DropdownMenuItem>
        )}
        {isAdmin && <DropdownMenuSeparator />}

        {isAdmin ? (
          <DropdownMenuItem
            onClick={() => onOpen('deleteServer', { server })}
            className="text-rose-500 text-sm  flex items-center cursor-pointer"
          >
            {t('Delete Server')} <Trash className="h-4 w-4 ml-auto"></Trash>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onOpen('leaveServer', { server })}
            className="text-rose-500 text-sm  flex items-center cursor-pointer"
          >
            {t('Leave Server')} <LogOut className="h-4 w-4 ml-auto"></LogOut>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader
