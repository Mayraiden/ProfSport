'use client'

import { useState } from 'react'
import { FilterSection } from '@features/Filters/ui/FiltersSection'
import { FILTERS_CONFIG } from '@features/Filters/config/filter.config'
import { FilterValues } from '@shared/types/filters.types'

import './Filters.css'

export const Filters = () => {
	const [filterValues, setFilterValues] = useState<FilterValues>(() => {
		// Инициализируем значения по умолчанию из конфига
		const initialValues: FilterValues = {}
		FILTERS_CONFIG.forEach((section) => {
			section.filters.forEach((filter) => {
				if (filter.default !== undefined) {
					initialValues[filter.id] = filter.default
				}
			})
		})
		return initialValues
	})

	const handleFilterChange = (newValues: FilterValues) => {
		setFilterValues(newValues)
		// Здесь можно добавить логику отправки фильтров на сервер
		console.log('Filter values changed:', newValues)
	}

	const resetFilters = () => {
		const resetValues: FilterValues = {}
		FILTERS_CONFIG.forEach((section) => {
			section.filters.forEach((filter) => {
				if (filter.default !== undefined) {
					resetValues[filter.id] = filter.default
				}
			})
		})
		setFilterValues(resetValues)
	}

	const applyFilters = () => {
		console.log('Applying filters:', filterValues)
	}
	return (
		<aside className="sticky top-4 w-70 h-screen p-6 self-start shadow-lg bg-white flex flex-col">
			<h2 className="text-xl font-bold mb-6 text-gray-900">ФИЛЬТРЫ</h2>

			<div className="flex-1 overflow-y-scroll space-y-2 filters-scroll">
				<div className="filters-content">
					{FILTERS_CONFIG.map((section) => (
						<FilterSection
							key={section.id}
							section={section}
							values={filterValues}
							onValuesChange={handleFilterChange}
						/>
					))}
				</div>
			</div>

			{/* Fade-out эффект */}
			<div className="relative">
				<div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
			</div>

			{/* Фиксированные кнопки внизу */}
			<div className="mt-4 pb-4 space-y-3 flex-shrink-0">
				<button
					onClick={applyFilters}
					className="w-full bg-burgundy text-white py-3 px-4 rounded-md hover:bg-burgundy/90 transition-colors duration-200 font-medium"
				>
					Показать
				</button>
				<button
					onClick={resetFilters}
					className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200 font-medium"
				>
					Сбросить все фильтры
				</button>
			</div>
		</aside>
	)
}
