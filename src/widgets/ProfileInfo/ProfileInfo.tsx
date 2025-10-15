'use client'

import { useState } from 'react'
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
			{/* Заголовок страницы */}
			<div className="mb-5">
				<h1 className="text-3xl font-bold text-black">Профиль</h1>
			</div>

			{/* Форма с данными пользователя */}
			<div className="w-full bg-white rounded-md p-10">
				<div className="max-w-4xl">
					{/* Поля ввода */}
					<div className="max-w-[460px] space-y-3 mb-5">
						{/* Имя */}
						<div className="relative h-13 bg-[#F0F4F8] rounded-md">
							<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
								Имя
							</label>
							<input
								type="text"
								value={userData.name}
								onChange={(e) => handleInputChange('name', e.target.value)}
								disabled={!isEditMode}
								className="absolute top-6 left-3 right-3 bg-transparent text-base text-black outline-none disabled:cursor-not-allowed"
								placeholder="Введите ваше имя"
							/>
						</div>

						{/* Телефон */}
						<div className="relative h-13 bg-[#F0F4F8] rounded-md">
							<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
								Телефон
							</label>
							<input
								type="tel"
								value={userData.phone}
								onChange={(e) => handleInputChange('phone', e.target.value)}
								disabled={!isEditMode}
								className="absolute top-6 left-3 right-3 bg-transparent text-base text-black outline-none disabled:cursor-not-allowed"
								placeholder="+7 (999) 000-00-00"
							/>
						</div>

						{/* Email */}
						<div className="relative h-13 bg-[#F0F4F8] rounded-md">
							<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
								Email
							</label>
							<input
								type="email"
								value={userData.email}
								onChange={(e) => handleInputChange('email', e.target.value)}
								disabled={isEditMode}
								className={`absolute top-6 left-3 right-3 bg-transparent text-base outline-none disabled:cursor-not-allowed ${
									isEditMode ? 'text-[#A0A4A8] opacity-50' : 'text-black'
								}`}
								placeholder="ваш.email@example.com"
							/>
						</div>

						{/* Пароль */}
						<div className="relative h-13 bg-[#F0F4F8] rounded-md">
							<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
								Пароль
							</label>
							<input
								type={showPassword ? 'text' : 'password'}
								value={
									isEditMode
										? userData.password
										: showPassword
											? userData.password
											: '**********'
								}
								onChange={(e) => handleInputChange('password', e.target.value)}
								disabled={isEditMode}
								className={`absolute top-6 left-3 right-20 bg-transparent text-base outline-none disabled:cursor-not-allowed ${
									isEditMode ? 'text-[#A0A4A8] opacity-50' : 'text-black'
								}`}
								placeholder="Введите пароль"
							/>
							{!isEditMode && (
								<button
									type="button"
									onClick={togglePasswordVisibility}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#A0A4A8] hover:text-gray-700"
								>
									{showPassword ? 'скрыть' : 'показать'}
								</button>
							)}
						</div>
					</div>

					{/* Кнопки действий */}
					<div className="flex justify-between items-end">
						{/* Кнопка Редактировать/Сохранить */}
						<button
							type="button"
							onClick={handleEditToggle}
							className={`w-40 h-12 px-6 py-4 flex items-center justify-center gap-2  rounded-md transition-colors duration-200 ${
								isEditMode
									? 'bg-[#2A7D5A] text-white hover:bg-[#1f5f47]'
									: 'bg-[#193B7B] text-white hover:bg-[#1a4a8f]'
							}`}
						>
							<NotePencilIcon size={20} className="shrink-0" />
							{isEditMode ? 'Сохранить' : 'Редактировать'}
						</button>

						{/* Кнопки Выйти и Удалить */}
						<div className="flex items-center gap-5">
							<button
								type="button"
								onClick={handleLogout}
								className="flex items-center gap-2 px-4 py-2 bg-[#F0F4F8] text-black rounded-md hover:bg-[#e8edf2] transition-colors duration-200"
							>
								<SignOutIcon size={16} />
								Выйти из аккаунта
							</button>

							<button
								type="button"
								onClick={handleDeleteAccount}
								className="flex items-center gap-2 px-4 py-2 bg-[#7B1931] text-white rounded-md hover:bg-[#6a1529] transition-colors duration-200"
							>
								<TrashIcon size={16} />
								Удалить аккаунт
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
