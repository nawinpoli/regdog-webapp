"use client";

import { useRef } from "react";
import QRCode from "react-qr-code";
import * as htmlToImage from "html-to-image";
import { ArrowDownToLine, Link, Share } from "lucide-react";
import Navigation from "@/components/navigation";
import Bar from "@/components/bar";

export default function QRPage() {
  const qrRef = useRef<HTMLDivElement>(null);

  const qrValue = "https://pet-tracking.com/snow-white"; // ลิงก์ข้อมูลสุนัขจริง

  const copyLink = async () => {
    await navigator.clipboard.writeText(qrValue);
    alert("คัดลอกลิงก์แล้ว");
  };

  const downloadQR = async () => {
    if (!qrRef.current) return;

    const dataUrl = await htmlToImage.toPng(qrRef.current);
    const link = document.createElement("a");
    link.download = "pet-qrcode.png";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="mobile flex flex-col items-center">
        <Bar />
      <h1 className="text-xl font-bold mb-2">คิวอาร์โค้ดติดตามสุนัข</h1>

      {/* QR Code */}
      <div ref={qrRef} className="bg-white p-6 rounded-3xl mb-4 shadow-sm">
        <QRCode value={qrValue} size={260} />
      </div>

      <p className="text-center text-gray-500 mb-6 text-sm">
        ใช้คิวอาร์โค้ดหรือลิงก์เพื่อให้ผู้ใช้แสกนดูข้อมูลสุนัข
      </p>

      {/* Actions */}
      <div className="flex items-center gap-6 mb-6">
        <button onClick={copyLink} className="flex flex-col items-center text-sm">
          <Link />
          คัดลอกลิงก์
        </button>
        <button
          onClick={() => navigator.share({ url: qrValue })}
          className="flex flex-col items-center text-sm"
        >
          <Share />
          แชร์
        </button>
        <button onClick={downloadQR} className="flex flex-col items-center text-sm">
          <ArrowDownToLine />
          บันทึก
        </button>
      </div>

      {/* Edit QR Button */}
      <button className="px-10 py-2 rounded-full border border-yellow-400 text-gray-800 hover:bg-yellow-100 transition">
        แก้ไขคิวอาร์โค้ด
      </button>
      <Navigation />
    </div>
  );
}