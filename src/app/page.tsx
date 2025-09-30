import { Header } from '@/widgets/Header/Header'
import { Hero } from '@/widgets/Hero/Hero'
import { Hits } from '@/widgets/Hits/Hits'
import { Popular } from '@/widgets/Popular/Popular'

export default function Home() {
	return (
		<main className="w-screen overflow-x-hidden">
			<Header />
			<Hero />
			<Popular />
			<Hits />
		</main>
	)
}
