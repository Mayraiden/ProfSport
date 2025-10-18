import { ProfileLayout } from '@/app/layouts/ProfileLayout'

export default function Orders() {
	return (
		<ProfileLayout>
			<div className="flex flex-col gap-5 pt-2.5">
				{/* Заголовок страницы */}
				<div className="flex flex-col gap-5">
					<h1 className="text-2xl font-bold text-black leading-[0.875]">
						История заказов
					</h1>
				</div>

				{/* Пустое состояние истории заказов */}
				<div className="bg-white rounded-md p-5 flex flex-col items-center gap-5">
					<h2 className="text-xl font-bold text-black leading-[1.05]">
						У Вас пока нет заказов
					</h2>
					<p className="text-base text-black leading-[1.31] text-center">
						Перейдите в каталог, чтобы добавить товары в корзину.
					</p>
					<button
						className="flex items-center justify-center px-6 py-4 bg-[#7B1931] text-white rounded-md hover:bg-[#6a1529] transition-colors duration-200"
						style={{ width: '160px' }}
					>
						<span className="text-xs leading-[1.75]">Перейти в каталог</span>
					</button>
				</div>
			</div>
		</ProfileLayout>
	)
}
