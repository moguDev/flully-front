import { FollowsModal } from "./components/FollowsModal";
import { UserProfiles } from "./components/UserProfiles";

export default function ProfilePage() {
  return (
    <main className="py-20 p-2 max-w-2xl mx-auto">
      <UserProfiles />
      <FollowsModal />
    </main>
  );
}
