import { SignupForm } from "./components/SignupForm";

export default function SignupPage() {
  return (
    <main className="bg-base min-h-screen w-full">
      <h1 className="text-main font-bold flex items-center text-lg">
        <span className="material-icons mr-0.5">person_add</span>
        flullyアカウントを作成
      </h1>
      <SignupForm />
    </main>
  );
}
