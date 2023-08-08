import { FC } from 'react'
import AwardItem from './AwardItem'
import AddAward from './AddAward'
import { Scrollbar } from 'react-scrollbars-custom'

interface IAwardsList {
	isActive: boolean
	type: string
}

const AwardsList: FC<IAwardsList> = ({ isActive, type }) => {
	const awards = [
		{ cost: 50, name: 'Кошачий кот', type: 'frame', img: '' },
		{ cost: 100, name: 'Кошачий кот', type: 'badge', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
		{ cost: 150, name: 'Кошачий кот', type: 'background', img: '' },
	]

	return (
		<div
			className={
				(isActive ? 'hidden' : 'block') + ' mt-[1.29rem] transition-all'
			}
		>
			<div className='flex justify-center h-[3.63rem]'>
				{type === 'boutique' ? (
					<></>
				) : (
					<div className='w-[9.9375rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
						<p className='text-[#FFF] text-xl'>Цена, до</p>
					</div>
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
			<Scrollbar noDefaultStyles style={{ height: '50.25rem' }}>
				<div>
					{awards.map(award => (
						<AwardItem
							key={award.name}
							sectionType={type}
							cost={award.cost}
							img={award.img}
							name={award.name}
							type={award.type}
						/>
					))}
				</div>
				<AddAward sectionType={type} />
			</Scrollbar>
		</div>
	)
}

export default AwardsList
