import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

interface UserAvatarProps {
  src?: string
  alt?: string
  className?: string
}

const UserAvatar = ({ src, alt, className }: UserAvatarProps) => {
  return (
    <Avatar className={cn('md:h-7 md:w-7 h-10 w-10', className)}>
      <AvatarImage src={src} />
      <AvatarFallback>{alt?.slice(0, 2)}</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
