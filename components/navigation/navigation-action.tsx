import { Plus } from 'lucide-react'
import ActionToolTip from '@/components/action-tooltip'

const NavigationAction = () => {
  return (
    <ActionToolTip label="Add a server" side="right" align="start">
      <button className="group flex items-center justify-center ">
        <div className="dark:bg-neutral-700 flex mx-3 justify-center items-center h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] group-hover:bg-emerald-500  transition-all">
          <Plus size={25} className="text-emerald-500 transition group-hover:text-white "></Plus>
        </div>
      </button>
    </ActionToolTip>
  )
}

export default NavigationAction
