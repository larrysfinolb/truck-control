import { LoginForm } from "../components/Forms";
import { AuthLayout } from "../layouts/AuthLayout";

export function LoginView() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
