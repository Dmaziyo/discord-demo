import { createServer } from '@/lib/db/server'
import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const data = await req.json()
  try {
    let result = await createServer(data)

    if (!result) {
      return NextResponse.json({ msg: 'unauthorized' }, { status: 401 })
    }

    return NextResponse.json({ ...result }, { status: 200 })
  } catch (error) {
    console.log('[SERVER_ERROR]', error)
    return NextResponse.json({ error }, { status: 500 })
  }
}
