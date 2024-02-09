import db from '@/lib/db'

export async function findOrCreateConversation(profileOneId: string, profileTwoId: string) {
  try {
    let conversation = await findConversation(profileOneId, profileTwoId)
    if (!conversation) {
      conversation = await createConversation(profileOneId, profileTwoId)
    }
    return conversation
  } catch (error) {
    console.log('[ CONVERSATION_SETUP_ERROR ] >', error)
  }
}

async function findConversation(profileOneId: string, profileTwoId: string) {
  const conversation = await db.conversation.findFirst({
    where: {
      OR: [
        {
          initiatorId: profileOneId,
          receiverId: profileTwoId
        },
        {
          initiatorId: profileTwoId,
          receiverId: profileOneId
        }
      ]
    },
    include: {
      initiator: true,
      receiver: true
    }
  })
  return conversation
}

async function createConversation(initiatorId: string, receiverId: string) {
  try {
    const conversation = await db.conversation.create({
      data: {
        initiatorId,
        receiverId
      },
      include: {
        initiator: true,
        receiver: true
      }
    })
    return conversation
  } catch (error) {
    console.log('[CREATE_CONVERSATION] >', error)
    return null
  }
}
