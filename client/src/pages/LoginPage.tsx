import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Alert } from '../components/ui/alert';
import { Link } from 'react-router-dom';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu tối thiểu 6 ký tự' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setStatus('loading');
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus('success');
    form.reset({ email: values.email, password: '' });
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-semibold">Đăng nhập</CardTitle>
          <CardDescription>Nhập thông tin để truy cập hệ thống</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {status === 'success' && <Alert variant="success">Đăng nhập thành công! Chào mừng trở lại.</Alert>}
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="login-email">Email</Label>
              <Input id="login-email" type="email" placeholder="you@example.com" {...form.register('email')} />
              {form.formState.errors.email?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Mật khẩu</Label>
              <Input id="login-password" type="password" placeholder="••••••" {...form.register('password')} />
              {form.formState.errors.password?.message && (
                <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={status === 'loading'}>
              {status === 'loading' ? 'Đang kiểm tra...' : 'Đăng nhập'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <span>Chưa có tài khoản?</span>
          <Link to="/register" className="text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default LoginPage;
