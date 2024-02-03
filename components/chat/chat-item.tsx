'use client'
import { LangValues } from '@/app/i18n/type'
import { MEMBER_ICON_MAP } from '@/constants/icon'
import { useClientTranslation } from '@/hooks/use-i18n'
import { Member, Profile } from '@prisma/client'
import { EditIcon, File, Trash } from 'lucide-react'

import UserAvatar from '@/components/user-avator'
import ActionTooltip from '@/components/action-tooltip'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { useModal } from '@/hooks/use-modal-state'
import { useParams, useRouter } from 'next/navigation'

interface ChatItemProps {
  member: Member & {
    Profile: Profile
  }
  content: string
  timestamp: string
  fileUrl: string | null
  currentMember: Member
  edited: boolean
  apiUrl: string
  deleted: boolean
}

const formSchema = z.object({
  content: z.string().min(1)
})
const ChatItem = ({ currentMember, fileUrl, member, content, timestamp, apiUrl, edited, deleted }: ChatItemProps) => {
  const [editing, setEditing] = useState(false)
  const { onOpen } = useModal()
  const { t } = useClientTranslation()
  const params = useParams()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: ''
    }
  })
  const fileType = fileUrl?.split('.').pop()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditing(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  })

  //双向绑定content内容
  useEffect(() => {
    form.setValue('content', content)
  }, [content, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.patch(apiUrl, values)
    // 无需修改，等待socket监听更新事件重新请求
    setEditing(false)
  }

  const onMemberClick = () => {
    if (member.id !== currentMember.id) {
      router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
    }
  }

  const isAdmin = currentMember.role === 'ADMIN'
  const isModerator = currentMember.role === 'MODERATOR'
  const isOwner = currentMember.profileId === member.profileId
  const canDelete = isOwner || isAdmin || isModerator

  return (
    <div className="mt-2 group flex gap-x-2 p-4 hover-animation relative">
      <div onClick={onMemberClick} className="flex items-center">
        <UserAvatar className="md:w-10 md:h-10 cursor-pointer " src={member.Profile.image}></UserAvatar>
      </div>
      <div className="flex flex-col gap-y-1 flex-1">
        <div className="flex items-center ">
          <p onClick={onMemberClick} className="text-sm font-semibold mr-1 hover:underline cursor-pointer">{member.Profile.name}</p>
          <ActionTooltip label={t(member.role.toLowerCase() as LangValues)}>{MEMBER_ICON_MAP[member.role]}</ActionTooltip>
          <span className="text-xs text-zinc-400">{timestamp}</span>
        </div>
        <div>
          {/* 展示图片 */}
          {fileUrl &&
            fileType &&
            (['jpg', 'jpeg', 'png', 'gif'].includes(fileType) ? (
              <a
                className="flex border rounded-md overflow-hidden bg-secondary h-48 w-48 relative"
                target="_blank"
                href={fileUrl}
                rel="noopener noreferrer"
              >
                <Image src={fileUrl} alt="Pic" fill></Image>
              </a>
            ) : (
              <div className="flex text-indigo-500 items-center rounded-md p-2 bg-secondary dark:bg-secondary/10 ">
                <File className="w-10 h-10 mr-1 fill-indigo-200 stroke-indigo-400"></File>
                <a href={fileUrl} target="_blank" rel="noopener noreferrer" className="text-base uppercase hover:underline">
                  {fileType}
                </a>
              </div>
            ))}
          {/* 展示消息 */}
          {!fileUrl &&
            (!editing ? (
              <div>
                {deleted ? (
                  <span className="italic text-sm text-zinc-300">{t('This message has been deleted')}</span>
                ) : (
                  <>
                    {content}
                    {edited && <span className="ml-1 text-[10px] text-zinc-300">({t('edited')})</span>}
                  </>
                )}
              </div>
            ) : (
              // 编辑消息
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input className="bg-zinc-400/10  focus:ring-transparent border-none" autoComplete="off" {...field}></Input>
                        </FormControl>
                        <FormDescription className="text-[11px]">{t('Press escape to cancel ,enter to save')}</FormDescription>
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            ))}
        </div>
      </div>
      {/* 编辑栏 */}
      {!deleted && (isOwner || canDelete) && (
        <div className="hidden group-hover:flex absolute right-8 top-0 -translate-y-1/4 bg-white dark:bg-zinc-800  p-1 border rounded-md gap-x-2">
          {!fileUrl && isOwner && (
            <ActionTooltip label={t('Edit')}>
              <EditIcon
                onClick={() => setEditing(true)}
                className="h-4 w-4 cursor-pointer text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition"
              ></EditIcon>
            </ActionTooltip>
          )}
          {canDelete && (
            <ActionTooltip label={t('Delete')}>
              <Trash
                onClick={() => onOpen('deleteMessage', { apiUrl })}
                className="h-4 w-4 cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              ></Trash>
            </ActionTooltip>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatItem
