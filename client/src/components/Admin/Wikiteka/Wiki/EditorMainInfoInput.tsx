import { FC } from 'react'

interface IEditorMainInfoInput {
	state: any
	setState: React.Dispatch<React.SetStateAction<any>>
	type: string
	title: string
	setIsVisible?: React.Dispatch<React.SetStateAction<boolean>>
}

const EditorMainInfoInput: FC<IEditorMainInfoInput> = ({
	state,
	setState,
	type,
	title,
	setIsVisible,
}) => {
	return (
		<div className='h-[3.8125rem] flex'>
			<div className='w-[30rem] h-full flex justify-center items-center'>
				<p className='text-[#FFF] text-[1.5625rem] text-center'>{title}</p>
			</div>
			<div className='w-[36.25rem] h-full flex justify-center items-center'>
				{type === 'category' ? (
					<button
						onClick={() => setIsVisible?.(true)}
						className='w-full h-full text-[1.5625rem] text-center text-[#A3A3A3] outline-none bg-transparent placeholder:text-secondaryHover hover:bg-tertiary transition-all'
					>
						{!!state ? state.title : 'Выбрать'}
					</button>
				) : (
					<input
						value={state}
						onChange={e => setState(e.target.value)}
						placeholder={type}
						className='w-full h-full text-[1.5625rem] text-center text-[#A3A3A3] outline-none bg-transparent placeholder:text-secondaryHover'
					/>
				)}
			</div>
		</div>
	)
}

export default EditorMainInfoInput
