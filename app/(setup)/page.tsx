import InitialModal from '@/components/initial-modal'
import db from '@/lib/db'
import { initialProfile } from '@/lib/db/profile'

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
    return <div>{server.name}</div>
  }

  return <InitialModal></InitialModal>
}

export default SetupPage
