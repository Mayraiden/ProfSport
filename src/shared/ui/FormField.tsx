'use client'

import { ReactNode } from 'react'
import { IInput } from './IInput'
import { ErrorMessage } from './ErrorMessage'

interface FormFieldProps {
	label: string
	error?: string
	children: ReactNode
	className?: string
}

export const FormField = ({
	label,
	error,
	children,
	className = '',
}: FormFieldProps) => {
	return (
		<div className={`relative h-13 bg-[#F0F4F8] rounded-md ${className}`}>
			<label className="absolute top-2 left-3 text-xs text-[#A0A4A8] font-normal">
				{label}
			</label>
			<div className="absolute top-2 left-0 right-3">{children}</div>
			<ErrorMessage message={error} className="absolute top-12 left-3" />
		</div>
	)
}
