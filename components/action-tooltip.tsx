'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ActionToolTipProps {
  label: string
  children: React.ReactNode
  side?: 'top' | 'left' | 'bottom' | 'right'
  align?: 'start' | 'center' | 'end'
}

const ActionToolTip = ({ label, children, side, align }: ActionToolTipProps) => {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className='font-semibold capitalize' side={side} align={align}>
          {label.toLocaleLowerCase()}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActionToolTip
