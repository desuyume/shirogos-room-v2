import { useDeleteAward } from '@/api/useDeleteAward'
import { AwardType } from '@/types/award.interface'
import { FC } from 'react'

interface IAwardItem {
	sectionType: AwardType
	awardId: number
	cost: number
	title: string
	typeTitle: string
	img: string
}

const AwardItem: FC<IAwardItem> = ({
	sectionType,
	awardId,
	cost,
	title,
	typeTitle,
	img,
}) => {
	const { mutate: deleteAward } = useDeleteAward(awardId)

	return (
		<div className='flex justify-center items-center h-[5.5rem] ml-[10.69rem]'>
			{sectionType === AwardType.BOUTIQUE ? (
				<div className='w-[9.9375rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
					<p className='text-[#FFF] text-xl'>{cost}</p>
				</div>
			) : (
				<></>
			)}
			<div className='w-[19.1875rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
				<p className='text-[#FFF] text-xl'>{title}</p>
			</div>
			<div className='w-[27.625rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
				<p className='text-[#FFF] text-xl'>{typeTitle}</p>
			</div>
			<div className='w-[18.125rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem] relative'>
				<img
					className='h-[5.0625rem] mx-auto'
					src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
					alt='award-img'
				/>
			</div>
			<button
				onClick={() => deleteAward()}
				className='bg-tertiary w-[9.75rem] h-[3.5rem] text-xl text-[#FFF] hover:bg-opacity-90 transition-all'
			>
				Удалить
			</button>
		</div>
	)
}

export default AwardItem
