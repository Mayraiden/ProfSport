import type { Metadata } from 'next'
import '../styles/globals.css'
import { QueryProvider } from './providers/QueryProvider'
import { AuthModalProvider } from '@/shared/lib/contexts/AuthModalContext'
import { SearchProvider } from '@/shared/lib/contexts/SearchContext'
import { AuthModalWrapper } from '@/shared/ui/AuthModalWrapper'

export const metadata: Metadata = {
	title: 'ProSport',
	description: 'твой профспорт',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<QueryProvider>
					<AuthModalProvider>
						<SearchProvider>
							{children}
							<AuthModalWrapper />
						</SearchProvider>
					</AuthModalProvider>
				</QueryProvider>
			</body>
		</html>
	)
}
