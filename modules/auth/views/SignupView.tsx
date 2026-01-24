import { SignupForm } from "../components/Forms";
import { AuthLayout } from "../layouts/AuthLayout";

export function SignupView() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
