'use client'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useClientTranslation } from '@/hooks/use-i18n'
import { Search } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface ServerSearchProps {
  searchData:
    | {
        label: string
        type: 'channel' | 'member'
        data:
          | {
              name: string
              id: string
              icon: React.ReactNode
            }[]
          | undefined
      }[]
}

const ServerSearch = ({ searchData }: ServerSearchProps) => {
  const [open, setOpen] = useState(false)
  const { t } = useClientTranslation()
  const router = useRouter()
  const params = useParams<{ serverId: string }>()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])
  const onClick = (id: string, type: 'channel' | 'member') => {
    console.log('[click  ] >')
    if (type === 'channel') {
      setOpen(false)
      router.push(`/servers/${params?.serverId}/channels/${id}`)
    } else if (type === 'member') {
      router.push(`/servers/${params?.serverId}/members/${id}`)
    }
  }
  return (
    <>
      <div onClick={() => setOpen(true)} className="flex text-sm items-center gap-2 p-2 hover-animation cursor-pointer rounded-md">
        <Search className="w-4 h-4 text-zinc-500" />
        {t('Search')}
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>k
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput  placeholder={t('Search members or channels')} />
        <CommandList className="dark:bg-[#1E1F22]">
          <CommandEmpty>{t('No results found')}</CommandEmpty>
          {searchData
            .filter(group => group.data?.length)
            .map(group => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.data?.map(item => (
                  <CommandItem className="cursor-pointer" onSelect={() => onClick(item.id, group.type)} key={item.id}>
                    {item.icon}
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default ServerSearch
