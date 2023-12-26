'use client'

import { Plus } from 'lucide-react'
import ActionToolTip from '@/components/action-tooltip'
import { useModal } from '@/hooks/use-modal-state'
import { useClientTranslation } from '@/hooks/use-i18n'

const NavigationAction = () => {
  const { onOpen } = useModal()
  const { t } = useClientTranslation()
  return (
    <ActionToolTip label={t('Add a server')} side="right" align="start">
      <button onClick={() => onOpen('createServer')} className="group flex items-center justify-center ">
        <div className="dark:bg-neutral-700 flex mx-3 justify-center items-center h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] group-hover:bg-emerald-500  transition-all">
          <Plus size={25} className="text-emerald-500 transition group-hover:text-white "></Plus>
        </div>
      </button>
    </ActionToolTip>
  )
}

export default NavigationAction
