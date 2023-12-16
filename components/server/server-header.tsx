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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Plus, Settings, UserPlus, Users } from 'lucide-react'

const ServerHeader = ({ server, role }: ServerHeaderProps) => {
  const isAdmin = role === 'ADMIN'
  const isModerator = role === 'MODERATOR' || role === 'ADMIN'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer focus:outline-none">
        <button className="flex items-center p-3 border-b-2 hover:bg-zinc-700/10 transition dark:hover:bg-zinc-700/50">
          {server.name}
          <ChevronDown className="ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 dark:text-neutral-400 ">
        {isAdmin && (
          <DropdownMenuItem className="text-sm py-2 text-indigo-500 flex items-center cursor-pointer">
            Invite People <UserPlus className="h-4 w-4 ml-auto"></UserPlus>
          </DropdownMenuItem>
        )}
        {isAdmin && (
          <DropdownMenuItem className="text-sm  cursor-pointer">
            Server Settings <Settings className="h-4 w-4 ml-auto"></Settings>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="text-sm  flex items-center cursor-pointer">
            Manage People <Users className="h-4 w-4 ml-auto"></Users>
          </DropdownMenuItem>
        )}
        {isModerator && (
          <DropdownMenuItem className="text-sm  flex items-center cursor-pointer">
            Create Channel <Plus className="h-4 w-4 ml-auto"></Plus>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader
