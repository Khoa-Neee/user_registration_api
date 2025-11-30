import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { registerUser, type RegisterRequest, type RegisterResponse } from '../api/user';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert } from '../components/ui/alert';

const registerSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự' }),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterPage() {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<RegisterResponse, Error, RegisterRequest>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      setErrorMessage(null);
      form.reset();
    },
    onError: (error) => {
      setErrorMessage(error.message);
      setSuccessMessage(null);
    },
  });

  const onSubmit = (values: RegisterFormValues) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    mutation.mutate(values);
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-semibold tracking-tight">Đăng ký tài khoản</h2>
        <p className="text-sm text-muted-foreground">
          Nhập email và mật khẩu để tạo tài khoản mới trong hệ thống.
        </p>
      </div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="error">{errorMessage}</Alert>}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            {...form.register('email')}
          />
          {form.formState.errors.email?.message && (
            <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••"
            {...form.register('password')}
          />
          {form.formState.errors.password?.message && (
            <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={mutation.isPending}>
          {mutation.isPending ? 'Đang xử lý...' : 'Đăng ký'}
        </Button>
      </form>
    </div>
  );
}

export default RegisterPage;
