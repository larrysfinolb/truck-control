"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/modules/shared/components/UI/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/modules/shared/components/UI/field";
import { Input } from "@/modules/shared/components/UI/input";
import { useSignup } from "../../hooks/useSignup";
import { useForm } from "@tanstack/react-form";
import { signupSchema } from "../../schemas/signup";
import { useApiError } from "@/modules/shared/hooks/useApiError";
import { UnauthorizedAlert } from "../Alerts/UnauthorizedAlert";

export function SignupForm() {
  const signup = useSignup();

  const form = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: signupSchema,
      onChange: signupSchema,
    },
    onSubmit: async ({ value }) => {
      const { confirmPassword: _, ...signupData } = value;
      await signup.mutateAsync(signupData);
    },
  });

  const errorDisplay = useApiError(signup.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Sign Up for an Account</h1>
          <p className='text-muted-foreground text-sm text-balance'>Fill out the form below to create your account</p>
        </div>
        <form.Field name='firstName'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  First Name
                </FieldLabel>
                <Input
                  type='text'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='Enter your first name'
                  autoComplete='off'
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name='lastName'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  Last Name
                </FieldLabel>
                <Input
                  type='text'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='Enter your last name'
                  autoComplete='off'
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name='email'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  Email address
                </FieldLabel>
                <Input
                  type='email'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='Enter your email address'
                  autoComplete='off'
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name='password'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  Password
                </FieldLabel>
                <Input
                  type='password'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='Enter your password'
                  autoComplete='off'
                />
              </Field>
            );
          }}
        </form.Field>

        <form.Field name='confirmPassword'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  Confirm Password
                </FieldLabel>
                <Input
                  type='password'
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder='Confirm your password'
                  autoComplete='off'
                />
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button onClick={handleSubmit}>Create Account</Button>
        </Field>
        <FieldDescription className='px-6 text-center'>
          Already have an account? <a href='/auth/login'>Log In</a>
        </FieldDescription>

        {signup.isError && errorDisplay && (
          <UnauthorizedAlert title={errorDisplay.title} description={errorDisplay.message} />
        )}
      </FieldGroup>
    </form>
  );
}
