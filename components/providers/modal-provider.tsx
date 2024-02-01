'use client'
import { useEffect, useState } from 'react'
import ServerCreateModal from '@/components/modals/server/server-create-modal'
import InviteModal from '@/components/modals/member/invite-modal'
import ServerEditModal from '@/components/modals/server/server-edit-modal'
import MemberModal from '@/components/modals/member/member-modal'
import ChannelCreateModal from '@/components/modals/channel/channel-create-modal'
import LeaveServerModal from '@/components/modals/server/leave-server-modal'
import DeleteServerModal from '@/components/modals/server/delete-server-modal'
import DeleteChannelModal from '@/components/modals/channel/delete-channel-modal'
import ChannelEditModal from '@/components/modals/channel/channel-edit-modal'
import FileAttachmentModal from '@/components/modals/file-attachment-modal'
import DeleteMessageModal from '@/components/modals/delete-message-modal'

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
      <ChannelEditModal></ChannelEditModal>
      <LeaveServerModal></LeaveServerModal>
      <DeleteServerModal></DeleteServerModal>
      <DeleteChannelModal></DeleteChannelModal>
      <FileAttachmentModal></FileAttachmentModal>
      <DeleteMessageModal></DeleteMessageModal>
    </>
  )
}

export default ModalProvider
