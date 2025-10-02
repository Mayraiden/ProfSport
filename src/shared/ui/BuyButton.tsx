'use client'

import { useState } from 'react'
import type { IBuyButtonProps } from '../types'

export const BuyButton = ({ ...props }: IBuyButtonProps) => {
	const [isInCart, setIsInCart] = useState(false)
	const [quantity, setQuantity] = useState(1)

	const handleAddToCart = () => {
		setIsInCart(true)
		props.onClick?.()
	}

	const handleIncrease = () => {
		setQuantity((prev) => prev + 1)
	}

	const handleDecrease = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1)
		} else {
			setIsInCart(false)
			setQuantity(1)
		}
	}

	if (isInCart) {
		return (
			<div className="w-30 h-8 flex items-center bg-[#f8f4f4] rounded-sm overflow-hidden">
				<button
					onClick={handleDecrease}
					className="w-8 h-8 bg-gray/20 hover:bg-burgundy text-gray-700 hover:text-white transition-colors duration-200 rounded-l-sm flex items-center justify-center"
					type="button"
				>
					-
				</button>
				<div className="h-full flex-1 bg-gray/20 text-gray-700 text-center flex items-center justify-center font-medium">
					{quantity}
				</div>
				<button
					onClick={handleIncrease}
					className="w-8 h-8 bg-gray/20 hover:bg-burgundy text-gray-700 hover:text-white transition-colors duration-200 rounded-r-sm flex items-center justify-center"
					type="button"
				>
					+
				</button>
			</div>
		)
	}

	return (
		<button
			className={` bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors duration-200 ${props.className || ''}`}
			type={props.type}
			onClick={handleAddToCart}
			disabled={props.disabled || props.loading}
		>
			{props.loading ? 'минутку..' : props.text}
		</button>
	)
}
