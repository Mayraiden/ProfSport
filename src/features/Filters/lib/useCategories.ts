import { useQuery } from '@tanstack/react-query'
import { categoryApi } from '../api/categoryApi'

/**
 * Хук для получения главных категорий
 */
export const useMainCategories = () => {
	return useQuery({
		queryKey: ['categories', 'main'],
		queryFn: () => categoryApi.getMainCategories(),
		staleTime: 10 * 60 * 1000, // 10 минут
		gcTime: 30 * 60 * 1000, // 30 минут
		refetchOnWindowFocus: false,
	})
}
