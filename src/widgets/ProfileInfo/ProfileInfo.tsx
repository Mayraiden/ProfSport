'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	TrashIcon,
	SignOutIcon,
	NotePencilIcon,
} from '@phosphor-icons/react/ssr'
import { useAuthStore } from '@/features/Auth/model/store'
import {
	profileSchema,
	ProfileFormData,
} from '@/shared/lib/validations/profile'

export const ProfileInfo = () => {
	const [isEditMode, setIsEditMode] = useState(false)

	// Получаем данные из store
	const { user, logout } = useAuthStore()
	const router = useRouter()

	// Настройка react-hook-form с Zod валидацией
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: '',
			phone: '',
			email: '',
		},
	})

	// Загружаем данные пользователя при монтировании компонента
	useEffect(() => {
		if (user) {
			reset({
				name: user.firstName || '',
				phone: user.phone || '',
				email: user.email || '',
			})
		}
	}, [user, reset])

	// Обработка сохранения формы
	const onSubmit = (data: ProfileFormData) => {
		console.log('Saving profile data:', data)
		// TODO: Отправить данные на сервер
		setIsEditMode(false)
	}

	// Переключение режима редактирования
	const handleEditToggle = () => {
		if (isEditMode) {
			// Сохранение данных через react-hook-form
			handleSubmit(onSubmit)()
		} else {
			setIsEditMode(true)
		}
	}

	// Выход из аккаунта
	const handleLogout = () => {
		logout()
		router.push('/')
	}

	// Удаление аккаунта
	const handleDeleteAccount = () => {
		// TODO: Показать модальное окно подтверждения
		console.log('Delete account')
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
								{...register('name')}
								type="text"
								disabled={!isEditMode}
								className="absolute top-6 left-3 right-3 bg-transparent text-base text-black outline-none disabled:cursor-not-allowed"
								placeholder="Введите ваше имя"
							/>
							{errors.name && (
								<p className="text-red-500 text-xs mt-1">
									{errors.name.message}
								</p>
							)}
						</div>

						{/* Телефон */}
						<div className="relative h-13 bg-[#F0F4F8] rounded-md">
							<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
								Телефон
							</label>
							<input
								{...register('phone')}
								type="tel"
								disabled={!isEditMode}
								className="absolute top-6 left-3 right-3 bg-transparent text-base text-black outline-none disabled:cursor-not-allowed"
								placeholder="+7 (999) 000-00-00"
							/>
							{errors.phone && (
								<p className="text-red-500 text-xs mt-1">
									{errors.phone.message}
								</p>
							)}
						</div>

						{/* Email */}
						<div className="relative h-13 bg-[#F0F4F8] rounded-md">
							<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
								Email
							</label>
							<input
								{...register('email')}
								type="email"
								disabled={true}
								className="absolute top-6 left-3 right-3 bg-transparent text-base text-black outline-none disabled:cursor-not-allowed"
								placeholder="ваш.email@example.com"
							/>
							{errors.email && (
								<p className="text-red-500 text-xs mt-1">
									{errors.email.message}
								</p>
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
