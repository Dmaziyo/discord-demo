import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import React from 'react'

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex flex-col fixed dark:bg-[#1E1F22]  inset-y-0 w-[72px] z-30 py-3">
        <NavigationSidebar></NavigationSidebar>
      </div>
      <div className="md:pl-[72px] h-full">{children}</div>
    </div>
  )
}

export default ServerLayout
