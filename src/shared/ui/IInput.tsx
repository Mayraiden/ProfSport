type IInputProps = {
	value?: string
	placeholder?: string
	type?: 'text' | 'password' | 'email'
	disabled?: boolean
	className?: string
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & React.InputHTMLAttributes<HTMLInputElement>

export const IInput = ({
	value,
	placeholder,
	type = 'text',
	disabled = false,
	className = '',
	onChange,
	...props
}: IInputProps) => {
	return (
		<input
			className={`w-115 h-14 p-3 bg-gray/20 outline-none rounded-md border border-transparent focus:border-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
			type={type}
			disabled={disabled}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			{...props}
		/>
	)
}
