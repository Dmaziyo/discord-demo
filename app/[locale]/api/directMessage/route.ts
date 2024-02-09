import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { DirectMessage } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const PAGE_BATCH = 15

// 按批次返回messages，并且返回上一次的cursor
export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile()

    const searchParams = req.nextUrl.searchParams
    const conversationId = searchParams.get('conversationId')
    const cursor = searchParams.get('cursor')

    if (!conversationId) {
      return NextResponse.json({ msg: '[CONVERSATION_ID_MISSING]' }, { status: 400 })
    }

    let messages: DirectMessage[] = []
    if (cursor) {
      messages = await db.directMessage.findMany({
        take: PAGE_BATCH + 1,
        skip: 1, // Skip the cursor
        where: {
          conversationId
        },
        cursor: {
          id: cursor
        },
        include: {
          profile: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      messages = await db.directMessage.findMany({
        take: PAGE_BATCH + 1,
        where: {
          conversationId
        },
        include: {
          profile: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
    let nextCursor = null
    if (messages.length === PAGE_BATCH + 1) {
      messages.pop()
      nextCursor = messages[messages.length - 1].id
    }

    return NextResponse.json(
      {
        items: messages,
        nextCursor
      },
      { status: 200 }
    )
  } catch (error) {
    console.log('[ CONVERSATION_MESSAGE_GET_ERROR ] >', error)
  }
}
