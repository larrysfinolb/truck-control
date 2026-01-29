"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/modules/shared/components/UI/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/modules/shared/components/UI/field";
import { Input } from "@/modules/shared/components/UI/input";
import { useLogin } from "../../hooks/useLogin";
import { useForm } from "@tanstack/react-form";
import { loginSchema } from "../../schemas/login";
import { UnauthorizedAlert } from "../Alerts/UnauthorizedAlert";
import { useApiError } from "@/modules/shared/hooks/useApiError";

export function LoginForm() {
  const login = useLogin();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      await login.mutateAsync(value);
    },
  });

  const errorDisplay = useApiError(login.error);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.handleSubmit();
  };

  return (
    <form className={cn("flex flex-col gap-6")}>
      <FieldGroup>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h1 className='text-2xl font-bold'>Login to Your Account</h1>
          <p className='text-muted-foreground text-sm text-balance'>
            Enter your email address and password to continue.
          </p>
        </div>

        <form.Field name='email'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name} required>
                  Email
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <form.Field name='password'>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className='flex items-center'>
                  <FieldLabel htmlFor='password' required>
                    Password
                  </FieldLabel>
                  <a href='#' className='ml-auto text-sm underline-offset-4 hover:underline'>
                    Forgot your password?
                  </a>
                </div>
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
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        </form.Field>

        <Field>
          <Button onClick={handleSubmit}>Login</Button>
        </Field>
        <FieldDescription className='px-6 text-center'>
          Don&apos;t have an account? <a href='/auth/signup'>Sign up</a>
        </FieldDescription>

        {login.isError && errorDisplay && (
          <UnauthorizedAlert title={errorDisplay.title} description={errorDisplay.message} />
        )}
      </FieldGroup>
    </form>
  );
}
