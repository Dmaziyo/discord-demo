import { initialProfile } from "@/lib/initial-profile";

const SetupPage = async () => {
  const user = await initialProfile()
  return <div>Set up Page</div>
}
 
export default SetupPage;