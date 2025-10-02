import type { IBuyButtonProps } from '../types'

export const BuyButton = ({ ...props }: IBuyButtonProps) => {
	return (
		<button
			className={props.className}
			type={props.type}
			onClick={props.onClick}
			disabled={props.disabled || props.loading}
		>
			{props.loading ? 'минутку..' : props.text}
		</button>
	)
}
