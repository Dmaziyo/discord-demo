import React from 'react'

const ServerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex fixed inset-y-0 w-[72px] z-30">侧边栏</div>
      <div className='pl-[72px] h-full'>{children}</div>
    </div>
  )
}

export default ServerLayout
