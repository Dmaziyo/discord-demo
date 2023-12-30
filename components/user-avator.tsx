import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  alt?: string
}

const UserAvatar = ({ src, alt }: UserAvatarProps) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{alt?.slice(0,2)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
