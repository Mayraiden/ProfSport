'use client'

import { useState } from 'react'
import { LoginForm } from '@/features/Auth/ui/LoginForm'
import { RegisterForm } from '@/features/Auth/ui/RegisterForm'
import { LoginFormData, RegisterFormData } from '@/shared/lib/validations/auth'

export const Auth = () => {
	const [mode, setMode] = useState<'login' | 'register'>('login')
	const [loading, setLoading] = useState(false)

	const handleLogin = async (data: LoginFormData) => {
		setLoading(true)
		try {
			// TODO: Интеграция с Strapi
			console.log('Login data:', data)
			// await authService.login(data)
		} catch (error) {
			console.error('Login error:', error)
		} finally {
			setLoading(false)
		}
	}

	const handleRegister = async (data: RegisterFormData) => {
		setLoading(true)
		try {
			// TODO: Интеграция с Strapi
			console.log('Register data:', data)
			// await authService.register(data)
		} catch (error) {
			console.error('Register error:', error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="w-full max-w-md">
			{/* Header */}
			<div className="mb-8">
				<h1 className="text-2xl font-bold text-black mb-2">
					{mode === 'login' ? 'Вход в аккаунт' : 'Регистрация аккаунта'}
				</h1>
			</div>

			{/* Form */}
			<div className="bg-white rounded-md p-6">
				{mode === 'login' ? (
					<LoginForm onSubmit={handleLogin} loading={loading} />
				) : (
					<RegisterForm onSubmit={handleRegister} loading={loading} />
				)}
			</div>

			{/* Footer */}
			<div className="text-center mt-6">
				<p className="text-sm text-black">
					{mode === 'login' ? (
						<>
							Нет аккаунта?{' '}
							<button
								type="button"
								onClick={() => setMode('register')}
								className="text-blue hover:underline font-medium"
							>
								Зарегистрироваться
							</button>
						</>
					) : (
						<>
							У Вас уже есть аккаунт?{' '}
							<button
								type="button"
								onClick={() => setMode('login')}
								className="text-blue hover:underline font-medium"
							>
								Войти
							</button>
						</>
					)}
				</p>
			</div>
		</div>
	)
}
