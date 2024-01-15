import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import ServerSidebar from '@/components/server/server-sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

interface MobileActionProps {
  serverId: string
  locale: string
}
const MobileAction = ({ serverId, locale }: MobileActionProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="md:hidden" variant="ghost" size="icon">
          <Menu></Menu>
        </Button>
      </SheetTrigger>
      <SheetContent className="gap-0 p-0 flex h-full" side="left">
        <div className="w-[72px]">
          <NavigationSidebar></NavigationSidebar>
        </div>
        <ServerSidebar serverId={serverId} locale={locale}></ServerSidebar>
      </SheetContent>
    </Sheet>
  )
}

export default MobileAction
