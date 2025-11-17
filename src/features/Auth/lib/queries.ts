import { useMutation } from '@tanstack/react-query'
import { strapiAuth } from '../model/api'
import { useAuthStore } from '../model/store'
import { getAuthErrorMessage } from '@/shared/lib/errors/authErrors'

export const useLogin = () => {
	return useMutation({
		mutationFn: strapiAuth.login,
		onSuccess: (data) => {
			if (data.user && data.jwt) {
				useAuthStore.getState().setUser(data.user)
				useAuthStore.getState().setJwt(data.jwt)
				useAuthStore.getState().setError(null)
			}
		},
		onError: (error: unknown) => {
			const errorMessage = getAuthErrorMessage(error)
			useAuthStore.getState().setError(errorMessage)
		},
	})
}

export const useRegister = () => {
	return useMutation({
		mutationFn: strapiAuth.register,
		onSuccess: (data) => {
			if (data.user && data.jwt) {
				useAuthStore.getState().setUser(data.user)
				useAuthStore.getState().setJwt(data.jwt)
				useAuthStore.getState().setError(null)
			}
		},
		onError: (error: unknown) => {
			const errorMessage = getAuthErrorMessage(error)
			useAuthStore.getState().setError(errorMessage)
		},
	})
}
