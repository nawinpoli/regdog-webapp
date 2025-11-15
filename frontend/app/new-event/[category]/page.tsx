// -------------------------------------------------------------
// ไฟล์: app/(main)/new-event/[category]/page.tsx (อัปเดตแล้ว)
// -------------------------------------------------------------
'use client';

// 1. Import 'useState'
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeftIcon,
  SunIcon,
  PlayCircleIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  ShieldCheckIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  ScaleIcon,
  CurrencyDollarIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';

// ... (const categoryConfig: ... ไม่ต้องแก้ไข) ...
// 1. สร้าง Config เพื่อกำหนดว่าแต่ละ category มีอะไรบ้าง
const categoryConfig: Record<string, any> = {
  // กิจกรรม
  walk: {
    groupTitle: 'เพิ่มกิจกรรมใหม่',
    title: 'เดิน',
    icon: <SunIcon className="w-12 h-12" />,
    fields: ['duration', 'distance'],
  },
  play: {
    groupTitle: 'เพิ่มกิจกรรมใหม่',
    title: 'เวลาเล่น',
    icon: <PlayCircleIcon className="w-12 h-12" />,
    fields: ['duration'],
  },
  train: {
    groupTitle: 'เพิ่มกิจกรรมใหม่',
    title: 'ฝึก',
    icon: <AcademicCapIcon className="w-12 h-12" />,
    fields: ['duration'],
  },
  // สุขภาพ
  symptom: {
    groupTitle: 'เพิ่มข้อมูลสุขภาพ',
    title: 'อาการ',
    icon: <ClipboardDocumentListIcon className="w-12 h-12" />,
    fields: ['reminder'],
  },
  vaccine: {
    groupTitle: 'เพิ่มข้อมูลสุขภาพ',
    title: 'วัคซีน',
    icon: <ShieldCheckIcon className="w-12 h-12" />,
    fields: ['reminder'],
  },
  medicine: {
    groupTitle: 'เพิ่มข้อมูลสุขภาพ',
    title: 'ยา',
    icon: <BeakerIcon className="w-12 h-12" />,
    fields: ['dosage'],
  },
  vet: {
    groupTitle: 'เพิ่มข้อมูลสุขภาพ',
    title: 'พบสัตว์แพทย์',
    icon: <BuildingStorefrontIcon className="w-12 h-12" />,
    fields: ['reminder'],
  },
  weight: {
    groupTitle: 'เพิ่มข้อมูลสุขภาพ',
    title: 'น้ำหนัก',
    icon: <ScaleIcon className="w-12 h-12" />,
    fields: ['weight'],
  },
  // ค่าใช้จ่าย
  expense: {
    groupTitle: 'เพิ่มค่าใช้จ่าย',
    title: 'ค่าใช้จ่าย',
    icon: <CurrencyDollarIcon className="w-12 h-12" />,
    fields: ['amount'],
  },
};

// --- คอมโพเนนต์หลักของหน้าฟอร์ม ---
const DynamicEventFormPage = () => {
  const params = useParams();
  const categorySlug = params.category as string;
  const config = categoryConfig[categorySlug];

  // 2. สร้าง "สมอง" (State) สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    name: 'เดินเล่นหลังเลิกงาน',
    date: '23 พฤศจิกายน พ.ศ.2567', // (ในตัวอย่างนี้ ช่องวันที่ยังเป็น text)
    time: '12:01',
    duration_hr: 2,
    duration_min: 59,
    distance: 2.5,
    weight: 2.5,
    dosageAmount: 50,
    dosageUnit: 'mg',
    amount: 200,
    reminder: 'everyday',
    note: 'มีความสุขมากเลย',
  });

  // 3. สร้าง "ตัวจัดการ" การเปลี่ยนแปลง
  // ฟังก์ชันนี้จะอัปเดต state ทุกครั้งที่เราพิมพ์หรือเลือก
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!config) {
    // ... (ส่วนนี้เหมือนเดิม) ...
    return (
      <div className="text-center p-10">
        <p>ไม่พบประเภทการบันทึกที่เลือก</p>
        <Link href="/new-event" className="text-blue-600">
          กลับไปหน้าเลือกประเภท
        </Link>
      </div>
    );
  }

  // 4. อัปเดตฟังก์ชัน renderDynamicFields ให้ใช้ State
  const renderDynamicFields = () => {
    
    // Helper เล็กๆ สำหรับสร้าง <option> ของตัวเลข
    const numberOptions = (max: number) => {
      return Array.from(Array(max).keys()).map(n => (
        <option key={n} value={n}>{n}</option>
      ));
    };

    // (สไตล์ CSS สำหรับ input/select ที่จะใช้ซ้ำ)
    const inputStyle = "text-right text-sm border-none focus:ring-0 p-0 w-24 bg-transparent";
    const selectStyle = "text-right text-sm border-none focus:ring-0 p-0 bg-transparent pr-8";


    return (
      <>
        {/* ช่อง 'ระยะเวลา' (เปลี่ยนเป็น <select> 2 อัน) */}
        {config.fields.includes('duration') && (
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-700">ระยะเวลา:</span>
            <div className="flex items-center gap-2">
              <select
                name="duration_hr"
                value={formData.duration_hr}
                onChange={handleChange}
                className={selectStyle}
              >
                {numberOptions(24)}
              </select>
              <span className="text-sm">ชม.</span>
              <select
                name="duration_min"
                value={formData.duration_min}
                onChange={handleChange}
                className={selectStyle}
              >
                {numberOptions(60)}
              </select>
              <span className="text-sm">นาที</span>
            </div>
          </div>
        )}

        {/* ช่อง 'ระยะทาง' (เปลี่ยนเป็น <input type="number">) */}
        {config.fields.includes('distance') && (
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-700">ระยะทาง:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="distance"
                value={formData.distance}
                onChange={handleChange}
                className={inputStyle}
                step="0.1"
              />
              <span className="text-sm text-gray-900">กม.</span>
            </div>
          </div>
        )}

        {/* ช่อง 'น้ำหนัก' (เปลี่ยนเป็น <input type="number">) */}
        {config.fields.includes('weight') && (
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-700">น้ำหนัก:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className={inputStyle}
                step="0.1"
              />
              {/* ผมแก้ "บาท" เป็น "กก." ให้ตามรูป "น้ำหนัก" นะครับ */}
              <span className="text-sm text-gray-900">กก.</span>
            </div>
          </div>
        )}

        {/* ช่อง 'ปริมาณยา' (เปลี่ยนเป็น <input> และ <select>) */}
        {config.fields.includes('dosage') && (
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-700">ปริมาณยา:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="dosageAmount"
                value={formData.dosageAmount}
                onChange={handleChange}
                className={inputStyle}
              />
              <select
                name="dosageUnit"
                value={formData.dosageUnit}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="mg">mg</option>
                <option value="ml">ml</option>
                <option value="เม็ด">เม็ด</option>
              </select>
            </div>
          </div>
        )}

        {/* ช่อง 'จำนวน' (เปลี่ยนเป็น <input> ที่ควบคุมโดย state) */}
        {config.fields.includes('amount') && (
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-sm text-gray-700">จำนวน:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className={inputStyle}
              />
              <span className="text-sm text-gray-900">บาท</span>
            </div>
          </div>
        )}

        {/* ช่อง 'แจ้งเตือน' (เปลี่ยนเป็น <select>) */}
        {config.fields.includes('reminder') && (
          <>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">แจ้งเตือน:</span>
              <select
                name="reminder"
                value={formData.reminder}
                onChange={handleChange}
                className={selectStyle}
              >
                <option value="everyday">ทุกวัน</option>
                <option value="once">ครั้งเดียว</option>
                <option value="no">ไม่แจ้งเตือน</option>
              </select>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-700">วันที่สิ้นสุดการแจ้งเตือน:</span>
              <span className="text-sm text-gray-900">25 พฤศจิกายน พ.ศ.2567</span>
            </div>
          </>
        )}
      </>
    );
  };

  // 5. Render หน้า (อัปเดตช่อง Common Fields)
  return (
    <div className="w-full max-w-md mx-auto h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      {/* Header (ปุ่ม Back และ Title) */}
      <div className="flex items-center justify-center relative mb-4">
        <Link href="/new-event" className="absolute left-0 text-gray-700 p-2">
          <ChevronLeftIcon className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-medium text-gray-800">
          {config.groupTitle}
        </h1>
      </div>

      {/* ไอคอนและชื่อ (เหมือนเดิม) */}
      <div className="flex flex-col items-center gap-2 mb-6">
        <div className="w-24 h-24 bg-blue-100/60 rounded-full flex justify-center items-center text-blue-600">
          {config.icon}
        </div>
        <span className="text-2xl font-semibold text-gray-800">
          {config.title}
        </span>
      </div>

      {/* กล่องฟอร์ม */}
      <div className="w-full bg-white rounded-2xl shadow-lg p-6 space-y-2">
        <h2 className="text-base font-semibold text-gray-800 mb-2">
          {config.groupTitle === 'เพิ่มค่าใช้จ่าย' ? 'ข้อมูลค่าใช้จ่าย' : 'ข้อมูลสุขภาพ'}
        </h2>
        
        {/* === ช่องฟอร์ม (Common) - อัปเดตแล้ว === */}
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-sm text-gray-700">ชื่อ:</span>
          <input
            type="text"
            name="name" // <-- เพิ่ม name
            value={formData.name} // <-- เปลี่ยน defaultValue เป็น value
            onChange={handleChange} // <-- เพิ่ม onChange
            className="text-right text-sm border-none focus:ring-0 p-0 placeholder-gray-400"
            placeholder="เพิ่มชื่อ..."
          />
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-sm text-gray-700">วัน:</span>
          {/* (ในอนาคต ช่องนี้ควรเป็น Date Picker) */}
          <span className="text-sm text-gray-900">{formData.date}</span>
        </div>
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-sm text-gray-700">เวลา:</span>
          {/* ใช้ <input type="time"> จะดีกว่าปุ่ม dropdown มาก */}
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="text-right text-sm border-none focus:ring-0 p-0 bg-transparent"
          />
        </div>

        {/* === ช่องฟอร์ม (Dynamic) === */}
        {renderDynamicFields()}

        {/* === ช่องฟอร์ม (Common) - อัปเดตแล้ว === */}
        <div className="flex justify-between items-center py-3 border-b border-gray-100">
          <span className="text-sm text-gray-700">โน้ต:</span>
          <input
            type="text"
            name="note" // <-- เพิ่ม name
            value={formData.note} // <-- เปลี่ยน defaultValue เป็น value
            onChange={handleChange} // <-- เพิ่ม onChange
            className="text-right text-sm border-none focus:ring-0 p-0 placeholder-gray-400"
            placeholder="เพิ่มโน้ต..."
          />
        </div>
        <div className="flex justify-between items-center py-3">
          {/* ... (ส่วนอัปโหลดรูป ยังไม่เปลี่ยนแปลง) ... */}
          <span className="text-sm text-gray-700">รูป:</span>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">1...4 (รูป) อัปโหลด</span>
            <button className="flex items-center gap-1 text-sm text-blue-600">
              อัปโหลดไฟล์ <ArrowUpTrayIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ปุ่มบันทึก */}
      <div className="mt-6 flex justify-end">
        <button className="flex items-center gap-2 bg-amber-300 hover:bg-amber-400 text-gray-800 font-medium py-3 px-6 rounded-full shadow-lg">
          บันทึก <CheckIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default DynamicEventFormPage;