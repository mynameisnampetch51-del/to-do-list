# To-Do App

โปรเจกต์แรกในพอร์ต — To-Do App แบบ CRUD เขียนด้วย vanilla JavaScript ล้วน ไม่มี framework

**Demo:** https://mynameisnampetch51-del.github.io/to-do/

## ทำอะไรได้บ้าง

- **Create** — เพิ่มงานผ่านปุ่มหรือกด Enter
- **Read** — แสดงรายการทั้งหมด อัปเดตหน้าจอทันทีทุกครั้งที่ข้อมูลเปลี่ยน
- **Update** — คลิกที่รายการเพื่อติ๊กว่าเสร็จแล้ว (ขีดฆ่า + จางลง)
- **Delete** — คลิกปุ่มลบเพื่อเอารายการออก
- **Persist** — บันทึกลง `localStorage` อัตโนมัติ ปิด/รีเฟรชหน้าแล้วข้อมูลยังอยู่

## เทคนิคที่ใช้

- Array ของ object เป็น source of truth (`items`), `render()` วาด DOM ใหม่ทุกครั้งที่ array เปลี่ยน
- `filter()` สำหรับลบ, `map()` + spread (`{...item, done: !item.done}`) สำหรับติ๊กเสร็จ
- `localStorage.setItem` / `getItem` + `JSON.stringify` / `JSON.parse` สำหรับบันทึกข้อมูล

## รันเอง

เปิด `index.html` ในเบราว์เซอร์ได้เลย ไม่ต้องติดตั้งอะไรเพิ่ม
