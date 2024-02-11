'use client'

import '@livekit/components-styles'
import { LiveKitRoom, VideoConference, ControlBar, RoomAudioRenderer, StartAudio } from '@livekit/components-react'

import { useClientTranslation } from '@/hooks/use-i18n'
import { useUser } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'
import qs from 'query-string'
import { useEffect, useState } from 'react'
interface ChatVideoProps {
  chatId: string
  video: boolean
  audio: boolean
}
const ChatVideo = ({ chatId, video, audio }: ChatVideoProps) => {
  const { user } = useUser()
  const [token, setToken] = useState('')
  const { t } = useClientTranslation()
  let name = `${user?.firstName} ${user?.lastName}`
  const url = qs.stringifyUrl(
    {
      url: '/api/getParticipantToken',
      query: {
        room: chatId,
        username: name
      }
    },
    { skipNull: true }
  )
  useEffect(() => {
    ;(async () => {
      try {
        const resp = await fetch(url)
        const data = await resp.json()
        setToken(data.token)
      } catch (e) {
        console.error(e)
      }
    })()
  }, [name, url])

  if (token === '') {
    return (
      <div className="flex flex-col gap-1 flex-1 items-center justify-center">
        <Loader2 className="w-7 h-7 text-zinc-500 animate-spin" />
        <span className="text-zinc-400">{t('Loading...')}</span>
      </div>
    )
  }
  return (
    <LiveKitRoom
      video={video}
      audio={audio}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      connect={true}
    >
      <VideoConference></VideoConference>
    </LiveKitRoom>
  )
}

export default ChatVideo
