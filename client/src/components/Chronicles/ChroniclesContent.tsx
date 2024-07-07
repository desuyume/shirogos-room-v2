import { FC, useState } from 'react'
import ChroniclesList from './ChroniclesList'
import { chronicleMonths } from '@/consts/months'
import { useChronicle } from '@/api/useChronicle'
import { useChroniclesCount } from '@/api/useChroniclesCount'
import { cn } from '@/utils/cn'
import ChroniclesSwitchDateBttn from './ChroniclesSwitchDateBttn'

interface IChroniclesContent {
	isActive: boolean
}

const ChroniclesContent: FC<IChroniclesContent> = ({ isActive }) => {
	const [skip, setSkip] = useState<number>(0)
	const {
		data: count,
		isLoading: isCountLoading,
		isError: isCountError,
	} = useChroniclesCount()
	const { data: chronicle, isLoading, isError } = useChronicle(skip)

	const clickNext = () => {
		if (count && skip < count.count - 1) {
			setSkip(prev => prev + 1)
		}
	}

	const clickPrev = () => {
		if (skip > 0) {
			setSkip(prev => prev - 1)
		}
	}

	return (
		<div
			className={cn(
				'bg-tertiary bg-opacity-40 w-[13.1875rem] h-[15rem] mr-1 pt-5 pb-[0.6875rem] pl-[0.3125rem] pr-[0.9375rem] -mt-[0.8125rem] rounded-br-[0.8125rem] transition-all',
				{
					'visible opacity-100': isActive,
					'invisible opacity-0': !isActive,
				}
			)}
		>
			{isCountLoading ? (
				<p className='text-primaryText text-center text-[0.9375rem]'>
					Загрузка
				</p>
			) : isCountError ? (
				<p className='text-primaryText text-center text-[0.9375rem]'>Ошибка</p>
			) : count && count?.count <= 0 ? (
				<p className='text-primaryText text-center text-[0.9375rem]'>
					Хроники не найдены
				</p>
			) : (
				<>
					<div className='w-[11.9375rem] h-[1.875rem] flex justify-center items-center bg-secondaryHover px-[0.1875rem] relative mb-[0.625rem]'>
						<ChroniclesSwitchDateBttn
							skip={skip}
							count={count.count}
							type='prev'
							onClick={clickPrev}
						/>
						{isLoading ? (
							<p className='text-primaryText text-[0.625rem] text-center font-pressStart'>
								Загрузка...
							</p>
						) : isError ? (
							<p className='text-primaryText text-[0.625rem] text-center font-pressStart'>
								Ошибка
							</p>
						) : (
							<p className='text-primaryText text-[0.625rem] text-center font-pressStart truncate px-4'>
								{chronicleMonths[chronicle.month]} {chronicle.year}
							</p>
						)}
						<ChroniclesSwitchDateBttn
							skip={skip}
							count={count.count}
							type='next'
							onClick={clickNext}
						/>
					</div>
					<ChroniclesList
						chronicle={chronicle ?? null}
						isLoading={isLoading}
						isError={isError}
					/>
				</>
			)}
		</div>
	)
}

export default ChroniclesContent
