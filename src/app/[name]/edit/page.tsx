import { DeleteAccountModal } from "./components/DeleteAccountModal";
import { ProfileEditForm } from "./components/ProfileEditForm";

export default function ProfileEditPage() {
  return (
    <main className="py-20 max-w-xl mx-auto">
      <ProfileEditForm />
      <DeleteAccountModal />
    </main>
  );
}
