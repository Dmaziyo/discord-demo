'use client'

import qs from 'query-string'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import UserAvatar from '@/components/user-avator'
import { useClientTranslation } from '@/hooks/use-i18n'

import { useModal } from '@/hooks/use-modal-state'
import { ServerWithMemberWithProfilesWithChannel } from '@/type'
import { useUser } from '@clerk/nextjs'
import { MemberRole } from '@prisma/client'
import axios from 'axios'
import { Check, Crown, Loader2, LogOut, MoreVertical, Shield, ShieldCheck, ShieldQuestion } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ROLE_ICON_MAP } from '@/constants/icon'

const MemberModal = () => {
  const { type, isOpen, onClose, onOpen, data } = useModal()
  const [loadingId, setLoadingId] = useState('')
  const router = useRouter()
  const { user } = useUser()
  const { t } = useClientTranslation()

  const server = data.server as ServerWithMemberWithProfilesWithChannel
  const isOpened = isOpen && type === 'members'

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
      const response = await axios.delete(url)
      router.refresh()
      onOpen('members', { server: response.data })
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
      const response = await axios.patch(url, { role })
      router.refresh()
      onOpen('members', { server: response.data })
      setLoadingId('')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-primary p-8 dark:bg-[#1E1F22]">
        <DialogHeader>
          <DialogTitle className=" text-center text-3xl font-bold">{t('Manage Your Members')}</DialogTitle>
          <DialogDescription className="flex justify-center gap-x-1">
            <span>{`${server?.members.length}`}</span>
            {t('members')}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-72">
          {server?.members.map(member => (
            <div key={member.id} className="mb-5 flex items-center">
              <div className="flex gap-x-2">
                <UserAvatar src={member.Profile.image} alt={member.Profile.name}></UserAvatar>
                <div className="flex flex-col text-sm font-medium">
                  <div className="flex gap-x-1">
                    {member.Profile.name}
                    {ROLE_ICON_MAP[member.role]}
                  </div>
                  <span className="text-xs text-zinc-500">{member.Profile.email}</span>
                </div>
              </div>
              {member.profileId !== user?.id && member.profileId !== server.profileId && loadingId !== member.id && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto">
                    <MoreVertical className="text-zinc-500 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="dark:bg-[#1E1F22]" align="center">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <ShieldQuestion className="mr-2 h-4 w-4" />
                        <span className="capitalize">{t('role')}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="dark:bg-[#1E1F22]">
                          <DropdownMenuItem onClick={() => onRoleChange(member.id, 'GUEST')}>
                            <Shield className="w-4 h-4 mr-2" />
                            <span className="capitalize">{t('guest')}</span>
                            {member.role === 'GUEST' && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onRoleChange(member.id, 'MODERATOR')}>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            <span className="capitalize">{t('moderator')}</span>
                            {member.role === 'MODERATOR' && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem onClick={() => onKick(member.id)}>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="capitalize">{t('kick')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {loadingId === member.id && <Loader2 className="h-4 w-4 ml-auto animate-spin" />}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
export default MemberModal
