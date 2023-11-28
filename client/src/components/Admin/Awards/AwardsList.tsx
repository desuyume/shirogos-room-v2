import { FC } from 'react'
import AwardItem from './AwardItem'
import AddAward from './AddAward'
import { Scrollbar } from 'react-scrollbars-custom'
import { AwardType, IAward, IAwardType } from '@/types/award.interface'

interface IAwardsList {
	isActive: boolean
	awards: IAward[]
	type: AwardType
	awardTypes: IAwardType[]
}

const AwardsList: FC<IAwardsList> = ({
	isActive,
	awards,
	type,
	awardTypes,
}) => {
	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') + ' mt-[1.29rem] transition-all'
			}
		>
			<div className='flex justify-center h-[3.63rem]'>
				{type === AwardType.BOUTIQUE ? (
					<div className='w-[9.9375rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
						<p className='text-[#FFF] text-xl'>Цена, до</p>
					</div>
				) : (
					<></>
				)}
				<div className='w-[19.1875rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
					<p className='text-[#FFF] text-xl'>Название</p>
				</div>
				<div className='w-[27.625rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
					<p className='text-[#FFF] text-xl'>Тип награды</p>
				</div>
				<div className='w-[18.125rem] h-full bg-tertiary flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Файл</p>
				</div>
			</div>
			<Scrollbar noDefaultStyles style={{ height: '33rem' }}>
				<div>
					{awards.map(award => (
						<AwardItem
							key={award.id}
							sectionType={type}
							awardId={award.id}
							cost={award.cost}
							img={award.award_img}
							title={award.title}
							typeTitle={award.awardType.title}
						/>
					))}
				</div>
			</Scrollbar>
			<AddAward sectionType={type} awardTypes={awardTypes} />
		</div>
	)
}

export default AwardsList
