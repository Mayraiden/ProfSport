'use client'
import { useState } from 'react'
import { QrCodeIcon } from '@phosphor-icons/react'

export const DropDownButton = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<button className="w-30.5 h-full flex gap-2 items-center justify-center bg-gray/20 rounded-sm cursor-pointer hover:bg-gray/30 transition-colors duration-200">
			<QrCodeIcon size={20} weight="bold" />
			<span className="text-base font-bold">КАТАЛОГ</span>
		</button>
	)
}
