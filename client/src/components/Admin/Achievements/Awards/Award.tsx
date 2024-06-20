import { useUniqueBackgrounds } from '@/api/useUniqueBackgrounds'
import { useUniqueBadges } from '@/api/useUniqueBadges'
import { useUniqueFrames } from '@/api/useUniqueFrames'
import { useUniquePanopticons } from '@/api/useUniquePanopticons'
import { AwardType } from '@/types/achievements.interface'
import { FC } from 'react'

interface IAward {
	selectedAwardType: AwardType | null
	awardType: AwardType
	award: number | null
	setAward: React.Dispatch<React.SetStateAction<number | null>>
	isNew: boolean
}

const Award: FC<IAward> = ({
	selectedAwardType,
	awardType,
	award,
	setAward,
	isNew,
}) => {
	let query, items, isLoading, isError

	if (awardType === 'badge') {
		query = useUniqueBadges()
		items = query.data
		isLoading = query.isLoading
		isError = query.isError
	} else if (awardType === 'frame') {
		query = useUniqueFrames()
		items = query.data
		isLoading = query.isLoading
		isError = query.isError
	} else if (awardType === 'background') {
		query = useUniqueBackgrounds()
		items = query.data
		isLoading = query.isLoading
		isError = query.isError
	} else if (awardType === 'panopticon') {
		query = useUniquePanopticons()
		items = query.data
		isLoading = query.isLoading
		isError = query.isError
	} else return <></>

	return (
		<div
			className={
				(selectedAwardType === awardType ? 'block ' : 'hidden ') +
				'w-full flex-1 flex flex-col items-center transition-all overflow-y-auto relative ' + (!isNew ? 'flex-row justify-center' : '')
			}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-[#FFF]'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-[#FFF]'>Ошибка</p>
				</div>
			) : items && !items.length ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p>Нет данных</p>
				</div>
			) : isNew ? (
				items?.map(item => (
					<button
						key={item.id}
						onClick={() =>
							award === item.id ? setAward(null) : setAward(item.id)
						}
						disabled={!isNew}
						className={
							'w-full  px-4 flex justify-between items-center py-4 transition-all ' +
							(award === item.id ? 'bg-secondary' : 'bg-tertiary') +
							(isNew ? ' cursor-pointer hover:bg-secondary' : 'cursor-default')
						}
					>
						<div className='min-w-[50%] max-w-[50%] max-h-[80%] flex justify-center items-center mr-2'>
							<img
								className='max-h-12'
								src={`${import.meta.env.VITE_SERVER_URL}/${item.img}`}
							/>
						</div>
						<p className='text-[#FFF] text-xs text-center flex-1 overflow-y-auto max-h-12'>
							{item.title}
						</p>
					</button>
				))
			) : (
				items
					?.filter(item => item.id === award)
					.map(item => (
						<button
							key={item.id}
							onClick={() =>
								award === item.id ? setAward(null) : setAward(item.id)
							}
							disabled={!isNew}
							className={
								'w-full  px-4 flex justify-between items-center py-4 transition-all ' +
								(award === item.id ? 'bg-secondary' : 'bg-tertiary') +
								(isNew
									? ' cursor-pointer hover:bg-secondary'
									: 'cursor-default')
							}
						>
							<div className='min-w-[50%] max-w-[50%] max-h-[80%] flex justify-center items-center mr-2'>
								<img
									className='max-h-12'
									src={`${import.meta.env.VITE_SERVER_URL}/${item.img}`}
								/>
							</div>
							<p className='text-[#FFF] text-xs text-center flex-1 overflow-y-auto max-h-12'>
								{item.title}
							</p>
						</button>
					))
			)}
		</div>
	)
}

export default Award
