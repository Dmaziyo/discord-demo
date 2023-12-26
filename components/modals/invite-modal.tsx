'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useClientTranslation } from '@/hooks/use-i18n'

import { useModal } from '@/hooks/use-modal-state'
import { useOrigin } from '@/hooks/use-origin'
import axios from 'axios'
import { Check, Copy, RefreshCcw } from 'lucide-react'
import { useState } from 'react'

const InviteModal = () => {
  const { type, isOpen, onClose, onOpen, data } = useModal()
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState(false)
  const origin = useOrigin()
  const { t } = useClientTranslation()

  const { server } = data
  const isOpened = isOpen && type === 'invite'
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1000)
  }

  const onRefresh = async () => {
    try {
      setLoading(true)
      const response = await axios.patch(`/api/servers/invite/${server?.id}`)

      // 再次触发render
      onOpen('invite', { server: response.data })
    } catch (error: any) {
      console.error('[REFRESH_INVITE_CODE]', error.response)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0">
        <DialogHeader className="p-8">
          <DialogTitle className="text-black text-center text-3xl font-bold">{t('Invite Your Friends')}</DialogTitle>
          <div className="flex pt-9 flex-col">
            <div className="uppercase text-sm font-bold text-zinc-500">{t('server invite link')}</div>
            <div className="flex mt-3 items-center gap-2">
              <Input readOnly disabled={loading} value={inviteUrl} className="bg-zinc-300"></Input>
              <Button disabled={loading} onClick={onCopy} className="dark:bg-transparent bg-neutral-500" size="icon">
                {copied ? <Check></Check> : <Copy></Copy>}
              </Button>
            </div>
            <div>
              <Button disabled={loading} onClick={onRefresh} className="text-xs text-zinc-400" variant="link">
                {t('Generate a new link')} <RefreshCcw className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default InviteModal
