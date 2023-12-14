'use client'
import ActionToolTip from '@/components/action-tooltip'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
interface NavigationItemProps {
  name: string
  imageUrl: string
  serverId: string
}

const NavigationItem = ({ name, imageUrl, serverId }: NavigationItemProps) => {
  const params = useParams()
  const router = useRouter()

  return (
    <ActionToolTip label={name} side="right" align="center">
      <button
        onClick={() => {
          router.push(`/servers/${serverId}`)
        }}
        className="group relative flex items-center justify-center "
      >
        <div
          className={cn(
            'absolute left-0 h-[36px] w-[4px] bg-primary rounded-lg',
            params.serverId === serverId ? 'h-[36px]' : 'h-[8px] group-hover:h-[20px] transition-all'
          )}
        ></div>
        <div
          className={cn(
            'overflow-hidden h-[48px] w-[48px] rounded-[24px] mx-3',
            params.serverId === serverId ? 'rounded-[16px]' : 'rounded-[24px] group-hover:rounded-[16px] transition-all'
          )}
        >
          <div className="h-[48px] w-[48px] overflow-hidden relative">
            <Image fill src={imageUrl} alt={name}></Image>
          </div>
        </div>
      </button>
    </ActionToolTip>
  )
}

export default NavigationItem
