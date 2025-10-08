import { ItemCard } from '@/shared/ui/ItemCard'
import { Filters } from '../Filters/Filters'

export const CatalogFeed = () => {
	return (
		<section className="w-screen px-20 bg-light-blue">
			<div className="flex gap-8">
				<Filters />
				<div className="flex-1 flex flex-col">
					<h2 className="text-2xl font-bold text-black">Каталог</h2>
					<div className="grid grid-cols-4 gap-4">
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
						<ItemCard />
					</div>
				</div>
			</div>
		</section>
	)
}
