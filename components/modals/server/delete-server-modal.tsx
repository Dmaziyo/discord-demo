'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useClientTranslation } from '@/hooks/use-i18n'

import { useModal } from '@/hooks/use-modal-state'
import axios from 'axios'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useState } from 'react'

const DeleteServerModal = () => {
  const { type, isOpen, onClose, data } = useModal()
  const { t } = useClientTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const { server } = data
  const isOpened = isOpen && type === 'deleteServer'
  const onCheck = async () => {
    try {
      setIsLoading(true)
      await axios.delete(`/api/servers/${server?.id}`)
      onClose();
      window.location.replace('/')
    } catch (error) {
      console.error('[ DELETE_SERVER ] >', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-primary p-0 dark:bg-[#1E1F22]   ">
        <DialogHeader className="p-8">
          <DialogTitle className="text-primary text-center text-3xl font-bold">{t('Delete Server')}</DialogTitle>
          <DialogDescription className="text-center text-rose-300 ">
            {t('Are you sure to delete')}
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
export default DeleteServerModal
