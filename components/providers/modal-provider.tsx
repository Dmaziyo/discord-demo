'use client'
import { useEffect, useState } from 'react'
import ServerCreateModal from '@/components/modals/server-create-modal'
import InviteModal from '@/components/modals/invite-modal'
import ServerEditModal from '@/components/modals/server-edit-modal'
import MemberModal from '@/components/modals/member-modal'
import ChannelCreateModal from '@/components/modals/channel-create-modal'
import LeaveServerModal from '@/components/modals/leave-server-modal'
import DeleteServerModal from '@/components/modals/delete-server-modal'
import DeleteChannelModal from '@/components/modals/delete-channel-modal'

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
      <MemberModal></MemberModal>
      <ChannelCreateModal></ChannelCreateModal>
      <LeaveServerModal></LeaveServerModal>
      <DeleteServerModal></DeleteServerModal>
      <DeleteChannelModal></DeleteChannelModal>
    </>
  )
}

export default ModalProvider
