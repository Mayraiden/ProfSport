import { ItemCard } from '@/shared/ui/ItemCard'

export const Favorites = () => {
	const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

	return (
		<section className="flex flex-col gap-5">
			<h1 className="text-2xl font-bold text-black">Избранное</h1>

			<div className="grid grid-cols-4 gap-3">
				{tempArr.map((item, index) => {
					return <ItemCard key={index} />
				})}
			</div>
		</section>
	)
}
