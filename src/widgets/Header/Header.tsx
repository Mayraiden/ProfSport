import Image from 'next/image'
import Link from 'next/link'

import { DropDownButton } from '@/shared/ui/DropDownButton'
import { SearchForm } from '@/shared/ui/SearchFrorm'

import {
	HeartStraightIcon,
	ShoppingBagIcon,
	UserIcon,
} from '@phosphor-icons/react/ssr'

export const Header = () => {
	return (
		<nav className="h-20 w-full mx-auto px-10 py-5 flex gap-5 items-center">
			<Link href="/" className="h-10 flex gap-2">
				<Image src="/logo.svg" width={40} height={40} alt="логотип профспорт" />
				<span className="text-4xl font-bold">ПРОФСПОРТ</span>
			</Link>

			<DropDownButton />
			<SearchForm
				type="text"
				placeholder="Найти"
				className="w-full h-full px-2 bg-gray/20 rounded-sm outline-none focus:bg-gray/30"
			/>
			<Link
				href="/favorites"
				className="w-10 h-10 flex items-center justify-center bg-gray/20 hover:bg-gray/30 transition-colors duration-200"
			>
				<HeartStraightIcon size={20} weight="fill" />
			</Link>
			<Link
				href="/cart"
				className="w-10 h-10 flex items-center justify-center bg-gray/20 hover:bg-gray/30 transition-colors duration-200"
			>
				<ShoppingBagIcon size={20} weight="fill" />
			</Link>
			<Link
				href="/profile"
				className="w-10 h-10 flex items-center justify-center bg-gray/20 rounded-full hover:bg-gray/30 transition-colors duration-200"
			>
				<UserIcon size={20} weight="fill" />
			</Link>
		</nav>
	)
}
