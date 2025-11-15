"use client";

import React from "react";
import {
  Menu,
  Bell,
  User,
  BarChart3,
  PlaySquare,
  Upload,
  QrCode,
  CalendarDays,
  Home as HomeIcon,
  MapPin,
  Clock, // หรือ UserCircleIcon ถ้าต้องการ
} from "lucide-react";
import Navigation from "../../components/navigation";
// --- Helper Components (ส่วนประกอบย่อย) ---

// การ์ดสำหรับฟีเจอร์
const FeatureCard = ({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) => (
  <div className="flex flex-col items-center justify-center gap-2 p-4 bg-white rounded-2xl shadow-md border border-gray-100">
    <div className="w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center">
      <Icon className="w-6 h-6 text-gray-500" />
    </div>
    <span className="text-xs font-medium text-gray-500">{label}</span>
  </div>
);

const ActivityCard = ({ title, time }: { title: string; time: string }) => (

<div className="w-full px-2.5 py-1.5 bg-sky-50 rounded-md border border-sky-200 flex justify-between items-center">
<span className="text-slate-500 text-xs font-normal tracking-tight">
{title}
</span>
<span className="text-slate-500 text-xs font-normal tracking-tight">
{time}
</span>
</div>
);

// Placeholder สำหรับ Bar Chart
const BarChartPlaceholder = () => {
  const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"];
  const barHeights = ["h-24", "h-14", "h-28", "h-16", "h-28", "h-7", "h-4"]; // ความสูงของแท่งกราฟ (จำลอง)

  return (
    <div className="h-44 w-full flex flex-col justify-between relative">
      {/* เส้นกริดพื้นหลัง */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between py-5">
        <div className="h-px bg-zinc-200 w-full"></div>
        <div className="h-px bg-zinc-200 w-full"></div>
        <div className="h-px bg-zinc-200 w-full"></div>
        <div className="h-px bg-zinc-200 w-full"></div>
      </div>

      {/* แท่งกราฟและป้ายกำกับ */}
      <div className="flex justify-around items-end h-full px-2 relative z-10">
        {days.map((day, index) => (
          <div key={day} className="flex flex-col items-center gap-2.5 w-9">
            {/* แท่งกราฟ (จำลอง) */}
            <div
              className={`w-3 bg-purple-200 rounded-t-full ${barHeights[index]}`}
            ></div>
            <span className="opacity-50 text-center text-slate-400 text-xs font-normal leading-3 tracking-wide">
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Page Component (หน้าหลัก) ---

export default function HomePage() {
    const mockActivities = [
        { id: 1, title: "นัดตรวจสุขภาพประจำปี", time: "12.00 - 14.00 น." },
        { id: 2, title: "ฉีดวัคซีนรวม", time: "15:00 น." },
        { id: 3, title: "อาบน้ำตัดขน", time: "พรุ่งนี้ 10:00 น." },
        { id: 4, title: "พาวิ่งเล่น", time: "พรุ่งนี้ 17:00 น." },
    ];
  return (
    // Container หลักของหน้าจอ (จำลองหน้าจอมือถือ)
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* 1. Top Navigation */}
      <header className="flex justify-between items-center p-4 pt-5 z-20">
        <button className="p-2">
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
        <div className="flex items-center gap-4">
          <button className="p-2">
            <Bell className="w-6 h-6 text-gray-700" />
          </button>
          <button className="p-2">
            <User className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* 2. Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto px-4 py-3.5 space-y-6 pb-24">
        {/* Profile Placeholder */}
        <div className="flex flex-col items-center gap-2.5 mt-2">
          <div className="w-28 h-28 bg-gray-300 rounded-full shadow-md"></div>
          <div className="text-center text-slate-500 text-2xl font-semibold">
            คุณยังไม่มีสุนัข
          </div>
        </div>

        {/* Weekly Expenses Section */}
        <section>
          <div className="flex justify-between items-center mb-1 px-1">
            <span className="text-black text-xs font-medium">
              ค่าใช้จ่ายประจำสัปดาห์
            </span>
            <span className="text-slate-400 text-xs font-medium cursor-pointer">
              ดูทั้งหมด &gt;
            </span>
          </div>
          <div className="p-3 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
            <BarChartPlaceholder />
          </div>
        </section>

        {/* Features Section */}
        <section>
          <span className="text-black text-xs font-medium">ฟีเจอร์</span>
          <div className="grid grid-cols-3 gap-4 mt-1">
            <FeatureCard icon={BarChart3} label="สรุป" />
            <FeatureCard icon={PlaySquare} label="ออกกำลังกาย" />
            <FeatureCard icon={Upload} label="ส่งออก" />
          </div>
        </section>

        {/* Weekly Activity Section */}
        <section>
            <span className="text-black text-xs font-medium">
             กิจกรรมประจำสัปดาห์
            </span>
            {/* Container นี้จะ scroll ได้ถ้าเนื้อหาล้น */}
            <div className="mt-1 h-44 p-2.5 bg-white rounded-xl border-2 border-purple-200 shadow-sm overflow-y-auto">
                {mockActivities.length > 0 ? (
              // ถ้ามีข้อมูล: แสดงรายการ โดยใช้ flex-col (เรียงบนลงล่าง) และ gap-2
                <div className="flex flex-col gap-2">
                    {mockActivities.map((activity) => (
                    <ActivityCard
                        key={activity.id}
                        title={activity.title}
                        time={activity.time}
                    />
                    ))}
                </div>
                ) : (
                // ถ้าไม่มีข้อมูล: แสดง Placeholder
                <div className="w-full h-full rounded-lg flex items-center justify-center text-gray-400">
                    ไม่มีกิจกรรมในสัปดาห์นี้
                </div>
                )}
            </div>
            </section>
      </main>

      {/* 3. Bottom Navigation Bar */}
        <footer className="fixed bottom-6 left-0 right-0 w-full max-w-md mx-auto z-30 flex justify-center">
            <Navigation />
        </footer>
    </div>
  );
}