"use client";

import Navigation from "@/components/navigation";
import { Pencil } from "lucide-react";
import { useState } from "react";

type PetProfile = {
  name: string;
  gender: string;
  breed: string;
  birthDate: string; // yyyy-mm-dd
  age: string;
  microchip: string;
  vaccineFile: string;
  chronicDisease: string;
};

const initialData: PetProfile = {
  name: "Snow white",
  gender: "เพศเมีย",
  breed: "ปอมเมอเรเนียน",
  birthDate: "2025-08-17",
  age: "1 ปี 5 เดือน",
  microchip: "AB12345678CD",
  vaccineFile: "Link_File",
  chronicDisease: "เบาหวาน, ความดัน",
};

export default function PetProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState<PetProfile>(initialData);

const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
) => {
  const { name, type } = e.target;

  // case: file input
  if (type === "file") {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0] || null;

    setData((prev) => ({
      ...prev,
      [name]: file, // เก็บเป็น File object
    }));

    return;
  }

  // case: text / textarea
  setData((prev) => ({
    ...prev,
    [name]: e.target.value,
  }));
};


  const handleCancel = () => {
    setData(initialData);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API บันทึกข้อมูล
    setIsEditing(false);
    console.log("save", data);
  };

  return (
    <div className="mobile flex flex-col items-center px-4">
      <div className="flex flex-col items-center w-full rounded-[15px] px-2.5 py-2.5 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
        {/* avatar */}
        <div className="relative w-fit">
          <img
            src="https://images.pexels.com/photos/792381/pexels-photo-792381.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt="Snow white"
            className="h-28 w-28 rounded-full object-cover"
          />
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="absolute bottom-0 right-1 h-8 w-8 rounded-full bg-white border-2 border-73a2ac flex items-center justify-center hover:bg-[#ffe7a3] transition-colors"
          >
            <Pencil className="h-4 w-4 text-73a2ac" />
          </button>
        </div>

        {/* content */}
        <div className="w-full">
          <h1 className="text-center text-2xl font-semibold text-73a2ac">
            Snow white
          </h1>

          <div className="mt-6 rounded-2xl border border-[#cde4f2] px-4 py-4">
            {!isEditing ? (
              <ProfileView data={data} />
            ) : (
              <ProfileForm
                data={data}
                onChange={handleChange}
                onCancel={handleCancel}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}

/* ---------- View mode ---------- */

function ProfileView({ data }: { data: PetProfile }) {
  const row = (label: string, value: string) => (
    <div className="flex gap-2.5 text-sm text-slate-700 border-b border-[#D9D9D9] font-anuphan text-[16px]">
      <span className="text-73a2ac">{label} :</span>
      <span className="text-black">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col gap-[15px]">
      <p className="text-center text-[16px] text-black font-anuphan">ข้อมูลส่วนตัวสุนัข</p>
      {row("ชื่อ", data.name)}
      {row("เพศ", data.gender)}
      {row("สายพันธุ์", data.breed)}
      {row("วันเกิด", formatDateThai(data.birthDate))}
      {row("อายุ", data.age)}
      {row("เลขไมโครชิพ", data.microchip)}
      {row("ใบเพ็ดดีกรี", data.vaccineFile)}
      {row("โรคประจำตัว", data.chronicDisease)}
    </div>
  );
}

/* ---------- Edit mode ---------- */

type ProfileFormProps = {
  data: PetProfile;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
};

function ProfileForm({ data, onChange, onCancel, onSubmit }: ProfileFormProps) {
  const fieldClass =
    "w-full rounded-xl border border-[#cde4f2] bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#ffd56a]";

  return (
    <form className="flex flex-col gap-2.5 text-sm" onSubmit={onSubmit}>
              <p className="text-center text-[16px] text-black font-anuphan">ข้อมูลส่วนตัวสุนัข</p>

      <FormRow label="ชื่อ">
        <input
          className={fieldClass}
          name="name"
          value={data.name}
          onChange={onChange}
        />
      </FormRow>

      <FormRow label="เพศ">
        <input
          className={fieldClass}
          name="gender"
          value={data.gender}
          onChange={onChange}
        />
      </FormRow>

      <FormRow label="สายพันธุ์">
        <input
          className={fieldClass}
          name="breed"
          value={data.breed}
          onChange={onChange}
        />
      </FormRow>

      <FormRow label="วันเกิด">
        <input
          type="date"
          className={fieldClass}
          name="birthDate"
          value={data.birthDate}
          onChange={onChange}
        />
      </FormRow>

      <FormRow label="อายุ">
        <p>{data.age}</p>
      </FormRow>

      <FormRow label="เลขไมโครชิพ">
        <input
          className={fieldClass}
          name="microchip"
          value={data.microchip}
          onChange={onChange}
        />
      </FormRow>

      <FormRow label="ใบเพ็ดดีกรี">
        <input
          className={fieldClass}
          type="file"
          name="vaccineFile"
          onChange={onChange}
          placeholder="อัปโหลดไฟล์ … (mock)"
        />
      </FormRow>

      <FormRow label="โรคประจำตัว">
        <textarea
          className={fieldClass}
          name="chronicDisease"
          value={data.chronicDisease}
          onChange={onChange}
          rows={2}
        />
      </FormRow>

      <div className="mt-2 flex justify-end gap-3 font-anuphan">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-[#ffd56a] px-5 py-2 text-sm text-slate-700 bg-white hover:bg-[#fff5d7] transition-colors"
        >
          ยกเลิก
        </button>
        <button
          type="submit"
          className="rounded-full bg-[#ffd56a] px-6 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-[#ffce4a] transition-colors"
        >
          บันทึก ✓
        </button>
      </div>
    </form>
  );
}

function FormRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-1">
      <span className="font-anuphan text-[16px] text-nowrap text-[#23a0a0]">{label}:</span>
      {children}
    </div>
  );
}

/* ---------- utils & icons ---------- */

function formatDateThai(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}


