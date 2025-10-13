import Link from 'next/link'
import { ICatalogModalLink } from './ICatalogModalLink'

export const ICatalogModalColumn = () => {
	return (
		<div className="p-5 border-r-1 border-inherit">
			<h1 className="text-base font-bold">Виды спорта</h1>
			<ul>
				<li>
					<ICatalogModalLink
						href="/"
						text="Теннис"
						className="hover:bg-gray/20"
					/>
				</li>
			</ul>
		</div>
	)
}
