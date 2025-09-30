import { MagnifyingGlassIcon } from '@phosphor-icons/react/ssr'

type ISearchProps = {
	type: 'text'
	className: string
	placeholder?: string
}
export const SearchForm = ({ ...props }: ISearchProps) => {
	return (
		<>
			<div className="w-[54%] h-full relative">
				<input
					type={props.type}
					placeholder={props.placeholder}
					className={props.className}
				/>
				<MagnifyingGlassIcon
					className="absolute right-2 bottom-2.5"
					size={20}
				/>
			</div>
		</>
	)
}
