import type { OrderEntity, PaymentEntity } from '../model/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

interface ApiResponse<T> {
	success: boolean
	data?: T
	message?: string
	error?: string
}

const mapOrder = (raw: any): OrderEntity => {
	const itemsArray = Array.isArray(raw.items) ? raw.items : []

	return {
		id: raw.id,
		orderNumber: raw.orderNumber,
		status: raw.status,
		totalAmount: Number(raw.totalAmount || 0),
		deliveryType: raw.deliveryType,
		cdekDeliveryCost: raw.cdekDeliveryCost
			? Number(raw.cdekDeliveryCost)
			: null,
		paymentMethod: raw.paymentMethod,
		paymentProvider: raw.paymentProvider || null,
		notes: raw.notes || null,
		shippingAddress: raw.shippingAddress,
		items: itemsArray.map((item: any) => {
			const price = Number(item.price ?? item.productPrice ?? 0)
			const quantity = Number(item.quantity ?? 0)
			const subtotal =
				item.subtotal !== undefined
					? Number(item.subtotal)
					: price * quantity
			return {
				productId: Number(item.productId || item.product_id || 0),
				name: item.name || item.title || `Товар ${item.productId}`,
				article: item.article || null,
				quantity,
				price,
				subtotal,
				image: item.image || item.thumbnail || null,
			}
		}),
		createdAt: raw.createdAt,
		updatedAt: raw.updatedAt,
	}
}

const mapPayment = (raw: any): PaymentEntity => ({
	id: raw.id,
	status: raw.status,
	amount: Number(raw.amount || 0),
	currency: raw.currency || 'RUB',
	paymentMethod: raw.paymentMethod,
	provider: raw.provider || null,
	paymentUrl: raw.paymentUrl || null,
	createdAt: raw.createdAt,
	updatedAt: raw.updatedAt,
})

export const ordersApi = {
	async getOrders(token: string): Promise<OrderEntity[]> {
		const response = await fetch(`${API_URL}/api/orders`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error(`Не удалось получить список заказов: ${response.status}`)
		}

		const data: ApiResponse<OrderEntity[]> = await response.json()
		if (!data.success || !data.data) {
			throw new Error(data.message || data.error || 'Не удалось получить заказы')
		}

		return data.data.map(mapOrder)
	},

	async getOrderById(orderId: number, token: string): Promise<OrderEntity> {
		const response = await fetch(`${API_URL}/api/orders/${orderId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (!response.ok) {
			throw new Error(`Не удалось получить заказ #${orderId}`)
		}

		const data: ApiResponse<OrderEntity> = await response.json()
		if (!data.success || !data.data) {
			throw new Error(data.message || data.error || 'Не удалось получить заказ')
		}

		return mapOrder(data.data)
	},

	async getPaymentsForOrder(orderId: number, token: string): Promise<PaymentEntity[]> {
		const response = await fetch(
			`${API_URL}/api/payments?orderId=${orderId}`,
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		if (!response.ok) {
			throw new Error('Не удалось получить платежи заказа')
		}

		const data: ApiResponse<PaymentEntity[]> = await response.json()
		if (!data.success || !data.data) {
			return []
		}

		return data.data.map(mapPayment)
	},
}


