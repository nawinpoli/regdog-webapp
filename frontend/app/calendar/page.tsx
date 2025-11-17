// -------------------------------------------------------------
// ไฟล์: app/calendar/page.tsx (อัปเดตแล้ว)
// -------------------------------------------------------------
'use client';

import React, { useState } from 'react';
import Navigation from '../../components/navigation';
import Link from 'next/link';
import {
  Bars3Icon,
  BellIcon,
  UserIcon,
  QrCodeIcon,
  CalendarDaysIcon as CalendarIcon, // เปลี่ยนชื่อเล็กน้อย
  HomeIcon,
  MapPinIcon,
  ClockIcon,
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  BellAlertIcon,
  UsersIcon, // <--- เพิ่มไอคอนสำหรับนัดหมายใหม่
} from '@heroicons/react/24/outline';

// -------------------------------------------------------------
// 1. Mock Data (ข้อมูลนัดหมายจำลอง)
// -------------------------------------------------------------
// เราจะเก็บนัดหมายทั้งหมดไว้ที่นี่ โดยใช้ 'YYYY-MM-DD' เป็น key
// (เดือนใน key นี้จะตรงกับความเป็นจริง เช่น 04 = เมษายน)

type Event = {
  id: number;
  title: string;
  time: string;
  icon: React.ReactNode; // เก็บเป็น Component
  alert?: boolean;
};

const mockEvents: Record<string, Event[]> = {
  '2025-04-17': [ // เมษายน (เดือน 3 ใน JS)
    {
      id: 1,
      title: 'นัดตรวจสุขภาพประจำปี',
      time: '12.00 - 14.00 น.',
      icon: <ClipboardDocumentListIcon className="w-5 h-5" />,
    },
    {
      id: 2,
      title: 'มีอาการไข้',
      time: '15.00 น.',
      icon: <PencilSquareIcon className="w-5 h-5" />,
      alert: true,
    },
  ],
  '2025-04-21': [ // เมษายน
    {
      id: 3,
      title: 'ประชุมทีม RegDog',
      time: '10.00 - 11.00 น.',
      icon: <UsersIcon className="w-5 h-5" />,
    },
  ],
  '2025-05-01': [ // พฤษภาคม (เดือน 4 ใน JS)
    {
      id: 4,
      title: 'วันแรงงาน',
      time: 'ทั้งวัน',
      icon: <CalendarIcon className="w-5 h-5" />,
    },
  ],
};

// Helper เล็กๆ เพื่อแปลง Date object เป็น key 'YYYY-MM-DD'
// Helper เล็กๆ เพื่อแปลง Date object เป็น key 'YYYY-MM-DD' (แบบไม่สน Timezone)
const getISODateString = (date: Date): string => {
  const year = date.getFullYear();
  // getMonth() เริ่มที่ 0 (ม.ค. = 0) เลย +1
  // padStart(2, '0') คือการเติม 0 ข้างหน้าถ้ามีเลขตัวเดียว (เช่น 4 -> "04")
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

// --- นี่คือคอมโพเนนต์ทั้งหน้าของคุณ ---
const CalendarPage = () => {
  // -------------------------------------------------------------
  // ส่วน Logic ของปฏิทิน
  // -------------------------------------------------------------
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 3, 17)); // 17 เม.ย. 2025

  const handlePrevMonth = () => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(1); // ไปวันที่ 1 ก่อน เพื่อกันข้อผิดพลาดวันข้ามเดือน
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setSelectedDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(1);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  // -------------------------------------------------------------
  // 2. ฟังก์ชันใหม่สำหรับ "คลิก" วันที่
  // -------------------------------------------------------------
  const handleDateClick = (day: number) => {
    // สร้าง Date object ใหม่จาก ปี, เดือน ปัจจุบัน และ "วันที่" ที่คลิก
    const newDate = new Date(currentYear, currentMonth, day);
    // อัปเดต state
    setSelectedDate(newDate);
  };

  // ข้อมูลและฟังก์ชันสำหรับ Render
  const thaiWeekdays = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
  const thaiLocale = 'th-TH';

  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();
  const selectedDay = selectedDate.getDate(); // <--- นี่คือตัวแปรที่ทำให้ไฮไลท์เคลื่อนที่

  // (ส่วนคำนวณวันเหมือนเดิม)
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const prevMonthDays = [];
  const daysFromPrevMonth = (firstDayOfMonth + 6) % 7;
  for (let i = 0; i < daysFromPrevMonth; i++) {
    prevMonthDays.push(daysInPrevMonth - daysFromPrevMonth + i + 1);
  }

  const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalCells = 42;
  const nextMonthDaysCount = totalCells - (daysFromPrevMonth + daysInMonth);
  const nextMonthDays = Array.from({ length: nextMonthDaysCount }, (_, i) => i + 1);

  // -------------------------------------------------------------
  // 3. Logic การกรอง (ดึงนัดของวันที่เลือก)
  // -------------------------------------------------------------
  const selectedDateKey = getISODateString(selectedDate); // '2025-04-17'
  const eventsForSelectedDay = mockEvents[selectedDateKey] || []; // ดึงนัด ถ้าไม่มี คืนค่า []

  // -------------------------------------------------------------
  // ส่วน JSX (โครงสร้างหน้าทั้งหมด)
  // -------------------------------------------------------------
  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* ... (ส่วน Background และ Header เหมือนเดิม) ... */}
      <div
        className="absolute top-0 left-0 w-72 h-72 bg-pink-100 rounded-full opacity-50 -translate-x-1/3 -translate-y-1/3 blur-3xl"
        style={{ zIndex: 0 }}
      ></div>
      <div
        className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100 rounded-full opacity-50 translate-x-1/3 translate-y-1/3 blur-3xl"
        style={{ zIndex: 0 }}
      ></div>

      <header className="relative w-full flex justify-between items-center p-4 pt-14 z-10">
        <button className="text-gray-700">
          <Bars3Icon className="w-7 h-7" />
        </button>
        <div className="flex items-center gap-4">
          <button className="text-gray-700">
            <BellIcon className="w-7 h-7" />
          </button>
          <button className="text-gray-700">
            <UserIcon className="w-7 h-7" />
          </button>
        </div>
      </header>

      {/* ส่วนเนื้อหาหลัก */}
      <main className="relative z-10 p-4">
        <div className="w-full bg-white rounded-2xl shadow-lg p-4">
          {/* Header: ส่วนเลือกเดือน (เหมือนเดิม) */}
          <div className="flex justify-between items-center mb-4 px-2">
            <button
              onClick={handlePrevMonth}
              className="text-gray-600 hover:text-gray-800 p-2"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-4">
              <span className="text-base font-medium text-gray-700">
                {selectedDate.toLocaleDateString(thaiLocale, { month: 'long' })}
              </span>
              <span className="text-base font-medium text-gray-700">
                {selectedDate.toLocaleDateString(thaiLocale, { year: 'numeric' })}
              </span>
            </div>
            <button
              onClick={handleNextMonth}
              className="text-gray-600 hover:text-gray-800 p-2"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Grid: ตารางปฏิทิน */}
          <div className="grid grid-cols-7 gap-1 place-items-center">
            {/* หัวข้อวัน (อา-ส) */}
            {thaiWeekdays.map((day) => (
              <div
                key={day}
                className="text-center text-sm font-medium text-gray-700 w-10 h-10 flex justify-center items-center"
              >
                {day}
              </div>
            ))}

            {/* วันที่จากเดือนก่อน */}
            {prevMonthDays.map((day) => (
              <div
                key={`prev-${day}`}
                className="text-center text-sm text-gray-300 w-10 h-10 flex justify-center items-center rounded-full"
              >
                {day}
              </div>
            ))}

            {/* วันที่ในเดือนนี้ (***ส่วนที่อัปเดต***) */}
            {currentMonthDays.map((day) => {
              // isSelected จะเป็น true เฉพาะวันที่ตรงกับใน state
              const isSelected = day === selectedDay;
              return (
                <div
                  key={day}
                  // --- เพิ่ม onClick ที่นี่ ---
                  onClick={() => handleDateClick(day)}
                  // ---------------------------
                  className={`text-center text-sm w-10 h-10 flex justify-center items-center rounded-full cursor-pointer transition-colors
                    ${
                      isSelected
                        ? 'bg-rose-200 text-white font-bold' // ไฮไลท์
                        : 'text-gray-800 hover:bg-gray-100' // ปกติ
                    }
                  `}
                >
                  {day}
                </div>
              );
            })}

            {/* วันที่จากเดือนหน้า */}
            {nextMonthDays.map((day) => (
              <div
                key={`next-${day}`}
                className="text-center text-sm text-gray-300 w-10 h-10 flex justify-center items-center rounded-full"
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* 4. ส่วนรายการนัดหมาย (***ส่วนที่อัปเดต***) */}
        {/* เราจะ .map จาก eventsForSelectedDay แทนการ hardcode */}
        <div className="mt-6 space-y-3">
          {eventsForSelectedDay.length > 0 ? (
            // ถ้ามีนัดหมาย
            eventsForSelectedDay.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3 h-14"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex justify-center items-center text-blue-600">
                    {event.icon} {/* แสดงไอคอนจาก data */}
                  </div>
                  <span className="text-sm text-gray-700">{event.title}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{event.time}</span>
                  {/* ถ้ามี alert: true ให้แสดงกระดิ่ง */}
                  {event.alert && <BellAlertIcon className="w-5 h-5 text-gray-600" />}
                </div>
                
              </div>
            ))
          ) : (
            // ถ้าไม่มีนัดหมาย
            <div className="text-center text-gray-500 pt-4">
              ไม่มีนัดหมายสำหรับวันนี้
            </div>
          )}
        </div>
      </main>

      {/* ... (ส่วนปุ่มบวก และ Bottom Nav เหมือนเดิม) ... */}
        <Link href="/new-event" className="absolute bottom-28 right-6 w-14 h-14 bg-amber-300 hover:bg-amber-400 rounded-2xl shadow-lg flex justify-center items-center text-gray-800 z-20">
            <PlusIcon className="w-8 h-8" />
        </Link>

        <footer className="fixed bottom-6 left-0 right-0 w-full max-w-md mx-auto z-30 flex justify-center">
            <Navigation />
        </footer>
    </div>
  );
};

export default CalendarPage;