export type IBuyButtonProps = {
	type: 'button' | 'submit'
	text: string
	disabled?: boolean
	loading?: boolean
	className?: string
	onClick?: () => void
}

export type FavoriteProduct = {
	id: string
	name: string
	brand: string
	price: number
	image: string
}

export type FavoritesState = {
	products: FavoriteProduct[]
	isEmpty: boolean
}

// Auth types
export type LoginFormData = {
	email: string
	password: string
}

export type RegisterFormData = {
	name: string
	email: string
	password: string
	confirmPassword: string
}

export type AuthMode = 'login' | 'register'
