// Утилиты для обработки ошибок аутентификации

export interface StrapiError {
	status: number
	name: string
	message: string
	details: Record<string, any>
}

export interface StrapiResponse {
	data: any
	error?: StrapiError
}

// Функция для получения понятного сообщения об ошибке
export const getAuthErrorMessage = (error: any): string => {
	// Если это ошибка от Strapi
	if (error?.error) {
		const strapiError = error.error as StrapiError

		// Ошибки валидации
		if (strapiError.name === 'ValidationError') {
			return 'Проверьте правильность заполнения полей'
		}

		// Ошибки аутентификации
		if (strapiError.status === 400) {
			if (strapiError.message.includes('Invalid identifier or password')) {
				return 'Неверный email или пароль'
			}
			if (strapiError.message.includes('Email already taken')) {
				return 'Пользователь с таким email уже существует'
			}
			if (strapiError.message.includes('Username already taken')) {
				return 'Пользователь с таким именем уже существует'
			}
			return 'Проверьте правильность заполнения полей'
		}

		// Ошибки сервера
		if (strapiError.status >= 500) {
			return 'Ошибка сервера. Попробуйте позже'
		}

		// Общая ошибка
		return strapiError.message || 'Произошла ошибка'
	}

	// Если это сетевая ошибка
	if (error?.message) {
		if (error.message.includes('fetch')) {
			return 'Ошибка соединения. Проверьте подключение к интернету'
		}
		return error.message
	}

	// Общая ошибка
	return 'Произошла неизвестная ошибка'
}

// Функция для проверки, является ли ответ ошибкой
export const isStrapiError = (response: any): response is StrapiResponse => {
	return response && response.error && !response.user
}
