import ServerSideBar from '@/components/server/server-sidebar'

const ServerPageLayout = ({
  children,
  params
}: {
  children: React.ReactNode
  params: {
    serverId: string
    locale: string
  }
}) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col fixed w-60 inset-y-0  z-20 ">
        <ServerSideBar serverId={params.serverId} locale={params.locale} />
      </div>
      <div className="md:pl-60 h-full">{children}</div>
    </div>
  )
}

export default ServerPageLayout
