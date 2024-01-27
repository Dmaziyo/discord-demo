import db from '@/lib/db'
import { currentProfile } from '@/lib/db/profile'
import { ChannelMessage } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const PAGE_BATCH = 15

// 按批次返回messages，并且返回上一次的cursor
export async function GET(req: NextRequest) {
  try {
    const profile = await currentProfile()

    const searchParams = req.nextUrl.searchParams
    const channelId = searchParams.get('channelId')
    const cursor = searchParams.get('cursor')

    if (!channelId) {
      return NextResponse.json({ msg: '[SERVER_ID_MISSING]' }, { status: 400 })
    }

    let messages: ChannelMessage[] = []
    if (cursor) {
      messages = await db.channelMessage.findMany({
        take: PAGE_BATCH,
        skip: 1, // Skip the cursor
        where: {
          channelId
        },
        cursor: {
          id: cursor
        },
        include: {
          member: {
            include: {
              Profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    } else {
      messages = await db.channelMessage.findMany({
        take: PAGE_BATCH,
        where: {
          channelId
        },
        include: {
          member: {
            include: {
              Profile: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    }
    let nextCursor = null
    if (messages.length === PAGE_BATCH) {
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
    console.log('[ CHANNEL_MESSAGE_GET_ERROR ] >', error)
  }
}
