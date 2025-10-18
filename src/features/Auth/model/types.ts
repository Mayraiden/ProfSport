export type IUserType = {
	username: string
	identifier: string
	name: string
	phone: string
}

export type IUserStoreType = {
	user: IUserType | null
	jwt: string | null

	isAuthenticated: boolean
	isLoading: boolean
	error: string | null

	setUser: (user: IUserType | null) => void
	setJwt: (jwt: string | null) => void
	setLoading: (loading: boolean) => void
	setError: (error: string | null) => void
	logout: () => void
}
