'use client'

import Image from 'next/image'

import { BuyButton } from './BuyButton'
import { FavoriteButton } from './FavoriteButton'

export const ItemCard = () => {
	return (
		<div className="w-59 h-90 flex flex-col bg-white shadow-md">
			<div>
				<Image
					className="w-full"
					src="/basket.jpg"
					width={236}
					height={236}
					alt="картинка товара"
				/>
			</div>
			<div className="w-full flex flex-col gap-1 p-3">
				<h3 className="text-base font-bold">Название товара</h3>
				<p className="text-gray">Бренд</p>
				<p>19990</p>
				<div className="w-full flex justify-between">
					<BuyButton
						className="w-30 h-8 flex items-center justify-center rounded-sm text-white bg-burgundy cursor-pointer"
						type="button"
						text="В корзину"
					/>
					<FavoriteButton />
				</div>
			</div>
		</div>
	)
}
