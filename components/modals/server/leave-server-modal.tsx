'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useClientTranslation } from '@/hooks/use-i18n'

import { useModal } from '@/hooks/use-modal-state'
import axios from 'axios'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

const LeaveServerModal = () => {
  const { type, isOpen, onClose, onOpen, data } = useModal()
  const { t } = useClientTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const { server } = data
  const isOpened = isOpen && type === 'leaveServer'
  const onCheck = async () => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/servers/${server?.id}/leave`)
      onClose();
      window.location.replace('/')
    } catch (error) {
      console.error('[ LEAVE_SERVER ] >', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-primary p-0 dark:bg-[#1E1F22]   ">
        <DialogHeader className="p-8">
          <DialogTitle className="text-primary text-center text-3xl font-bold">{t('Leave Server')}</DialogTitle>
          <DialogDescription className="text-center">
            {t('Are you sure to leave')}
            <span className="ml-1 font-bold">{server?.name}</span>?
          </DialogDescription>
          <div className="flex  gap-4">
            <Button onClick={onCheck} disabled={isLoading} variant="secondary" className="flex-1">
              <CheckCircle2 />
            </Button>
            <Button disabled={isLoading} onClick={onClose} variant="secondary" className="flex-1">
              <XCircle />
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default LeaveServerModal
