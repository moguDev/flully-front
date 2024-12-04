import { Metadata } from "next";
import { NotificationsList } from "./components/NotificationsList";

export const metadata: Metadata = {
  title: "お知らせ | flully - ふらりと出会った動物をシェアできるコミュニティ",
};

export default function NotificationsPage() {
  return (
    <main className="bg-base max-w-2xl mx-auto py-24">
      <NotificationsList />
    </main>
  );
}
