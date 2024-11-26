import { Metadata } from "next";
import { SignupForm } from "./components/SignupForm";

export const metadata: Metadata = {
  title:
    "アカウントを作成 | flully - ふらりと出会った動物をシェアできるコミュニティ",
};

export default function SignupPage() {
  return (
    <main className="bg-base max-w-xl mx-auto py-24">
      <SignupForm />
    </main>
  );
}
