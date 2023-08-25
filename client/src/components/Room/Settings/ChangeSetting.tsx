import { FC } from 'react'

interface IChangeSetting {
	type: string
	initialValue: string
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const ChangeSetting: FC<IChangeSetting> = ({
	type,
	initialValue,
	value,
	setValue,
}) => {
	return (
		<div className='h-[7.75rem] flex justify-between items-center border-b-[1px] border-[#646464]'>
			<div className='flex flex-1 flex-col justify-center items-center'>
				<h3 className='text-[1.875rem] leading-[97.795%] text-[#FFF] mb-5'>
					{type === 'nickname' ? 'Никнейм' : 'День рождения'}
				</h3>
				<input
					className='outline-none bg-transparent w-[11.6875rem] border-b-[0.1875rem] pb-3 border-primary text-center text-[#FFF]'
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
			<button disabled={initialValue === value} className='w-[8rem] h-[85%] bg-primary hover:bg-primaryHover transition-all text-primaryText text-[0.9375rem] mr-[2.73rem] disabled:bg-secondaryHover'>
				Сохранить
			</button>
		</div>
	)
}

export default ChangeSetting
