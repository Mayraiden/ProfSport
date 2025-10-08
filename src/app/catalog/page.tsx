import { CatalogFeed } from '@/widgets/CatalogFeed/CatalogFeed'
import { Footer } from '@/widgets/Footer/Footer'
import { Header } from '@/widgets/Header/Header'

export default function Catalog() {
	return (
		<>
			<Header />
			<CatalogFeed />
			<Footer />
		</>
	)
}
