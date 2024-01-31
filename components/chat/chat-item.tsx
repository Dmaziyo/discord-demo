'use client'
import { LangValues } from '@/app/i18n/type'
import ActionTooltip from '@/components/action-tooltip'
import UserAvatar from '@/components/user-avator'
import { MEMBER_ICON_MAP } from '@/constants/icon'
import { useClientTranslation } from '@/hooks/use-i18n'
import { Member, Profile } from '@prisma/client'
import { File } from 'lucide-react'
import Image from 'next/image'

interface ChatItemProps {
  member: Member & {
    Profile: Profile
  }
  content: string
  timestamp: string
  fileUrl: string | null
}
// TODO 能够展示附件，以及编辑和删除功能
const ChatItem = ({ fileUrl, member, content, timestamp }: ChatItemProps) => {
  const { t } = useClientTranslation()
  const fileType = fileUrl?.split('.').pop()
  return (
    <div className="mt-2 flex gap-x-2 p-4 hover-animation">
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
          {!fileUrl && <div>{content}</div>}
        </div>
      </div>
    </div>
  )
}

export default ChatItem
