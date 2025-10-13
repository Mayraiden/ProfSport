import Link from 'next/link'

import {
	UserCircleIcon,
	HeartIcon,
	ShoppingBagIcon,
	ClockClockwiseIcon,
} from '@phosphor-icons/react/dist/ssr'

export const IProfileSideBar = () => {
	return (
		<aside className="w-70 h-full bg-white">
			<nav className="w-full h-full pt-5 px-3">
				<ul className="w-full flex flex-col gap-3">
					<li className="w-full">
						<Link
							className="px-1 py-1 flex items-center gap-2 rounded-md hover:bg-gray/20 transition"
							href={'/profile'}
						>
							<UserCircleIcon size={20} />
							<span>Профиль</span>
						</Link>
					</li>
					<li>
						<Link
							className="px-1 py-1 flex items-center gap-2 rounded-md hover:bg-gray/20 transition"
							href={'/profile'}
						>
							<HeartIcon size={20} />
							<span>Избранное</span>
						</Link>
					</li>
					<li>
						<Link
							className="px-1 py-1 flex items-center gap-2 rounded-md hover:bg-gray/20 transition"
							href={'/profile'}
						>
							<ShoppingBagIcon size={20} />
							<span>Корзина</span>
						</Link>
					</li>
					<li>
						<Link
							className="px-1 py-1 flex items-center gap-2 rounded-md hover:bg-gray/20 transition"
							href={'/profile'}
						>
							<ClockClockwiseIcon size={20} />
							<span>История заказов</span>
						</Link>
					</li>
				</ul>
			</nav>
		</aside>
	)
}
