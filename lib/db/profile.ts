import db from '@/lib/db'
import { auth, currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

export async function currentProfile() {
  const { userId } = await auth()

  if (!userId) return null

  let profile = await db.profile.findUnique({
    where: {
      id: userId // replace with the actual profile ID you're looking for
    }
  })
  return profile
}

export async function initialProfile() {
  const user = await currentUser()
  let profile = await currentProfile()
  if (user && !profile) {
    profile = await db.profile.create({
      data: {
        id: user.id,
        name: `${user.firstName}${user.lastName}`,
        image: user.imageUrl,
        email: user.emailAddresses[0].emailAddress
      }
    })
  }
  return profile
}
