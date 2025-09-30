import { DropDownButton } from '@/shared/ui/DropDownButton'
import Image from 'next/image'

export default function Home() {
	return (
		<main>
			<nav className="px-10 py-5 flex">
				<Image src="/logo.svg" width={40} height={40} alt="логотип профспорт" />
				<DropDownButton />
			</nav>
		</main>
	)
}
