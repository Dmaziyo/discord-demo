'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import axios from 'axios'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const InvitePage = ({ params }: { params: { inviteCode: string } }) => {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [answerMsg, setAnswerMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const onCheck = async () => {
    setIsLoading(true)
    const result = await axios.get(`/api/servers/invite/join/${params.inviteCode}`)
    setAnswerMsg(result.data.msg)
    setTimeout(() => {
      router.push(`/servers/${result.data.id}`)
    }, 1000)
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white text-primary p-0 dark:bg-[#1E1F22]  ">
        <DialogHeader className="p-8">
          <DialogTitle className="text-center text-3xl font-bold">Invitation</DialogTitle>
          {!answerMsg ? (
            <>
              <DialogDescription className="text-center text-zinc-500">Do you wanna join the server?</DialogDescription>
              <div className="flex  gap-4">
                <Button disabled={isLoading} onClick={onCheck} variant="secondary" className="flex-1">
                  <CheckCircle2 />
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => {
                    router.push('/')
                  }}
                  variant="secondary"
                  className="flex-1"
                >
                  <XCircle />
                </Button>
              </div>
            </>
          ) : (
            <DialogDescription className="text-lg text-center text-zinc-500">{answerMsg}</DialogDescription>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default InvitePage
