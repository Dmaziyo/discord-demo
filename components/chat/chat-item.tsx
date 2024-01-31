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

interface ChatItemProps {
  member: Member & {
    Profile: Profile
  }
  content: string
  timestamp: string
  fileUrl: string | null
  currentMember: Member
}

const formSchema = z.object({
  content: z.string().min(1)
})
const ChatItem = ({ currentMember, fileUrl, member, content, timestamp }: ChatItemProps) => {
  const [editing, setEditing] = useState(false)
  const { t } = useClientTranslation()

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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // TODO 调用修改message的api(url由父组件传入)
  }

  const onDelete = () => {
    // TODO 弹出dialog确认是否删除
  }

  const isAdmin = currentMember.role === 'ADMIN'
  const isModerator = currentMember.role === 'MODERATOR'
  const isOwner = currentMember.profileId === member.profileId
  const canDelete = isOwner || isAdmin || isModerator

  return (
    <div className="mt-2 group flex gap-x-2 p-4 hover-animation relative">
      <UserAvatar className="md:w-10 md:h-10 cursor-pointer " src={member.Profile.image}></UserAvatar>
      <div className="flex flex-col gap-y-1 flex-1">
        <div className="flex items-center ">
          <p className="text-sm font-semibold mr-1 hover:underline cursor-pointer">{member.Profile.name}</p>
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
              <div>{content}</div>
            ) : (
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
      {(isOwner || canDelete) && (
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
              <Trash className="h-4 w-4 cursor-pointer text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition"></Trash>
            </ActionTooltip>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatItem
