# Hệ thống Đăng ký Người dùng

Dự án monorepo gồm **NestJS** (server) và **React + Vite** (client) triển khai hệ thống đăng ký tài khoản với MongoDB.

## Tính năng chính
- API `POST /user/register` kiểm tra trùng email, mã hóa mật khẩu bằng bcrypt và trả thông báo rõ ràng.
- Frontend sử dụng React Query để gửi yêu cầu đăng ký và hiển thị phản hồi thành công/thất bại.
- Form đăng ký và đăng nhập dùng React Hook Form kết hợp Zod để kiểm tra dữ liệu.
- Giao diện với Tailwind CSS và bộ component tùy biến theo shadcn/ui.

## Công nghệ sử dụng
- **Backend:** NestJS, Mongoose, bcrypt.
- **Frontend:** React (Vite + TypeScript), React Router, React Query, React Hook Form, Zod, Tailwind CSS.
- **Cơ sở dữ liệu:** MongoDB.

## Chuẩn bị môi trường
1. Cài đặt Node.js (>= 18).

## Cấu trúc thư mục
```
user_registration_api/
├── server/   # NestJS API
└── client/   # Ứng dụng React
```

## Biến môi trường
```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```
- `server/.env`:
  - `MONGODB_URI`: chuỗi kết nối MongoDB.
  - `PORT`: cổng server (mặc định 3000).
  - `FRONTEND_URL`: nguồn cho phép CORS.
- `client/.env`:
  - `VITE_API_URL`: URL backend (mặc định http://localhost:3000).
  - `VITE_API_PROXY`: đặt `true` nếu muốn dùng proxy của Vite khi phát triển.

## Cài đặt phụ thuộc
Từ thư mục gốc `user_registration_api` chạy:
```bash
npm install --workspaces
```
Lệnh trên cài đặt dependency cho cả `client` và `server`.

## Chạy dự án ở chế độ phát triển
Mở hai terminal hoặc dùng trình quản lý tiến trình yêu thích.

### Server (NestJS)
```bash
npm --workspace server run start:dev
```
API sẽ chạy ở `http://localhost:3000`.

### Client (React)
```bash
npm --workspace client run dev
```
Frontend sẽ chạy ở `http://localhost:5173`.

## Build sản phẩm
```bash
npm run build
```
Lệnh này build frontend và backend (folder `client/dist` và `server/dist`).

## Kiểm thử API nhanh
Sau khi server chạy, có thể dùng `curl` trong cmd:
```bash
curl -X POST http://localhost:3000/user/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"demo@example.com\",\"password\":\"123456\"}"
```
Nếu thành công sẽ trả về JSON với thông báo và dữ liệu người dùng.
