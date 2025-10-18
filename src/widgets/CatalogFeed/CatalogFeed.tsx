import { ItemCard } from '@/shared/ui/ItemCard'
import { Filters } from '../Filters/Filters'

export const CatalogFeed = () => {
	return (
		<section className="w-screen pt-13 px-15 pb-5 bg-light-blue">
			<div className="flex gap-4">
				<Filters />
				<div className="flex-1 flex flex-col gap-5">
					<h2 className="text-2xl font-bold text-black">Каталог</h2>
					<div className="w-full min-h-10 px-5 flex items-center gap-2 rounded-md bg-white">
						<p>Сортировка по:</p>
						<select
							name="sort"
							id="sort-select"
							className="text-blue focus:outline-none focus:border-transparent"
						>
							<option value="популярности">популярности</option>
							<option value="дешевле">дешевле</option>
							<option value="дороже">дороже</option>
						</select>
					</div>
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
