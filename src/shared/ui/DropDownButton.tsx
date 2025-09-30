'use client'
import { useState } from 'react'
import { QrCodeIcon } from '@phosphor-icons/react'

export const DropDownButton = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	return (
		<button className="w-30.5 h-8 flex bg-gray">
			<QrCodeIcon size={20} weight="bold" />
			<span>Каталог</span>
		</button>
	)
}
