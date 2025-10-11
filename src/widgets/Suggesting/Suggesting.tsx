'use client'
import { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react/ssr'

import { ItemCard } from '@/shared/ui/ItemCard'

type ISuggestingProps = {
	title: string
}

export const Suggesting = ({ title }: ISuggestingProps) => {
	const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null)
	const goToPrev = () => swiperRef?.slidePrev()
	const goToNext = () => swiperRef?.slideNext()

	const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
	const isLoop = items.length > 5

	return (
		<section className="w-full pt-15 relative">
			<h3 className="pl-20 text-3xl font-bold mb-4">{title}</h3>
			<div className="w-full h-fit py-4">
				<Swiper
					key={items.length}
					onSwiper={setSwiperRef}
					spaceBetween={12}
					slidesPerView={5}
					loop={isLoop}
					centeredSlides={false}
					loopAdditionalSlides={2}
					watchSlidesProgress
					navigation
					style={{
						overflow: 'visible',
						paddingLeft: '80px',
						paddingRight: '80px',
					}}
					breakpoints={{
						640: { slidesPerView: 2 },
						768: { slidesPerView: 3 },
						1024: { slidesPerView: 4 },
						1280: { slidesPerView: 5 },
						1440: { slidesPerView: 5 },
					}}
				>
					{items.map((_, index) => (
						<SwiperSlide key={index} className="max-w-59">
							<ItemCard />
						</SwiperSlide>
					))}
				</Swiper>
			</div>

			<button
				onClick={goToPrev}
				className="absolute right-30 top-20 -translate-y-1/2 bg-gray/20 text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-burgundy hover:text-white transition-colors duration-300"
			>
				<CaretLeftIcon size={30} />
			</button>
			<button
				onClick={goToNext}
				className="absolute right-15 top-20 -translate-y-1/2 bg-gray/20 text-black rounded-full w-10 h-10 flex items-center justify-center hover:bg-burgundy hover:text-white transition-colors duration-300"
			>
				<CaretRightIcon size={30} />
			</button>
		</section>
	)
}
