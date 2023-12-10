import InitialModal from '@/components/initial-modal'
import db from '@/lib/db'
import { initialProfile } from '@/lib/db/profile'
import { redirect } from 'next/navigation'

const SetupPage = async () => {
  const profile = await initialProfile()
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  })
  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return <InitialModal></InitialModal>
}

export default SetupPage
