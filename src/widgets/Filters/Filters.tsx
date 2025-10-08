'use client'

import { useState } from 'react'
import { CaretUpIcon, CheckIcon } from '@phosphor-icons/react/ssr'
import './Filters.css'

export const Filters = () => {
	const [expandedSections, setExpandedSections] = useState({
		price: true,
		sportType: true,
		category: false,
		gender: false,
		brand: true,
	})

	const [filters, setFilters] = useState({
		price: { min: '0', max: '999 999' },
		sportType: {
			basketball: true,
			football: false,
			baseball: false,
			softball: false,
			volleyball: false,
		},
		category: {
			clothing: false,
			shoes: false,
			equipment: false,
			accessories: false,
		},
		gender: {
			male: false,
			female: false,
			unisex: false,
		},
		brand: { nike: true, adidas: false, newBalance: false, puma: false },
	})

	const toggleSection = (section: keyof typeof expandedSections) => {
		setExpandedSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}

	const handlePriceChange = (field: 'min' | 'max', value: string) => {
		setFilters((prev) => ({
			...prev,
			price: {
				...prev.price,
				[field]: value,
			},
		}))
	}

	const handleSportChange = (sport: string) => {
		setFilters((prev) => ({
			...prev,
			sportType: {
				...prev.sportType,
				[sport]: !prev.sportType[sport as keyof typeof prev.sportType],
			},
		}))
	}

	const handleCategoryChange = (category: string) => {
		setFilters((prev) => ({
			...prev,
			category: {
				...prev.category,
				[category]: !prev.category[category as keyof typeof prev.category],
			},
		}))
	}

	const handleGenderChange = (gender: string) => {
		setFilters((prev) => ({
			...prev,
			gender: {
				...prev.gender,
				[gender]: !prev.gender[gender as keyof typeof prev.gender],
			},
		}))
	}

	const handleBrandChange = (brand: string) => {
		setFilters((prev) => ({
			...prev,
			brand: {
				...prev.brand,
				[brand]: !prev.brand[brand as keyof typeof prev.brand],
			},
		}))
	}

	const resetFilters = () => {
		setFilters({
			price: { min: '0', max: '999 999' },
			sportType: {
				basketball: false,
				football: false,
				baseball: false,
				softball: false,
				volleyball: false,
			},
			category: {
				clothing: false,
				shoes: false,
				equipment: false,
				accessories: false,
			},
			gender: {
				male: false,
				female: false,
				unisex: false,
			},
			brand: { nike: false, adidas: false, newBalance: false, puma: false },
		})
	}

	return (
		<aside className="sticky top-4 w-70 h-115 p-6 self-start overflow-scroll shadow-lg bg-white">
			<h2 className="text-xl font-bold mb-6 text-gray-900">ФИЛЬТРЫ</h2>

			{/* Цена */}
			<div className="mb-6">
				<button
					onClick={() => toggleSection('price')}
					className="flex items-center justify-between w-full text-left mb-3"
				>
					<span className="font-semibold text-gray-900">Цена</span>
					<span
						className={`transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
					>
						<CaretUpIcon size={16} color="black" />
					</span>
				</button>

				{expandedSections.price && (
					<div className="flex gap-2">
						<input
							type="text"
							value={filters.price.min}
							onChange={(e) => handlePriceChange('min', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
							placeholder="0"
						/>
						<input
							type="text"
							value={filters.price.max}
							onChange={(e) => handlePriceChange('max', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-50 text-gray-700"
							placeholder="999 999"
						/>
					</div>
				)}
			</div>

			{/* Вид спорта */}
			<div className="mb-6">
				<button
					onClick={() => toggleSection('sportType')}
					className="flex items-center justify-between w-full text-left mb-3"
				>
					<span className="font-semibold text-gray-900">Вид спорта</span>
					<span
						className={`transform transition-transform ${expandedSections.sportType ? 'rotate-180' : ''}`}
					>
						<CaretUpIcon size={16} color="black" />
					</span>
				</button>

				{expandedSections.sportType && (
					<div className="space-y-2">
						{[
							{ key: 'basketball', label: 'Баскетбол' },
							{ key: 'football', label: 'Футбол' },
							{ key: 'baseball', label: 'Бейсбол' },
							{ key: 'softball', label: 'Софтбол' },
							{ key: 'volleyball', label: 'Волейбол' },
						].map((sport) => (
							<label
								key={sport.key}
								className="flex items-center gap-3 cursor-pointer"
							>
								<div className="relative">
									<input
										type="checkbox"
										checked={
											filters.sportType[
												sport.key as keyof typeof filters.sportType
											]
										}
										onChange={() => handleSportChange(sport.key)}
										className="custom-checkbox flex items-center justify-center"
									/>
									{filters.sportType[
										sport.key as keyof typeof filters.sportType
									] && (
										<CheckIcon
											size={10}
											color="white"
											className="absolute inset-0 m-auto pointer-events-none"
										/>
									)}
								</div>
								<span className="text-gray-700">{sport.label}</span>
							</label>
						))}
					</div>
				)}
			</div>

			{/* Категория */}
			<div className="mb-6">
				<button
					onClick={() => toggleSection('category')}
					className="flex items-center justify-between w-full text-left mb-3"
				>
					<span className="font-semibold text-gray-900">Категория</span>
					<span
						className={`transform transition-transform ${expandedSections.category ? 'rotate-180' : ''}`}
					>
						<CaretUpIcon size={16} color="black" />
					</span>
				</button>

				{expandedSections.category && (
					<div className="space-y-2">
						{[
							{ key: 'clothing', label: 'Одежда' },
							{ key: 'shoes', label: 'Обувь' },
							{ key: 'equipment', label: 'Экипировка' },
							{ key: 'accessories', label: 'Аксессуары' },
						].map((category) => (
							<label
								key={category.key}
								className="flex items-center gap-3 cursor-pointer"
							>
								<div className="relative">
									<input
										type="checkbox"
										checked={
											filters.category[
												category.key as keyof typeof filters.category
											]
										}
										onChange={() => handleCategoryChange(category.key)}
										className="custom-checkbox flex items-center justify-center"
									/>
									{filters.category[
										category.key as keyof typeof filters.category
									] && (
										<CheckIcon
											size={10}
											color="white"
											className="absolute inset-0 m-auto pointer-events-none"
										/>
									)}
								</div>
								<span className="text-gray-700">{category.label}</span>
							</label>
						))}
					</div>
				)}
			</div>

			{/* Пол */}
			<div className="mb-6">
				<button
					onClick={() => toggleSection('gender')}
					className="flex items-center justify-between w-full text-left mb-3"
				>
					<span className="font-semibold text-gray-900">Пол</span>
					<span
						className={`transform transition-transform ${expandedSections.gender ? 'rotate-180' : ''}`}
					>
						<CaretUpIcon size={16} color="black" />
					</span>
				</button>

				{expandedSections.gender && (
					<div className="space-y-2">
						{[
							{ key: 'male', label: 'Мужской' },
							{ key: 'female', label: 'Женский' },
							{ key: 'unisex', label: 'Унисекс' },
						].map((gender) => (
							<label
								key={gender.key}
								className="flex items-center gap-3 cursor-pointer"
							>
								<div className="relative">
									<input
										type="checkbox"
										checked={
											filters.gender[gender.key as keyof typeof filters.gender]
										}
										onChange={() => handleGenderChange(gender.key)}
										className="custom-checkbox flex items-center justify-center"
									/>
									{filters.gender[
										gender.key as keyof typeof filters.gender
									] && (
										<CheckIcon
											size={10}
											color="white"
											className="absolute inset-0 m-auto pointer-events-none"
										/>
									)}
								</div>
								<span className="text-gray-700">{gender.label}</span>
							</label>
						))}
					</div>
				)}
			</div>

			{/* Бренд */}
			<div className="mb-8">
				<button
					onClick={() => toggleSection('brand')}
					className="flex items-center justify-between w-full text-left mb-3"
				>
					<span className="font-semibold text-gray-900">Бренд</span>
					<span
						className={`transform transition-transform ${expandedSections.brand ? 'rotate-180' : ''}`}
					>
						<CaretUpIcon size={16} color="black" />
					</span>
				</button>

				{expandedSections.brand && (
					<div className="space-y-2">
						{[
							{ key: 'nike', label: 'Nike' },
							{ key: 'adidas', label: 'Adidas' },
							{ key: 'newBalance', label: 'New Balance' },
							{ key: 'puma', label: 'Puma' },
						].map((brand) => (
							<label
								key={brand.key}
								className="flex items-center gap-3 cursor-pointer"
							>
								<div className="relative">
									<input
										type="checkbox"
										checked={
											filters.brand[brand.key as keyof typeof filters.brand]
										}
										onChange={() => handleBrandChange(brand.key)}
										className="custom-checkbox flex items-center justify-center"
									/>
									{filters.brand[brand.key as keyof typeof filters.brand] && (
										<CheckIcon
											size={10}
											color="white"
											className="absolute inset-0 m-auto pointer-events-none"
										/>
									)}
								</div>
								<span className="text-gray-700">{brand.label}</span>
							</label>
						))}
					</div>
				)}
			</div>

			{/* Кнопки */}
			<div className="space-y-3">
				<button className="w-full bg-burgundy text-white py-3 px-4 rounded font-semibold hover:bg-burgundy/90 transition-colors">
					Показать
				</button>
				<button
					onClick={resetFilters}
					className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded font-semibold hover:bg-gray-50 transition-colors"
				>
					Сбросить все фильтры
				</button>
			</div>
		</aside>
	)
}
