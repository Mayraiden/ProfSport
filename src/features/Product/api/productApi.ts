import type {
	ApiProduct,
	ApiResponse,
	ApiErrorResponse,
	ProductFilters,
	PaginationParams,
	Product,
	SearchSuggestion,
} from '@/shared/types'
import {
	logSearchRequest,
	logSearchResponse,
} from '@/shared/lib/utils/searchDebug'

const API_URL = 'http://localhost:1337'

// Debug function to test image params decoding
const debugImageParams = (imgUrl: string) => {
	console.log('=== DEBUG IMAGE PARAMS ===')
	console.log('Original URL:', imgUrl)

	const paramsMatch = imgUrl.match(/params=(.+)/)
	if (paramsMatch) {
		const rawParams = paramsMatch[1]
		console.log('Raw params:', rawParams)

		// Try base64 decoding
		try {
			const decodedParams = atob(rawParams)
			console.log('Base64 decoded:', decodedParams)
			const params = JSON.parse(decodedParams)
			console.log('Parsed params:', params)
			return params
		} catch (base64Error) {
			console.log('Base64 decode failed:', base64Error)
		}

		// Try URL decoding
		try {
			const decodedParams = decodeURIComponent(rawParams)
			console.log('URL decoded:', decodedParams)
			const params = JSON.parse(decodedParams)
			console.log('Parsed params:', params)
			return params
		} catch (urlError) {
			console.log('URL decode failed:', urlError)
		}
	}

	console.log('=== END DEBUG ===')
	return null
}

// Transform API product to our Product type
const transformApiProduct = (apiProduct: ApiProduct): Product => {
	return {
		id: apiProduct.id.toString(),
		article: apiProduct.article || apiProduct.sbisNomNumber || 'Не указано',
		name: apiProduct.name || 'Без названия',
		brand: apiProduct.categoryName || 'Не указано',
		price: apiProduct.price || 0,
		images: (() => {
			// Extract SBIS photo URLs from the params
			const validImages = (apiProduct.images || [])
				.filter((imgUrl) => imgUrl && typeof imgUrl === 'string')
				.map((imgUrl, index) => {
					try {
						// Extract SBIS photo URL from the params
						const paramsMatch = imgUrl.match(/params=(.+)/)
						if (paramsMatch) {
							const rawParams = paramsMatch[1]

							// Try base64 decoding
							try {
								const decodedParams = atob(rawParams)
								const params = JSON.parse(decodedParams)

								if (params.PhotoURL) {
									return {
										id: index.toString(),
										url: params.PhotoURL,
										alt: apiProduct.name || 'Изображение товара',
									}
								}
							} catch (base64Error) {
								// Try URL decoding
								const decodedParams = decodeURIComponent(rawParams)
								const params = JSON.parse(decodedParams)

								if (params.PhotoURL) {
									return {
										id: index.toString(),
										url: params.PhotoURL,
										alt: apiProduct.name || 'Изображение товара',
									}
								}
							}
						}
					} catch (error) {
						console.warn('Failed to parse image params:', error)
					}

					// Fallback to default image
					return {
						id: index.toString(),
						url: '/basket.jpg',
						alt: apiProduct.name || 'Изображение товара',
					}
				})

			// If no valid images, add a fallback
			if (validImages.length === 0) {
				return [
					{
						id: '0',
						url: '/basket.jpg', // Fallback image
						alt: apiProduct.name || 'Изображение товара',
					},
				]
			}

			return validImages
		})(),
		colors: [], // Not available in current API
		sizes: [], // Not available in current API
		description: apiProduct.description,
		characteristics: {
			Категория: apiProduct.categoryName || 'Не указано',
			Артикул: apiProduct.article || apiProduct.sbisNomNumber || 'Не указано',
			Единица: apiProduct.unit || 'шт',
			'SBIS ID': apiProduct.sbisId?.toString() || 'Не указано',
		},
	}
}

// Main API functions
export const productApi = {
	async getProducts(params: ProductFilters & PaginationParams = {}): Promise<{
		products: Product[]
		total: number
		page: number
		pageSize: number
		pageCount: number
	}> {
		const searchParams = new URLSearchParams()

		// Pagination - convert to API format
		const start = params.start ?? params.offset ?? 0
		const limit = params.limit ?? params.pageSize ?? 20

		searchParams.append('start', start.toString())
		searchParams.append('limit', limit.toString())

		// Sorting
		if (params.sortBy) {
			const sortField =
				params.sortBy === 'createdAt' ? 'createdAt' : params.sortBy
			const sortOrder = params.sortOrder || 'asc'
			searchParams.append('sort', `${sortField}:${sortOrder}`)
		}

		// Filters
		if (params.search) {
			// Temporarily use Strapi search until Meilisearch is fixed
			console.log(`🔍 [Search] Using Strapi search for: "${params.search}"`)
			searchParams.append('filters[$or][0][name][$containsi]', params.search)
			searchParams.append(
				'filters[$or][1][description][$containsi]',
				params.search
			)
			searchParams.append(
				'filters[$or][2][sbisNomNumber][$containsi]',
				params.search
			)
			searchParams.append(
				'filters[$or][3][categoryName][$containsi]',
				params.search
			)
		}

		// Category filter - поддерживаем множественные значения
		// Используем rootCategoryName для фильтрации по главным категориям
		if (params.category) {
			console.log('🔍 [Filter] Category filter:', params.category)
			// Если category содержит запятую, это множественные значения
			if (params.category.includes(',')) {
				const categories = params.category.split(',').filter(Boolean)
				categories.forEach((category, index) => {
					searchParams.append(
						`filters[$or][${index}][rootCategoryName][$eq]`,
						category.trim()
					)
				})
			} else {
				// Одна категория
				const categoryValue = params.category.trim()
				console.log('🔍 [Filter] Filtering by rootCategoryName:', categoryValue)
				searchParams.append('filters[rootCategoryName][$eq]', categoryValue)
			}
		}

		// Brand filter - поддерживаем множественные значения
		if (params.brand) {
			// Если brand содержит запятую, это множественные значения
			if (params.brand.includes(',')) {
				const brands = params.brand.split(',').filter(Boolean)
				brands.forEach((brand, index) => {
					searchParams.append(
						`filters[$or][${index}][brand][$eq]`,
						brand.trim()
					)
				})
			} else {
				// Один бренд (пока brand может быть в другой структуре данных)
				searchParams.append('filters[brand][$eq]', params.brand)
			}
		}

		// Price range
		if (params.minPrice !== undefined) {
			searchParams.append('filters[price][$gte]', params.minPrice.toString())
		}

		if (params.maxPrice !== undefined) {
			searchParams.append('filters[price][$lte]', params.maxPrice.toString())
		}

		try {
			const url = `${API_URL}/api/products?${searchParams}`

			// Log URL for debugging
			if (params.search || params.category) {
				console.log(`🌐 [API] Request:`, url)
			}

			const response = await fetch(url)

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`)
			}

			const data: ApiResponse<ApiProduct[]> | ApiErrorResponse =
				await response.json()

			// Logging for debugging
			if (params.search || params.category) {
				const queryType = params.search
					? 'Search'
					: params.category
						? 'Filter'
						: ''
				console.log(
					`🔍 [${queryType}] ${params.search || params.category} → ${data.success ? data.data.length : 0} results`
				)

				// Show first few results to debug
				if (data.success && data.data.length > 0) {
					console.log(
						`📋 [${queryType}] First 3 results:`,
						data.data.slice(0, 3).map((item) => ({
							name: item.name,
							category: item.categoryName,
							rootCategory: item.rootCategoryName,
							article: item.sbisNomNumber,
						}))
					)
				} else if (data.success && params.category) {
					console.warn(
						'⚠️ [Filter] No products found. Check if rootCategoryName matches:',
						params.category
					)
					// Проверим, какие rootCategoryName есть в базе (просто для отладки)
					console.log(
						'💡 [Filter] Tip: Check products rootCategoryName field in database'
					)
				}
			}

			if (!data.success) {
				throw new Error(data.message || data.error)
			}

			const products = data.data.map(transformApiProduct)
			const pagination = data.meta?.pagination

			return {
				products,
				total: pagination?.total || products.length,
				page: pagination?.page || Math.floor(start / limit) + 1,
				pageSize: pagination?.pageSize || limit,
				pageCount:
					pagination?.pageCount ||
					Math.ceil((pagination?.total || products.length) / limit),
			}
		} catch (error) {
			console.error('Error fetching products:', error)
			throw error
		}
	},

	async getProduct(id: string): Promise<Product> {
		try {
			const response = await fetch(
				`${API_URL}/api/products/${encodeURIComponent(id)}`
			)

			if (!response.ok) {
				if (response.status === 404) {
					throw new Error('Product not found')
				}
				throw new Error(`API error: ${response.status}`)
			}

			const data: ApiResponse<ApiProduct> | ApiErrorResponse =
				await response.json()

			if (!data.success) {
				if (
					data.message?.includes('not found') ||
					data.error?.includes('not found')
				) {
					throw new Error('Product not found')
				}
				throw new Error(data.message || data.error || 'Failed to fetch product')
			}

			if (!data.data) {
				throw new Error('Product data is empty')
			}

			return transformApiProduct(data.data)
		} catch (error) {
			const err = error as Error
			console.error('Error fetching product:', err.message)
			// Пробрасываем ошибку дальше для обработки в компоненте
			throw err
		}
	},

	async getSearchSuggestions(query: string): Promise<SearchSuggestion[]> {
		const trimmedQuery = query.trim()
		if (!trimmedQuery) {
			return []
		}

		const searchParams = new URLSearchParams()
		searchParams.append('start', '0')
		searchParams.append('limit', '5')

		// Request only lightweight fields
		searchParams.append('fields[0]', 'name')
		searchParams.append('fields[1]', 'article')
		searchParams.append('fields[2]', 'sbisNomNumber')
		searchParams.append('fields[3]', 'categoryName')
		searchParams.append('fields[4]', 'rootCategoryName')

		searchParams.append(
			'filters[$or][0][name][$containsi]',
			trimmedQuery
		)
		searchParams.append(
			'filters[$or][1][description][$containsi]',
			trimmedQuery
		)
		searchParams.append(
			'filters[$or][2][sbisNomNumber][$containsi]',
			trimmedQuery
		)
		searchParams.append(
			'filters[$or][3][categoryName][$containsi]',
			trimmedQuery
		)

		try {
			const url = `${API_URL}/api/products?${searchParams.toString()}`
			const response = await fetch(url)

			if (!response.ok) {
				throw new Error(`API error: ${response.status}`)
			}

			const data: ApiResponse<ApiProduct[]> | ApiErrorResponse =
				await response.json()

			if (!data.success || !Array.isArray(data.data)) {
				throw new Error(data.message || data.error || 'Failed to fetch suggestions')
			}

			return data.data.map((item) => ({
				id: item.id.toString(),
				name: item.name || item.description || trimmedQuery,
				article: item.article || item.sbisNomNumber || null,
				category: item.categoryName || item.rootCategoryName || null,
			}))
		} catch (error) {
			console.error('Error fetching search suggestions:', error)
			throw error
		}
	},
}
