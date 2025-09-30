'use client'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export const Hits = () => {
	return (
		<section className="w-full h-[80vh] px-10 pt-15">
			<h3 className="text-3xl font-bold mb-4">Хиты продаж</h3>
			<Swiper
				modules={[Navigation]}
				spaceBetween={12}
				slidesPerView={5}
				loop={true}
				navigation
			>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div className="w-70 h-100 p-4 flex flex-col border-1 border-dotted">
						<h4 className="text-2xl font-bold mb-10">Я типа карточка</h4>
						<Image
							className="w-full h-40"
							src="/football.jpg"
							alt="картинка"
							width={100}
							height={150}
						></Image>
					</div>
				</SwiperSlide>
			</Swiper>
		</section>
	)
}
