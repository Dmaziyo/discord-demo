import NavigationAction from '@/components/navigation/navigation-action'
import { Separator } from '@/components/ui/separator'
import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { ScrollArea } from '@/components/ui/scroll-area'
import NavigationItem from '@/components/navigation/navigation-item'
import { ModeToggle } from '@/components/mode-toggle'
import { UserButton } from '@clerk/nextjs'
import { LocaleToggle } from '@/components/locale-toggle'

const NavigationSideBar = async () => {
  const profile = await currentProfile()
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  })
  return (
    <div className="w-full h-full dark:bg-[#1E1F22] flex flex-col items-center">
      <NavigationAction></NavigationAction>
      <Separator className="h-[2px] w-10 mx-auto my-4 bg-zinc-300" />
      <ScrollArea className="flex-1">
        {servers.map(server => {
          return (
            <div className="mb-4" key={server.id}>
              <NavigationItem imageUrl={server.image} serverId={server.id} name={server.name} />
            </div>
          )
        })}
      </ScrollArea>
      <div className="flex flex-col items-center  gap-5 pb-6">
        <LocaleToggle></LocaleToggle>
        <ModeToggle />
        <UserButton></UserButton>
      </div>
    </div>
  )
}

export default NavigationSideBar
