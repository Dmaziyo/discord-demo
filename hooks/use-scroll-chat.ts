import { debounce } from '@/lib/utils'
import { RefObject, useEffect } from 'react'

interface useScrollChatProps {
  loadMoreData: () => void
  scrollRef: RefObject<HTMLDivElement | null>
  enabled: boolean
}
const useScrollChat = ({ loadMoreData, scrollRef, enabled }: useScrollChatProps) => {
  useEffect(() => {
    if (scrollRef.current) {
      const scrollEl = scrollRef.current
      const handleScroll = debounce(() => {
        // 因为采用flex-reverse，为了发送消息自动滑倒底部，所以scrollTop是负的
        const isAtTop = Math.abs(scrollEl.scrollTop) + scrollEl.clientHeight === scrollEl.scrollHeight

        if (isAtTop && enabled) {
          loadMoreData()
        }
      }, 800)
      scrollEl.addEventListener('scroll', handleScroll)
      return () => {
        scrollEl.removeEventListener('scroll', handleScroll)
      }
    }
  }, [enabled, loadMoreData, scrollRef])
}

export default useScrollChat
