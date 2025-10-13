import { IProfileSideBar } from '@/shared/ui/IProfileSideBar'
import { Footer } from '@/widgets/Footer/Footer'
import { Header } from '@/widgets/Header/Header'
import { ProfileInfo } from '@/widgets/ProfileInfo/ProfileInfo'

export default function Profile() {
	return (
		<section className="w-screen h-screen bg-light-blue">
			<Header />
			<div className="w-full h-full py-10 px-20 flex gap-5">
				<IProfileSideBar />
				<ProfileInfo />
			</div>
			<Footer />
		</section>
	)
}
