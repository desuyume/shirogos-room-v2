import { AwardType } from '@/types/achievements.interface'
import { FC } from 'react'

interface IExperienceAward {
	selectedAwardType: AwardType | null
	exp: string
	setExp: React.Dispatch<React.SetStateAction<string>>
	isNew: boolean
}

const ExperienceAward: FC<IExperienceAward> = ({
	selectedAwardType,
	exp,
	setExp,
	isNew,
}) => {
	return (
		<div
			className={
				(selectedAwardType === 'experience' ? 'block ' : 'hidden ') +
				'w-full flex-1 flex flex-col justify-center items-center transition-all relative px-5'
			}
		>
			{isNew ? (
				<input
					value={exp}
					onChange={e => setExp(e.target.value)}
					className='bg-transparent border-b-[1px] border-b-primary w-full outline-none h-8 text-[#FFF] font-secondary text-center text-xl'
				/>
			) : (
				<p className='bg-transparent border-b-[1px] border-b-primary w-full outline-none h-8 text-[#FFF] font-secondary text-center text-xl'>
					{exp}
				</p>
			)}
		</div>
	)
}

export default ExperienceAward
