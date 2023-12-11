import NavigationAction from '@/components/navigation/navigation-action'
import { Separator } from '@/components/ui/separator'
import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { ScrollArea } from '@/components/ui/scroll-area'
import NavigationItem from '@/components/navigation/navigation-item'

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
    <div>
      <NavigationAction></NavigationAction>
      <Separator className="h-[2px] w-10 mx-auto my-4 bg-zinc-300" />
      <ScrollArea>
        {servers.map(server => {
          return (
            <div className="mb-4" key={server.id}>
              <NavigationItem imageUrl={server.image} serverId={server.id} name={server.name} />
            </div>
          )
        })}
      </ScrollArea>
    </div>
  )
}

export default NavigationSideBar
