"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DogOwnershipPage() {
	return (
		<div className="min-h-dvh w-full flex justify-center px-4 py-6 sm:py-10 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="mb-8">
					<Link 
						href="/register" 
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
				<h1 className="font-normal text-2xl font-anuphan tracking-tight text-center mb-8">
					คุณมีสุนัขหรือไม่
				</h1>

				{/* Buttons */}
				<div className="flex flex-col gap-6">
					<Link href="/register/dog-name">
						<Button 
							variant="outline"
							className="rounded-full w-full h-14 text-base font-medium border border-73a2ac hover:bg-zinc-50 text-73a2ac"
						>
							ฉันมีสุนัข
						</Button>
					</Link>
					
					<Link href="/register/dog-name">
						<Button 
							className="rounded-full w-full h-14 text-base font-medium bg-bce7f0 text-black hover:bg-[#8ddbeb] border border-73a2ac"
						>
							ฉันไม่มีสุนัข
						</Button>
					</Link>
				</div>
			</div>
		</div>
	)
}
