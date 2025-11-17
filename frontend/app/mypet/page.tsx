"use client";

import Image from "next/image";
import {
  Calendar,
  Clock,
  PawPrint,
  Scale,
  ArrowRight,
  Plus,
  Bell,
  User,
  ArrowLeft
} from "lucide-react";
import Card from "@/components/card";
import Bar from "@/components/bar";
import Navigation from "@/components/navigation";

export default function DogsPage() {
  
const dogs = [
    {
      id: 1,
      name: "Snow White",
      date: "23 11 2024",
      age: "1 year 3 month",
      breed: "Pomeranian",
      weight: "2.5 Kg",
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000"
    },
    {
      id: 2,
      name: "Snow White",
      date: "23 11 2024",
      age: "1 year 3 month",
      breed: "Pomeranian",
      weight: "2.5 Kg",
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000"
    },
    {
      id: 3,
      name: "Snow White",
      date: "23 11 2024",
      age: "1 year 3 month",
      breed: "Pomeranian",
      weight: "2.5 Kg",
      image:
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=1000"
    }
  ];
  return (
    <div className="mobile relative min-h-screen bg-[#F3F4F6] p-4">
      {/* Header */}
      <Bar />

      {/* Dog cards list */}
      <div className="flex flex-col gap-6">
        {dogs.map((dog) => (
          <Card key={dog.id} dog={dog} />
        ))}
      </div>

      {/* Floating Add Button */}
      <button className="fixed bottom-10 right-6 h-14 w-14 flex items-center justify-center bg-[#FFD774] rounded-xl shadow-md">
        <Plus className="h-6 w-6 text-black" />
      </button>
      <Navigation />
    </div>
  );
}
