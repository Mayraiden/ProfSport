'use client'

import { useState } from 'react'
import { IInput } from '@/shared/ui/IInput'
import {
	TrashIcon,
	SignOutIcon,
	NotePencilIcon,
} from '@phosphor-icons/react/ssr'

interface UserData {
	name: string
	phone: string
	email: string
	password: string
}

const initialUserData: UserData = {
	name: '',
	phone: '',
	email: '',
	password: '',
}

export const ProfileInfo = () => {
	const [isEditMode, setIsEditMode] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const [userData, setUserData] = useState<UserData>(initialUserData)
	const [errors, setErrors] = useState<Partial<UserData>>({})

	// Валидация email
	const validateEmail = (email: string): boolean => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
	}

	// Валидация телефона
	const validatePhone = (phone: string): boolean => {
		const phoneRegex =
			/^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/
		return phoneRegex.test(phone)
	}

	// Обработка изменения полей
	const handleInputChange = (field: keyof UserData, value: string) => {
		setUserData((prev) => ({ ...prev, [field]: value }))

		// Очистка ошибки при изменении
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: undefined }))
		}

		// Валидация в реальном времени
		if (field === 'email' && value && !validateEmail(value)) {
			setErrors((prev) => ({ ...prev, email: 'Неверный формат email' }))
		}

		if (field === 'phone' && value && !validatePhone(value)) {
			setErrors((prev) => ({ ...prev, phone: 'Неверный формат телефона' }))
		}
	}

	// Переключение режима редактирования
	const handleEditToggle = () => {
		if (isEditMode) {
			// Сохранение данных (пока просто переключаем режим)
			setIsEditMode(false)
		} else {
			setIsEditMode(true)
		}
	}

	// Выход из аккаунта
	const handleLogout = () => {
		// TODO: Реализовать logout
		console.log('Logout')
	}

	// Удаление аккаунта
	const handleDeleteAccount = () => {
		// TODO: Показать модальное окно подтверждения
		console.log('Delete account')
	}

	// Переключение видимости пароля
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className="w-full">
			<h2 className="text-lg font-bold mb-5">Профиль</h2>
			<div className="w-full pt-5 pl-5 pb-5 bg-white">
				<form
					className="flex flex-col gap-4"
					onSubmit={(e) => e.preventDefault()}
				>
					{/* Имя */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-500">Имя</label>
						<IInput
							value={userData.name}
							onChange={(e) => handleInputChange('name', e.target.value)}
							placeholder="Введите ваше имя"
							disabled={!isEditMode}
							className={errors.name ? 'border-red-500' : ''}
						/>
						{errors.name && (
							<span className="text-xs text-red-500">{errors.name}</span>
						)}
					</div>

					{/* Телефон */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-500">Телефон</label>
						<IInput
							value={userData.phone}
							onChange={(e) => handleInputChange('phone', e.target.value)}
							placeholder="+7 (999) 000-00-00"
							disabled={!isEditMode}
							className={errors.phone ? 'border-red-500' : ''}
						/>
						{errors.phone && (
							<span className="text-xs text-red-500">{errors.phone}</span>
						)}
					</div>

					{/* Email */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-500">Email</label>
						<IInput
							type="email"
							value={userData.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							placeholder="your.email@example.com"
							disabled={!isEditMode}
							className={errors.email ? 'border-red-500' : ''}
						/>
						{errors.email && (
							<span className="text-xs text-red-500">{errors.email}</span>
						)}
					</div>

					{/* Пароль */}
					<div className="flex flex-col gap-1">
						<label className="text-sm text-gray-500">Пароль</label>
						<div className="relative">
							<IInput
								type={showPassword ? 'text' : 'password'}
								value={isEditMode ? userData.password : '**********'}
								onChange={(e) => handleInputChange('password', e.target.value)}
								placeholder="Введите пароль"
								disabled={!isEditMode}
								className="pr-10"
							/>
							{!isEditMode && (
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm"
								>
									{showPassword ? 'скрыть' : 'показать'}
								</button>
							)}
						</div>
					</div>

					{/* Кнопки действий */}
					<div className="flex items-center gap-4 mt-6">
						<button
							type="button"
							onClick={handleEditToggle}
							className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
						>
							<NotePencilIcon size={16} />
							{isEditMode ? 'Сохранить' : 'Редактировать'}
						</button>

						<button
							type="button"
							onClick={handleLogout}
							className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
						>
							<SignOutIcon size={16} />
							Выйти из аккаунта
						</button>

						<button
							type="button"
							onClick={handleDeleteAccount}
							className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors duration-200"
						>
							<TrashIcon size={16} />
							Удалить аккаунт
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
