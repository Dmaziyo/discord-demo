import UserAvatar from '@/components/user-avator'
import { MEMBER_ICON_MAP } from '@/constants/icon'
import { Member, Profile } from '@prisma/client'
import Image from 'next/image'

interface ChatItemProps {
  member: Member & {
    Profile: Profile
  }
  content: string
  timestamp: string
  fileUrl: string | null
}
const loaderProp = ({ src }: { src: string }) => {
  return src
}
// TODO 能够展示附件，以及编辑和删除功能
const ChatItem = ({ fileUrl, member, content, timestamp }: ChatItemProps) => {
  const fileType = fileUrl?.split('.').pop()
  return (
    <div className="mt-2 flex gap-x-2 p-4 hover-animation">
      <UserAvatar className="md:w-10 md:h-10 " src={member.Profile.image}></UserAvatar>
      <div className="flex flex-col">
        <div className="flex items-center ">
          <p className="text-sm font-semibold mr-1">{member.Profile.name}</p>
          {MEMBER_ICON_MAP[member.role]}
          <span className="text-xs text-zinc-400">{timestamp}</span>
        </div>
        <div>
          {/* 展示图片 */}
          {fileUrl && fileType && ['jpg', 'jpeg', 'png', 'gif'].includes(fileType) && (
            <a className="flex border rounded-md bg-secondary h-48 w-48 relative" target="_blank" href={fileUrl} rel="noopener noreferrer">
              <Image loader={loaderProp} src={fileUrl} alt="Pic" fill></Image>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ChatItem
