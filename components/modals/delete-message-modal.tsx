'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useClientTranslation } from '@/hooks/use-i18n'

import { useModal } from '@/hooks/use-modal-state'
import axios from 'axios'
import { useState } from 'react'

const DeleteMessageModal = () => {
  const { type, isOpen, onClose, data } = useModal()
  const { t } = useClientTranslation()
  const [isLoading, setIsLoading] = useState(false)

  const { apiUrl } = data
  const isOpened = isOpen && type === 'deleteMessage'
  const onCheck = async () => {
    try {
      setIsLoading(true)
      await axios.delete(apiUrl || '')
      onClose()
    } catch (error) {
      console.error('[ DELETE_MESSAGE ] >', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog open={isOpened}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t('Are you sure to delete')}</AlertDialogTitle>
          <AlertDialogDescription>{t('This action cannot be undone.')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} onClick={onClose}>
            {t('Cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onCheck} disabled={isLoading}>
            {t('Confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default DeleteMessageModal
