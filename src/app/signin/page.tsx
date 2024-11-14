import { LoginForm } from "./components/LoginForm";

export default function SigninPage() {
  return (
    <main className="bg-base max-w-xl mx-auto py-24 p-4">
      <h1 className="text-main font-bold flex items-center text-lg">
        <span className="material-icons mr-0.5">login</span>
        flullyアカウントでログイン
      </h1>
      <LoginForm />
    </main>
  );
}
