import { FC } from 'react'

interface IChangeGender {
	gender: string
	setGender: React.Dispatch<React.SetStateAction<string>>
}

const ChangeGender: FC<IChangeGender> = ({ gender, setGender }) => {
	return (
		<div className='h-[7.75rem] border-b-[1px] border-[#646464] flex flex-col justify-center items-center'>
			<h3 className='text-[#FFF] text-[1.875rem] leading-[97.795%] mb-1'>
				Пол
			</h3>
			<div className='flex justify-around w-full'>
				<button
					onClick={() => setGender('male')}
					disabled={gender === 'male'}
					className='w-[20.8%] h-[2.4375rem] bg-transparent hover:bg-secondaryHover text-[#FFF] text-xl disabled:bg-primary transition-all'
				>
					Мужской
				</button>
				<button
					onClick={() => setGender('female')}
					disabled={gender === 'female'}
					className='w-[20.8%] h-[2.4375rem] bg-transparent hover:bg-secondaryHover text-[#FFF] text-xl disabled:bg-primary transition-all'
				>
					Женский
				</button>
			</div>
		</div>
	)
}

export default ChangeGender
