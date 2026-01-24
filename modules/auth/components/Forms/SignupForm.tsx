import { cn } from "@/lib/utils";
import { Button } from "@/modules/shared/components/UI/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/modules/shared/components/UI/field";
import { Input } from "@/modules/shared/components/UI/input";

export function SignupForm() {
  return (
    <form className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Sign Up for an Account</h1>
          <p className='text-muted-foreground text-sm text-balance'>Fill out the form below to create your account</p>
        </div>
        <Field>
          <FieldLabel htmlFor='name' required>
            Full Name
          </FieldLabel>
          <Input id='name' type='text' placeholder='John Doe' required />
        </Field>
        <Field>
          <FieldLabel htmlFor='email' required>
            Email Address
          </FieldLabel>
          <Input id='email' type='email' placeholder='example@email.com' required />
          <FieldDescription>
            We&apos;ll use this to contact you. We won&apos;t share your email with anyone else.
          </FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor='password' required>
            Password
          </FieldLabel>
          <Input id='password' type='password' required />
          <FieldDescription>Must be at least 8 characters long.</FieldDescription>
        </Field>
        <Field>
          <FieldLabel htmlFor='confirm-password' required>
            Confirm Password
          </FieldLabel>
          <Input id='confirm-password' type='password' required />
          <FieldDescription>Please confirm your password.</FieldDescription>
        </Field>
        <Field>
          <Button type='submit'>Create Account</Button>
        </Field>
        <FieldDescription className='px-6 text-center'>
          Already have an account? <a href='/auth/login'>Log In</a>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
