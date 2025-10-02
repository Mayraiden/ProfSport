export type IBuyButtonProps = {
	type: 'button' | 'submit'
	text: string
	disabled?: boolean
	loading?: boolean
	className?: string
	onClick?: () => void
}
