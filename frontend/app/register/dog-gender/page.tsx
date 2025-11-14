"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

export default function DogGenderPage() {
	const [gender, setGender] = useState<string>("")

	return (
		<div className="min-h-dvh w-full flex items-center justify-center px-4 py-6 sm:py-10 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="mb-8">
					<Link 
						href="/register/dog-name" 
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
					เพศสุนัขของคุณ
				</h1>

				{/* Gender Selection */}
				<div className="space-y-6">
					<div className="grid grid-cols-2 gap-4">
						<button
							onClick={() => setGender("male")}
							className={`h-14 rounded-lg border-2 font-medium text-base transition-colors ${
								gender === "male"
									? "bg-cyan-200 border-cyan-300 text-black"
									: "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
							}`}
						>
							เพศผู้
						</button>
						
						<button
							onClick={() => setGender("female")}
							className={`h-14 rounded-lg border-2 font-medium text-base transition-colors ${
								gender === "female"
									? "bg-cyan-200 border-cyan-300 text-black"
									: "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50"
							}`}
						>
							เพศเมีย
						</button>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						<Link href="/register/dog-name" className="flex-1">
							<Button 
								variant="outline"
								className="w-full h-14 text-base font-medium border-2"
							>
								ข้าม
							</Button>
						</Link>
						
						<Link href="/register/dog-birthdate" className="flex-1">
							<Button 
								className="w-full h-14 text-base font-medium bg-yellow-300 text-black hover:bg-yellow-400"
								disabled={!gender}
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
