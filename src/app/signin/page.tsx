import { LoginForm } from "./components/LoginForm";

export default function SigninPage() {
  return (
    <main className="bg-base min-h-screen w-full">
      <h1 className="text-main font-bold flex items-center text-lg">
        <span className="material-icons mr-0.5">login</span>
        flullyアカウントでログイン
      </h1>
      <LoginForm />
    </main>
  );
}
