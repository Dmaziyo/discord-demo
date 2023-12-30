'use client'
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
import axios from 'axios'
import { Check, Crown, LogOut, MoreVertical, Shield, ShieldHalf, ShieldQuestion } from 'lucide-react'
import { useState } from 'react'

const ROLE_ICON_MAP = {
  GUEST: null,
  MODERATOR: <ShieldHalf className="w-4 h-4" />,
  ADMIN: <Crown className="w-4 h-4 text-yellow-500" />
}

const MemberModal = () => {
  const { type, isOpen, onClose, onOpen, data } = useModal()
  const { user } = useUser()
  const { t } = useClientTranslation()

  const server = data.server as ServerWithMemberWithProfilesWithChannel
  const isOpened = isOpen && type === 'members'

  // TODO 提供api修改member数据

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-8">
        <DialogHeader>
          <DialogTitle className="text-black text-center text-3xl font-bold">{t('Manage Your Members')}</DialogTitle>
          <DialogDescription className="flex justify-center gap-x-1">
            <p>{`${server?.members.length}`}</p>
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
                    {ROLE_ICON_MAP[member.type]}
                  </div>
                  <span className="text-xs text-zinc-500">{member.Profile.email}</span>
                </div>
              </div>
              {member.profileId !== user?.id && member.profileId !== server.profileId && (
                <DropdownMenu>
                  <DropdownMenuTrigger className="ml-auto">
                    <MoreVertical className="text-zinc-500 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <ShieldQuestion className="mr-2 h-4 w-4" />
                        <span className="capitalize">{t('role')}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>
                            <Shield className="w-4 h-4 mr-2" />
                            <span className="capitalize">{t('guest')}</span>
                            {member.type === 'GUEST' && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ShieldHalf className="mr-2 h-4 w-4" />
                            <span className="capitalize">{t('moderator')}</span>
                            {member.type === 'MODERATOR' && <Check className="h-4 w-4 ml-auto" />}
                          </DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      <LogOut className="h-4 w-4 mr-2" />
                      <span className="capitalize">{t('kick')}</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
export default MemberModal
