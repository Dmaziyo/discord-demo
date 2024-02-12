'use client'
import ActionToolTip from '@/components/action-tooltip'
import { Button } from '@/components/ui/button'
import { useClientTranslation } from '@/hooks/use-i18n'
import { Video, VideoOff } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'

const ChatVideoButton = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const videoState = searchParams?.get('video')
  const pathname = usePathname()
  // 通过router.query获取URL查询参数
  const { t } = useClientTranslation()
  const label = !videoState ? t('Start Video') : t('End Video')

  const url = qs.stringifyUrl(
    {
      url: pathname || '',
      query: {
        video: videoState ? undefined : true
      }
    },
    { skipNull: true }
  )
  const onClick = () => {
    router.replace(url)
  }
  return (
    <ActionToolTip side="bottom" label={label}>
      <Button onClick={onClick} variant="ghost" size="icon">
        {videoState ? <VideoOff /> : <Video />}
      </Button>
    </ActionToolTip>
  )
}

export default ChatVideoButton
