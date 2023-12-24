'use client'
import { useEffect, useState } from 'react'
import ServerCreateModal from '@/components/modals/server-create-modal'
import InviteModal from '@/components/modals/invite-modal'
import ServerEditModal from '@/components/modals/server-edit-modal'

const ModalProvider = () => {
  const [isMount, setIsMount] = useState(false)

  useEffect(() => {
    setIsMount(true)
  }, [])

  if (!isMount) {
    return null
  }

  return (
    <>
      <ServerCreateModal />
      <InviteModal></InviteModal>
      <ServerEditModal></ServerEditModal>
    </>
  )
}

export default ModalProvider
