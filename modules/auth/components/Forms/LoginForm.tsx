import { cn } from "@/lib/utils";
import { Button } from "@/modules/shared/components/UI/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/modules/shared/components/UI/field";
import { Input } from "@/modules/shared/components/UI/input";

export function LoginForm() {
  return (
    <form className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to Your Account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email address and password to continue.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor='email' required>
            Email Address
          </FieldLabel>
          <Input id='email' type='email' placeholder='example@email.com' required />
        </Field>
        <Field>
          <div className='flex items-center'>
            <FieldLabel htmlFor='password' required>
              Password
            </FieldLabel>
            <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
              Forgot your password?
            </a>
          </div>
          <Input id='password' type='password' required />
        </Field>
        <Field>
          <Button type='submit'>Login</Button>
        </Field>
        <FieldDescription className='px-6 text-center'>
          Don&apos;t have an account? <a href='/auth/signup'>Sign up</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
