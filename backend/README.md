# Backend (Next.js + Prisma + Docker)

บริการ API สำหรับ frontend ใช้ (Next.js 16 + React 19), ต่อฐานข้อมูล Postgres ด้วย Prisma และรองรับการรันผ่าน Docker Compose

## Endpoints ที่ให้มาเริ่มต้น
- `GET /api/health` — ตรวจสอบสถานะเซิร์ฟเวอร์
- `GET /api/users` — อ่านรายชื่อผู้ใช้ทั้งหมด
- `POST /api/users` — สร้างผู้ใช้ใหม่ จาก body `{ email: string, name?: string }`

## โครงสร้าง
```
backend/
  app/
    api/
      health/route.ts
      users/route.ts
  lib/prisma.ts
  prisma/schema.prisma
  next.config.ts
  tsconfig.json
  package.json
  Dockerfile
```

## วิธีเริ่มต้นใช้งานแบบ Local (ไม่ใช้ Docker)
1) ติดตั้ง dependencies
```bash
npm install
```
2) สร้างไฟล์ `.env` จากตัวอย่าง
```bash
cp .env.example .env
```
3) เตรียมฐานข้อมูล (แนะนำรัน Postgres ผ่าน Docker ดูหัวข้อด้านล่าง) แล้วรัน migrate
```bash
npm run prisma:migrate -- --name init
```
4) รันโหมดพัฒนา
```bash
npm run dev
```
API จะอยู่ที่ `http://localhost:3001`

## รันด้วย Docker Compose (แนะนำ)
จากโฟลเดอร์รากของโปรเจกต์
```bash
docker compose up --build
```
- Postgres: `localhost:5432` (user: postgres / pass: postgres / db: regdog)
- Backend API: `http://localhost:3001`

ครั้งแรกแนะนำให้เข้า container backend แล้วรัน migrate เพื่อสร้างตาราง:
```bash
docker compose exec backend sh -lc "npm run prisma:migrate -- --name init"
```

## การเชื่อมต่อจาก Frontend
ตั้งค่า base URL ของ API เป็น `http://localhost:3001`

## หมายเหตุ
- Prisma Client จะถูก generate อัตโนมัติหลัง `npm install` (ผ่านสคริปต์ `postinstall`)
- ใน dev เราใช้ global prisma client ป้องกัน multiple instances ตอน hot-reload
