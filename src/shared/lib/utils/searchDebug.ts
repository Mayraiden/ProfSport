// Utility functions for debugging Meilisearch integration

export const checkMeilisearchStatus = async (
	baseUrl: string = 'http://localhost:1337'
) => {
	try {
		// Check if Meilisearch is available through Strapi
		const response = await fetch(
			`${baseUrl}/api/products?meilisearch=true&q=test&limit=1`
		)

		if (response.ok) {
			const data = await response.json()
			console.log('✅ [Meilisearch] Status check successful:', {
				status: 'available',
				responseTime: Date.now(),
				dataReceived: data.success && data.data ? data.data.length : 0,
			})
			return { available: true, data }
		} else {
			console.warn('⚠️ [Meilisearch] Status check failed:', response.status)
			return { available: false, error: response.status }
		}
	} catch (error) {
		console.error('❌ [Meilisearch] Status check error:', error)
		return { available: false, error }
	}
}

// Test Meilisearch with different queries
export const testMeilisearchQueries = async (
	baseUrl: string = 'http://localhost:1337'
) => {
	const testQueries = [
		'ball', // English word
		'сумка', // Russian word
		'X7174593', // Article number
		'TeamMate', // Brand name
		'bag', // English word that should match
	]

	console.log('🧪 [Meilisearch] Testing different queries...')

	for (const query of testQueries) {
		try {
			const response = await fetch(
				`${baseUrl}/api/products?meilisearch=true&q=${encodeURIComponent(query)}&limit=3`
			)

			if (response.ok) {
				const data = await response.json()
				console.log(`🔍 [Meilisearch] Query "${query}":`, {
					resultsCount: data.success ? data.data.length : 0,
					firstResult:
						data.success && data.data.length > 0
							? {
									name: data.data[0].name,
									category: data.data[0].categoryName,
								}
							: null,
				})
			} else {
				console.error(
					`❌ [Meilisearch] Query "${query}" failed:`,
					response.status
				)
			}
		} catch (error) {
			console.error(`❌ [Meilisearch] Query "${query}" error:`, error)
		}
	}
}

export const logSearchRequest = (
	query: string,
	params: Record<string, any>
) => {
	console.group('🔍 [Search Request]')
	console.log('Query:', query)
	console.log('Parameters:', params)
	console.log('Timestamp:', new Date().toISOString())
	console.groupEnd()
}

export const logSearchResponse = (
	query: string,
	response: any,
	duration: number
) => {
	console.group('📊 [Search Response]')
	console.log('Query:', query)
	console.log('Duration:', `${duration}ms`)
	console.log('Results count:', response?.data?.length || 0)
	console.log('Response:', response)
	console.groupEnd()
}
