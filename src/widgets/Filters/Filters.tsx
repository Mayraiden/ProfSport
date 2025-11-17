'use client'

import { useEffect, useMemo } from 'react'
import { FilterSection } from '@features/Filters/ui/FiltersSection'
import { FILTERS_CONFIG } from '@features/Filters/config/filter.config'
import { useFilters } from '@features/Filters/lib/hooks'
import { useMainCategories } from '@features/Filters/lib/useCategories'
import type { FilterSection as FilterSectionType } from '@shared/types/filters.types'

import './Filters.css'

export const Filters = () => {
	const {
		filterValues,
		hasUnsavedChanges,
		setFilterValues,
		applyFilters,
		resetFilters,
		clearFilters,
	} = useFilters()

	const { data: mainCategories, isLoading: categoriesLoading } =
		useMainCategories()

	// Очищаем старые значения категорий при загрузке новых
	useEffect(() => {
		if (
			mainCategories &&
			mainCategories.length > 0 &&
			filterValues.categories
		) {
			// Проверяем, есть ли выбранные категории из старого конфига (английские значения)
			const oldCategoryValues = [
				'clothing',
				'shoes',
				'equipment',
				'accessories',
			]
			const hasOldValues = filterValues.categories.some((cat: string) =>
				oldCategoryValues.includes(cat)
			)

			// Если есть старые значения и они не соответствуют новым категориям, очищаем
			if (hasOldValues) {
				const validCategories = mainCategories.map((cat) => cat.name)
				const validSelectedCategories = (
					filterValues.categories as string[]
				).filter((cat: string) => validCategories.includes(cat))

				if (validSelectedCategories.length !== filterValues.categories.length) {
					setFilterValues({
						...filterValues,
						categories: validSelectedCategories,
					})
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [mainCategories])

	// Динамически обновляем конфиг с категориями
	const filtersConfig = useMemo(() => {
		// Преобразуем категории в формат фильтров (или пустой массив, если еще загружаются)
		const categoryOptions = mainCategories
			? mainCategories.map((category) => ({
					value: category.name,
					label: category.name,
				}))
			: []

		// Обновляем секцию категорий
		return FILTERS_CONFIG.map((section) => {
			if (section.id === 'category') {
				return {
					...section,
					filters: section.filters.map((filter) => {
						if (filter.id === 'categories') {
							return {
								...filter,
								// Используем загруженные категории или пустой массив пока загружаются
								options: categoryOptions,
							}
						}
						return filter
					}),
				}
			}
			return section
		}) as FilterSectionType[]
	}, [mainCategories, categoriesLoading])

	// Синхронизация при монтировании
	useEffect(() => {
		// Инициализация уже происходит в useFilters
	}, [])
	return (
		<aside className="sticky top-4 w-70 max-h-[calc(100vh-2rem)] pt-3 p-6 self-start shadow-lg bg-white flex flex-col">
			{/* <h2 className="text-xl font-bold mb-6 text-gray-900">ФИЛЬТРЫ</h2> */}

			<div className="flex-1 overflow-y-scroll space-y-2 filters-scroll min-h-0">
				<div className="filters-content">
					{filtersConfig.map((section) => (
						<FilterSection
							key={section.id}
							section={section}
							values={filterValues}
							onValuesChange={setFilterValues}
						/>
					))}
				</div>
			</div>

			{/* Fade-out эффект */}
			<div className="relative flex-shrink-0">
				<div className="absolute -top-12 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none z-10"></div>
			</div>

			{/* Фиксированные кнопки внизу */}
			<div className="pt-4 space-y-3 flex-shrink-0 border-t border-gray-200 bg-white">
				<button
					onClick={applyFilters}
					disabled={!hasUnsavedChanges}
					className={`w-full py-3 px-4 rounded-md transition-colors duration-200 font-medium ${
						hasUnsavedChanges
							? 'bg-burgundy text-white hover:bg-burgundy/90'
							: 'bg-gray-300 text-gray-500 cursor-not-allowed'
					}`}
				>
					Показать
				</button>
				<button
					onClick={clearFilters}
					className="w-full bg-white text-gray-700 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200 font-medium"
				>
					Сбросить все фильтры
				</button>
			</div>
		</aside>
	)
}
