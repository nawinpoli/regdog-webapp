"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"

export default function DogBreedPage() {
	const [breed, setBreed] = useState("")
	const [isOpen, setIsOpen] = useState(false)

	const breeds = [
		"โกลเด้น รีทรีฟเวอร์",
		"ชิสุ",
		"ปอมเมอเรเนียน",
		"พุดเดิ้ล",
		"ฮัสกี้",
		"บีเกิ้ล",
		"เช็พเพิร์ด",
		"อื่นๆ"
	]

	return (
		<div className="min-h-dvh w-full flex items-center justify-center px-4 py-6 sm:py-10 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="mb-8">
					<Link 
						href="/register/dog-birthdate" 
						className="inline-flex items-center text-zinc-700 hover:text-zinc-900"
					>
						<ArrowLeft size={24} />
					</Link>
				</div>

				{/* Dog Illustration */}
				<div className="flex justify-center mb-8">
					<img src="/dogicon.png" alt="" className="w-32 sm:w-36 h-auto" />
				</div>

				{/* Title */}
				<h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-8">
					สายพันธุ์สุนัขของคุณ
				</h1>

				{/* Form */}
				<div className="space-y-6">
					<div className="relative">
						<button
							onClick={() => setIsOpen(!isOpen)}
							className="w-full h-14 px-4 flex items-center justify-between bg-cyan-200 hover:bg-cyan-300 rounded-lg border-2 border-cyan-300 text-left"
						>
							<div className="flex items-center gap-2 text-zinc-600">
								<span className="text-zinc-400">
									<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
										<circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="2"/>
										<path d="M6 15C6 13 8 11 10 11C12 11 14 13 14 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
									</svg>
								</span>
								<span className={breed ? "text-black" : "text-zinc-500"}>
									{breed || "สายพันธุ์"}
								</span>
							</div>
							<ChevronDown 
								size={20} 
								className={`text-zinc-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
							/>
						</button>

						{/* Dropdown */}
						{isOpen && (
							<div className="absolute top-full mt-2 w-full bg-white rounded-lg border-2 border-zinc-200 shadow-lg max-h-60 overflow-y-auto z-10">
								{breeds.map((breedOption) => (
									<button
										key={breedOption}
										onClick={() => {
											setBreed(breedOption)
											setIsOpen(false)
										}}
										className="w-full px-4 py-3 text-left hover:bg-zinc-50 border-b border-zinc-100 last:border-b-0"
									>
										{breedOption}
									</button>
								))}
							</div>
						)}
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						<Link href="/register/dog-birthdate" className="flex-1">
							<Button 
								variant="outline"
								className="w-full h-14 text-base font-medium border-2"
							>
								ข้าม
							</Button>
						</Link>
						
						<Link href="/" className="flex-1">
							<Button 
								className="w-full h-14 text-base font-medium bg-yellow-300 text-black hover:bg-yellow-400"
								disabled={!breed}
							>
								ต่อไป
								<ArrowRight className="ml-2" size={20} />
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
