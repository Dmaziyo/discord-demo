'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import UserAvatar from '@/components/user-avator'
import { ROLE_ICON_MAP } from '@/constants/icon'
import { useClientTranslation } from '@/hooks/use-i18n'
import { cn } from '@/lib/utils'
import { useUser } from '@clerk/nextjs'
import { Member, MemberRole, Profile, Server } from '@prisma/client'
import axios from 'axios'
import { Check, Loader2, LogOut, MoreVertical, Shield, ShieldCheck, ShieldQuestion } from 'lucide-react'
import { useRouter } from 'next/navigation'
import qs from 'query-string'
import { useState } from 'react'

interface ServerMemberProps {
  member: Member & { Profile: Profile }
  role?: MemberRole
  server: Server
}
const ServerMember = ({ role, member, server }: ServerMemberProps) => {
  const [loadingId, setLoadingId] = useState('')
  const router = useRouter()
  const { user } = useUser()
  const { t } = useClientTranslation()

  const onClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`)
  }
  //  修改member数据
  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId)

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id
        }
      })
      await axios.delete(url)
      router.refresh()
      setLoadingId('')
    } catch (error) {
      console.error(error)
    }
  }

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId)

      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server.id
        }
      })
      await axios.patch(url, { role })
      router.refresh()
      setLoadingId('')
    } catch (error) {
      console.error(error)
    }
  }

  const onAction = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, actionType: 'role' | 'kick', role?: MemberRole) => {
    e.stopPropagation()
    if (actionType === 'role' && role) {
      onRoleChange(member.id, role)
    } else {
      onKick(member.id)
    }
  }
  return (
    <div
      onClick={onClick}
      key={member.id}
      className={cn(
        'p-2 flex items-center hover-animation rounded-md',
        member.Profile.id === user?.id && 'bg-zinc-200/70 dark:bg-zinc-700/70'
      )}
    >
      <div className="flex gap-x-2">
        <UserAvatar className="w-7 h-7  md:h-8 md:w-8" src={member.Profile.image} alt={member.Profile.name}></UserAvatar>
        <div className="flex flex-col text-sm font-medium">
          <div className=" flex gap-x-1">
            <span className={cn('text-zinc-500', member.Profile.id === user?.id && 'text-black dark:text-zinc-200')}>
              {member.Profile.name}
            </span>
            {ROLE_ICON_MAP[member.role]}
          </div>
          <span className={cn('text-xs text-zinc-500', member.Profile.id === user?.id && 'text-black dark:text-zinc-200')}>
            {member.Profile.email}
          </span>
        </div>
      </div>
      {role !== 'GUEST' && member.profileId !== user?.id && member.profileId !== server.profileId && loadingId !== member.id && (
        <DropdownMenu>
          <DropdownMenuTrigger className="ml-auto outline-none">
            <MoreVertical className="text-zinc-500 h-4 w-4 " />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <ShieldQuestion className="mr-2 h-4 w-4" />
                <span className="capitalize">{t('role')}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={e => onAction(e, 'role', 'GUEST')}>
                    <Shield className="w-4 h-4 mr-2" />
                    <span className="capitalize">{t('guest')}</span>
                    {member.role === 'GUEST' && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={e => onAction(e, 'role', 'MODERATOR')}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    <span className="capitalize">{t('moderator')}</span>
                    {member.role === 'MODERATOR' && <Check className="h-4 w-4 ml-auto" />}
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={e => onAction(e, 'kick')}>
              <LogOut className="h-4 w-4 mr-2" />
              <span className="capitalize">{t('kick')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {loadingId === member.id && <Loader2 className="h-4 w-4 ml-auto animate-spin" />}
    </div>
  )
}

export default ServerMember
