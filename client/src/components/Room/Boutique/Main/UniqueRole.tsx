import { FC } from 'react'
import adjectiveImg from '@/assets/room/adjective.png'
import nounImg from '@/assets/room/noun.png'

interface IUniqueRole {
	visibleRole: string
	type: string
	title: string
	cost: number
}

const UniqueRole: FC<IUniqueRole> = ({ visibleRole, type, title, cost }) => {
	return (
		<div className={(visibleRole === type ? 'visible opacity-100 ': 'invisible opacity-0 ') + 'w-[34rem] h-full z-10 flex justify-center absolute fullhd:relative fullhd:visible fullhd:opacity-100 transition-all'}>
			<div className='w-0 h-0 border-[17rem] border-transparent border-t-0 border-b-[27.5rem] border-b-tertiary absolute bottom-0 -z-10 hidden medium-tablet:block' />
			<img
				className='absolute top-[1.96rem] -left-[3.5rem] pointer-events-none hidden medium-tablet:block'
				src={type === 'adjective' ? adjectiveImg : nounImg}
				alt='role-img'
			/>
			<div className='w-[14.78369rem] flex flex-col items-center'>
				<div className='flex flex-col items-center mb-[1.66rem] mt-[3.25rem]'>
					<p className='text-primaryText text-[0.9375rem] leading-[97.795%]'>
						{type === 'adjective' ? 'ПРИЛАГАТЕЛЬНОЕ' : 'СУЩЕСТВИТЕЛЬНОЕ'}
					</p>
					<p className='text-primaryText text-[2.8125rem] leading-[97.795%]'>
						ДНЯ
					</p>
				</div>
				<div className='w-[14.78369rem] h-[4.44775rem] flex flex-col items-center justify-center bg-secondaryHover rounded-[1.5625rem] mb-11'>
					<p className='text-primaryText text-[1.5625rem] leading-[97.795%]'>
						{title}
					</p>
					<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%]'>
						{cost} ДО
					</p>
				</div>
				<button className='bg-primary hover:bg-primaryHover transition-all w-[6.32rem] h-[2.75rem] text-primaryText text-xl rounded-br-[1.2rem] self-end'>
					Купить
				</button>
			</div>
		</div>
	)
}

export default UniqueRole
