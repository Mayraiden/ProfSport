'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/shared/lib/validations/auth'
import { IInput } from '@/shared/ui/IInput'
import { AuthButton } from '@/shared/ui/AuthButton'
import { FormField } from '@/shared/ui/FormField'
import { PasswordInput } from '@/shared/ui/PasswordInput'

interface LoginFormProps {
	onSubmit: (data: LoginFormData) => void
	loading?: boolean
}

export const LoginForm = ({ onSubmit, loading = false }: LoginFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
			{/* Email */}
			<FormField label="Email" error={errors.email?.message}>
				<IInput
					{...register('email')}
					type="email"
					placeholder="yourown@gmail.com"
					className="bg-transparent text-base text-black outline-none focus:outline-none"
				/>
			</FormField>

			{/* Password */}
			<FormField label="Пароль" error={errors.password?.message}>
				<PasswordInput {...register('password')} placeholder="**********" />
			</FormField>

			{/* Submit Button */}
			<div className="pt-4">
				<AuthButton type="submit" loading={loading}>
					Войти
				</AuthButton>
			</div>
		</form>
	)
}
