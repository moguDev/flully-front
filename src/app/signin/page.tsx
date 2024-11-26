import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";

export const metadata: Metadata = {
  title: "ログイン | flully - ふらりと出会った動物をシェアできるコミュニティ",
};

export default function SigninPage() {
  return (
    <main className="bg-base max-w-xl mx-auto py-24">
      <LoginForm />
    </main>
  );
}
