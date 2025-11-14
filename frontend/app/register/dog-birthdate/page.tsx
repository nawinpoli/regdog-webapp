"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Calendar } from "lucide-react"

export default function DogBirthdatePage() {
	const [birthdate, setBirthdate] = useState("")

	return (
		<div className="min-h-dvh w-full flex items-center justify-center px-4 py-6 sm:py-10 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="mb-8">
					<Link 
						href="/register/dog-gender" 
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
					วันเกิดสุนัขของคุณ
				</h1>

				{/* Form */}
				<div className="space-y-6">
					<div className="relative">
						<Input 
							type="date"
							value={birthdate}
							onChange={(e) => setBirthdate(e.target.value)}
							className="h-14 text-base pr-10"
							placeholder="MM/DD/YYYY"
						/>
						<span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
							<Calendar size={20} />
						</span>
					</div>

					{/* Action Buttons */}
					<div className="flex gap-3">
						<Link href="/register/dog-gender" className="flex-1">
							<Button 
								variant="outline"
								className="w-full h-14 text-base font-medium border-2"
							>
								ข้าม
							</Button>
						</Link>
						
						<Link href="/register/dog-breed" className="flex-1">
							<Button 
								className="w-full h-14 text-base font-medium bg-yellow-300 text-black hover:bg-yellow-400"
								disabled={!birthdate}
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
