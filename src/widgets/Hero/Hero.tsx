import Link from 'next/link'

export const Hero = () => {
	return (
		<section>
			<div className='w-full h-[87vh] pt-42 bg-[url("/heroImage.jpg")] bg-center bg-cover'>
				<div className="max-w-[1040px] min-h-89 mx-auto pl-12 flex flex-col gap-4 items-center justify-between">
					<div className="self-start">
						<h1 className="text-7xl text-[#F5F5F5] font-bold  select-none">
							ТВОЙ СПОРТ
						</h1>
						<h1 className="pl-10 text-7xl text-gold font-bold  select-none">
							ТВОИ ПРАВИЛА
						</h1>
					</div>
					<div className="self-start">
						<p className="pl-42 text-[28px] text-[#F5F5F5] self-start select-none">
							Премиальное спортивное снаряжение и одежда <br />
						</p>
						<p className="pl-56 text-[28px] text-[#F5F5F5] self-start select-none">
							для чемпионов, кто не согласен на меньшее
						</p>
					</div>
					<Link
						href="/catalog"
						className="w-65 h-15 text-base flex items-center justify-center rounded-sm bg-gold self-end hover:opacity-90 transition-opacity duration-200"
					>
						Перейти в каталог
					</Link>
				</div>
			</div>
		</section>
	)
}
