'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { useModal } from '@/hooks/use-modal-state'
import { Copy, RefreshCcw } from 'lucide-react'

const InviteModal = () => {
  const { type, isOpen, onClose, onOpen } = useModal()

  const isOpened = isOpen && type === 'invite'

  return (
    <Dialog open={isOpened} onOpenChange={onClose}>
      <DialogContent className="bg-white p-0">
        <DialogHeader className="p-8">
          <DialogTitle className="text-black text-center text-3xl font-bold">Invite Your Friends</DialogTitle>
          <div className="flex pt-9 flex-col">
            <div className="uppercase text-sm font-bold text-zinc-500">server invite link</div>
            <div className="flex mt-3 items-center gap-2">
              <Input className="bg-zinc-300"></Input>
              <Button className="dark:bg-transparent bg-neutral-500" size="icon">
                <Copy></Copy>
              </Button>
            </div>
            <div>
              <Button className="text-xs text-zinc-400" variant="link">
                Generate a new link <RefreshCcw className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default InviteModal
