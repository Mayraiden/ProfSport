'use client'

import { useState } from 'react'
import { HeartStraightIcon } from '@phosphor-icons/react/ssr'

export const FavoriteButton = () => {
	const [isFavorite, setIsFavorite] = useState(false)

	const handleAddFavorite = () => {
		setIsFavorite(!isFavorite)
	}

	return (
		<button onClick={handleAddFavorite}>
			<HeartStraightIcon
				size={24}
				fill="#7b1931"
				weight={isFavorite ? 'fill' : 'regular'}
			/>
		</button>
	)
}
