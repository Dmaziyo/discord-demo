import db from '@/lib/db'

export async function findOrCreateConversation(memberOneId: string, memberTwoId: string) {
  try {
    let conversation = await findConversation(memberOneId, memberTwoId)
    if (!conversation) {
      conversation = await createConversation(memberOneId, memberTwoId)
    }
    return conversation
  } catch (error) {
    console.log('[ CONVERSATION_SETUP_ERROR ] >', error)
  }
}

async function findConversation(memberOneId: string, memberTwoId: string) {
    const conversation = await db.conversation.findFirst({
      where: {
        OR: [
          {
            initiatorId: memberOneId,
            receiverId: memberTwoId
          },
          {
            initiatorId: memberTwoId,
            receiverId: memberOneId
          }
        ]
      },
      include: {
        initiator: {
          include: {
            Profile: true
          }
        },
        receiver: {
          include: {
            Profile: true
          }
        }
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
        initiator: {
          include: {
            Profile: true
          }
        },
        receiver: {
          include: {
            Profile: true
          }
        }
      }
    })
    return conversation
  } catch (error) {
    console.log('[CREATE_CONVERSATION] >', error)
    return null
  }
}
