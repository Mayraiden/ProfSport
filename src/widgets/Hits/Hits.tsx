'use client'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'

import { ItemCard } from '@/shared/ui/ItemCard'

export const Hits = () => {
	return (
		<section className="w-full h-[90vh] pt-15">
			<h3 className="text-3xl font-bold mb-4">Хиты продаж</h3>
			<div className="w-full h-fit py-4">
				<Swiper
					modules={[Navigation]}
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
		</section>
	)
}
