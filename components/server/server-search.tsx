'use client'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { useClientTranslation } from '@/hooks/use-i18n'
import { Search } from 'lucide-react'
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
  // TODO 理解useState,并且实现成员跳转和频道跳转
  useEffect(() => {
    console.log('[ 反复执行 ] >')
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        // open是闭包，所以拿到的一直都是false的那个值
        console.log('[ open before] >', open)
        setOpen(!open)
        console.log('[ open after ] >', open)
      }
    }
    document.addEventListener('keydown', down)
    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [])
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="flex text-sm items-center gap-2 p-2 hover:bg-zinc-700/10 cursor-pointer transition rounded-md"
      >
        <Search className="w-4 h-4 text-zinc-500" />
        {t('Search')}
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>k
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={t('Search members or channels')} />
        <CommandList>
          <CommandEmpty>{t('No results found')}</CommandEmpty>
          {searchData
            .filter(group => group.data?.length)
            .map(group => (
              <CommandGroup key={group.label} heading={group.label}>
                {group.data?.map(item => (
                  <CommandItem key={item.id}>
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
