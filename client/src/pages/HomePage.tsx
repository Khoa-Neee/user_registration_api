import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

function HomePage() {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">Quản lý người dùng dễ dàng</h1>
        <p className="text-lg text-muted-foreground">
          Hệ thống cho phép bạn đăng ký tài khoản mới với bảo mật cao và đăng nhập nhanh chóng.
        </p>
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <Link to="/register">Bắt đầu đăng ký</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/login">Đã có tài khoản? Đăng nhập</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Bảo mật</CardTitle>
            <CardDescription>Mật khẩu được mã hóa trước khi lưu trữ</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Chúng tôi sử dụng công nghệ băm mật khẩu với bcrypt để bảo vệ dữ liệu người dùng.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trải nghiệm mượt mà</CardTitle>
            <CardDescription>Giao diện hiện đại với shadcn/ui và Tailwind CSS</CardDescription>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Ứng dụng frontend sử dụng React Query để tương tác API và xử lý trạng thái tức thời.
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
