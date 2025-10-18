'use client'

import { ReactNode } from 'react'
import { Header } from '@/widgets/Header/Header'
import { Footer } from '@/widgets/Footer/Footer'
import { IProfileSideBar } from '@/shared/ui/IProfileSideBar'

interface ProfileLayoutProps {
	children: ReactNode
}

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
	return (
		<section className="w-screen min-h-screen bg-[#F0F4F8] flex flex-col">
			<Header />
			<div className="flex-1 py-10 px-15 flex gap-5">
				<IProfileSideBar />
				<div className="flex-1">{children}</div>
			</div>
			<Footer />
		</section>
	)
}
