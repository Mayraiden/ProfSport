import { ICatalogModalColumn } from '@/shared/ui/ICatalogModalColumn'
import Link from 'next/link'

type ICatalogModalProps = {
	isOpen: boolean
	onClose: () => void
}

export const CatalogModal = ({ isOpen, onClose }: ICatalogModalProps) => {
	if (!isOpen) return null

	return (
		<>
			{/* Overlay для закрытия по клику вне модала */}
			<div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

			<aside className="absolute left-0 top-20 w-screen min-h-3/4 p-5 flex flex-col justify-between bg-white shadow-lg z-50">
				<div className="h-full grid grid-cols-6 border border-gray/20">
					<ICatalogModalColumn />
					<ICatalogModalColumn />
					<ICatalogModalColumn />
					<ICatalogModalColumn />
				</div>
				<div>
					<Link href={'/catalog'}>смотреть все товары</Link>
					<button>смотреть выбранное</button>
				</div>
			</aside>
		</>
	)
}
