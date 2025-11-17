import type {
	RegisterFormData,
	LoginFormData,
} from '@shared/lib/validations/auth'
import { isStrapiError } from '@/shared/lib/errors/authErrors'

const API_URL = process.env.NEXT_STRAPI_URL || 'http://localhost:1337'

export const strapiAuth = {
	register: async (data: RegisterFormData) => {
		try {
			const response = await fetch(`${API_URL}/api/auth/local/register`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					username: data.email,
					email: data.email,
					password: data.password,
					firstName: data.name,
					phone: data.phone,
				}),
			})

			const result = await response.json()

			// Если это ошибка, выбрасываем её
			if (isStrapiError(result)) {
				throw new Error(result.error?.message || 'Ошибка сервера')
			}

			return result
		} catch (error) {
			// Если это сетевая ошибка или другая ошибка
			throw error
		}
	},

	login: async (data: LoginFormData) => {
		try {
			const response = await fetch(`${API_URL}/api/auth/local`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					identifier: data.email,
					password: data.password,
				}),
			})

			const result = await response.json()

			// Если это ошибка, выбрасываем её
			if (isStrapiError(result)) {
				throw new Error(result.error?.message || 'Ошибка сервера')
			}

			return result
		} catch (error) {
			// Если это сетевая ошибка или другая ошибка
			throw error
		}
	},
}
