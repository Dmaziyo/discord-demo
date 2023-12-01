import InitialModal from '@/components/initial-modal'
import { initialProfile } from '@/lib/initial-profile'

const SetupPage = async () => {
  const profile = await initialProfile()
  return <InitialModal></InitialModal>
}

export default SetupPage
