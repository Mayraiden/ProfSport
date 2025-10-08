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

	return (
		<section className="w-full pt-15 relative">
			<h3 className="pl-10 text-3xl font-bold mb-4">{title}</h3>
			<div className="w-full h-fit py-4">
				<Swiper
					onSwiper={setSwiperRef}
					spaceBetween={10}
					slidesPerView={5}
					loop={true}
					navigation
					style={{ overflow: 'visible' }}
				>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
					<SwiperSlide className="!w-auto">
						<ItemCard />
					</SwiperSlide>
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
