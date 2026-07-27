# Personal Book Library

ระบบจัดการคลังหนังสือส่วนตัว พร้อมระบบยืนยันตัวตน JWT Authentication และฐานข้อมูล Supabase

## 1. วิธีติดตั้ง (Installation)
1. เปิด Terminal เข้าไปที่โฟลเดอร์ `backend` แล้วรันคำสั่ง `npm install`
2. เปิด Terminal อีกหน้าต่าง เข้าไปที่โฟลเดอร์ `frontend` แล้วรันคำสั่ง `npm install`

## 2. การตั้งค่า Environment (Environment Setup)
ในโฟลเดอร์ `backend` จะมีไฟล์ `.env` ที่ใช้เก็บค่าตั้งค่า ให้แก้ไขข้อมูลด้านในดังนี้:
```
PORT=5000
JWT_SECRET=your_super_secret_jwt_key
SUPABASE_URL=https://[YOUR-PROJECT-ID].supabase.co
SUPABASE_PUBLISHABLE_KEY=[YOUR-ANON-KEY]
เพื่อให้ง่ายต่อการตรวจของกรรมการผมจะแนบไฟล์ .env ไปให้ในเมลนะครับ
```
## 3. วิธีการรันโปรเจกต์ (Run Project)
- **รัน Backend:** เปิดโฟลเดอร์ `backend` แล้วรัน `node index.js` (จะรันที่พอร์ต 5000)
- **รัน Frontend:** เปิดโฟลเดอร์ `frontend` แล้วรัน `npm run dev` (จะรันที่พอร์ต 3000)
- เข้าใช้งานได้ที่: `http://localhost:3000`

## 4. บัญชีสำหรับทดสอบ (Test Account)
- **Username:** `admin`
- **Password:** `password`

## 5. การทดสอบ API (API Testing)
ผมได้แนบไฟล์ API Collection สำหรับ **Bruno** ไว้ในโฟลเดอร์ `api-collection/` สามารถนำไป Import เพื่อใช้ทดสอบ Endpoint ต่างๆ ได้ทันที (API POST และ DELETE จำเป็นต้องใส่ Token ในแท็บ Auth แบบ Bearer Token)
