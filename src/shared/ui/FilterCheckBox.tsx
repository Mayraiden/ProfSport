'use client'

import { CheckIcon } from '@phosphor-icons/react/ssr'

type IFilterCheckboxProps = {
	id: string
	label: string
	options: Array<{ value: string; label: string }>
	value: string[]
	onChange: (value: string[]) => void
}

export const IFilterCheckbox = ({
	options,
	value,
	onChange,
}: IFilterCheckboxProps) => {
	const handleOptionChange = (optionValue: string) => {
		const newValue = value.includes(optionValue)
			? value.filter((v) => v !== optionValue)
			: [...value, optionValue]
		onChange(newValue)
	}

	return (
		<div className="space-y-3">
			<div className="space-y-2">
				{options.map((option) => (
					<label
						key={option.value}
						className="flex items-center space-x-3 cursor-pointer"
					>
						<div className="relative flex justify-center items-center">
							<input
								type="checkbox"
								checked={value.includes(option.value)}
								onChange={() => handleOptionChange(option.value)}
								className="custom-checkbox"
							/>
							{value.includes(option.value) && (
								<CheckIcon
									size={12}
									className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none"
								/>
							)}
						</div>
						<span className="text-sm text-gray-700 flex-1">{option.label}</span>
					</label>
				))}
			</div>
		</div>
	)
}
