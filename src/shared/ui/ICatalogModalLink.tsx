import Link from 'next/link'
import { CaretRightIcon } from '@phosphor-icons/react/ssr'

type ICatalogModalLinkProps = {
	text: string
	href: string
	className: string
}

export const ICatalogModalLink = ({
	text,
	href,
	className,
}: ICatalogModalLinkProps) => {
	return (
		<Link
			className={`w-45 h-7 p-2 flex justify-between items-center rounded-md ${className}`}
			href={href}
		>
			{text}
			<span>
				<CaretRightIcon />
			</span>
		</Link>
	)
}
