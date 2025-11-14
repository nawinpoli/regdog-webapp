"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
	return (
		<div className="min-h-dvh w-full flex justify-center px-4 py-6 sm:py-10 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
			<div className="w-full max-w-md">
				{/* Header */}
				<div className="flex items-center justify-center relative mb-8 sm:mb-10">
					<Link 
						href="/login" 
						className="absolute left-0 inline-flex items-center text-zinc-700 hover:text-zinc-900"
					>
						<ArrowLeft size={24} />
					</Link>
					<h1 className="font-medium text-[16px] leading-[100%] tracking-[0] text-center font-anuphan">สร้างบัญชีใหม่</h1>
				</div>

				{/* Titles */}
				<div className="space-y-1 mb-6 sm:mb-8">
					<p className="font-normal text-[24px] leading-[100%] tracking-[0] align-middle font-anuphan">ยินดีต้อนรับสู่ RegDog</p>
					<h2 className="font-medium text-[32px] leading-[100%] tracking-[0] align-middle font-anuphan">สร้างบัญชีของคุณ</h2>
				</div>

				{/* Form */}
				<form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
					<div className="space-y-2">
						<div className="relative">
							<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
								<Mail size={18} />
							</span>
							<Input 
								id="email" 
								type="email" 
								placeholder="อีเมล" 
								className="pl-10" 
								required 
							/>
						</div>
					</div>

					<div className="space-y-2">
						<div className="relative">
							<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
								<Lock size={18} />
							</span>
							<Input 
								id="password" 
								type="password" 
								placeholder="รหัสผ่าน" 
								className="pl-10" 
								required 
							/>
						</div>
					</div>

					<div className="space-y-2">
						<div className="relative">
							<span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
								<Lock size={18} />
							</span>
							<Input 
								id="confirmPassword" 
								type="password" 
								placeholder="ยืนยันรหัสผ่าน" 
								className="pl-10" 
								required 
							/>
						</div>
					</div>

					<Link href="/register/dog-ownership">
						<Button 
							type="button" 
							className="rounded-full w-full h-12 text-base font-medium bg-ffeca5 text-black hover:bg-[#f9dc75] mt-6"
						>
							สร้างบัญชี
						</Button>
					</Link>
				</form>

				{/* Footer */}
				<p className="mt-6 text-center text-sm text-zinc-500">
					คุณมีบัญชีอยู่แล้วใช่ไหม? {" "}
					<Link href="/login" className="font-medium text-zinc-700 hover:underline">
						เข้าสู่ระบบ
					</Link>
				</p>
			</div>
		</div>
	)
}
