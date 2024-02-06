import qs from 'query-string'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useSocket } from '@/components/providers/socket-provider'

interface useChatQueryProps {
  apiUrl: string
  queryKey: string
  query: Partial<Record<'conversationId' | 'channelId', string>>
}

const useChatQuery = ({ apiUrl, query, queryKey }: useChatQueryProps) => {
  const { isConnected } = useSocket()
  const fetchData = async (cursor?: number) => {
    const url = qs.stringifyUrl({
      url: apiUrl,
      query: {
        ...query,
        cursor
      }
    })
    const res = await fetch(url)
    return res.json()
  }
  const { data, status, fetchNextPage,isFetchingNextPage ,hasNextPage} = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: async ({ pageParam }) => fetchData(pageParam),
    initialPageParam: undefined,
    getNextPageParam: (lastPage: any) => {
      return lastPage.nextCursor ?? undefined
    },
    refetchInterval: isConnected ? false : 2000
  })
  return { data, status, fetchNextPage,isFetchingNextPage,hasNextPage }
}

export default useChatQuery
