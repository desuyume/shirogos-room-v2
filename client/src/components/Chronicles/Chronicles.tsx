import { FC, useState } from 'react'
import ChroniclesList from './ChroniclesList'
import { chronicleMonths } from '@/consts/months'
import { useChronicle } from '@/api/useChronicle'
import { useChroniclesCount } from '@/api/useChroniclesCount'

interface IChronicles {
	isActive: boolean
}

const Chronicles: FC<IChronicles> = ({ isActive }) => {
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
			className={
				(isActive ? 'visible opacity-100' : 'invisible opacity-0') +
				' bg-tertiary bg-opacity-40 w-[13.1875rem] absolute left-0 top-[5.38rem] pt-[1.25rem] pb-[0.63rem] pl-[0.4rem] pr-[0.94rem] transition-all'
			}
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
					<div className='w-[11.9375rem] h-[1.875rem] flex justify-center items-center bg-secondaryHover px-[0.19rem] relative mb-[0.62rem]'>
						<button
							onClick={clickPrev}
							className='bg-primary w-[4.7%] h-[77%] hover:bg-primaryHover absolute left-[0.19rem] hover:w-[0.8125rem] transition-all'
						/>
						{isLoading ? (
							<p className='text-primaryText text-[0.9375rem]'>Загрузка</p>
						) : isError ? (
							<p className='text-primaryText text-[0.9375rem]'>Ошибка</p>
						) : (
							<p className='text-primaryText text-[0.9375rem]'>
								{chronicleMonths[chronicle.month]} {chronicle.year}
							</p>
						)}
						<button
							onClick={clickNext}
							className='bg-primary w-[4.7%] h-[77%] hover:bg-primaryHover absolute right-[0.19rem] hover:w-[0.8125rem] transition-all'
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

export default Chronicles
