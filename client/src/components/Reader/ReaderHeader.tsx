import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import ChaptersList from './ChaptersList'
import { cn } from '@/utils/cn'
import { DangotekaItemType } from '../Dangoteka/DangotekaSection'

interface IReaderHeader {
	title: string
	currentPage: number
	pages: number
	currentChapter?: number
	chapters?: number
	type: DangotekaItemType
	itemId: string
	clickNext?: () => void
	clickPrev?: () => void
}

const ReaderHeader: FC<IReaderHeader> = ({
	title,
	currentPage,
	pages,
	currentChapter,
	chapters,
	type,
	itemId,
	clickNext,
	clickPrev,
}) => {
	const isHasChapters: boolean = type === 'manga' && !!chapters && chapters > 1
	const [isChaptersVisible, setIsChaptersVisible] = useState<boolean>(false)

	return (
		<div className='header min-h-[7.875rem] bg-tertiary border-b-secondaryHover border-b-[1px] flex items-center justify-center relative'>
			<div
				onClick={() =>
					isHasChapters && setIsChaptersVisible(!isChaptersVisible)
				}
				className={cn(
					'h-full border-b-[5px] border-b-primary -mb-[2px] pb-[2.5px] flex items-center absolute left-[4.3rem] group transition-all',
					{
						'hover:border-b-primaryHover cursor-pointer': isHasChapters,
						'border-b-primaryHover': isChaptersVisible,
					}
				)}
			>
				<p
					className={cn(
						'font-tertiary text-primaryText text-2xl px-2 w-[17rem] text-center transition-all',
						{
							'group-hover:text-white': isHasChapters,
						}
					)}
				>
					{title} {chapters && chapters > 1 && '/ Глава ' + currentChapter}
				</p>
				{chapters && chapters > 1 && (
					<ChaptersList
						isVisible={isChaptersVisible}
						setIsVisible={setIsChaptersVisible}
						chaptersCount={chapters}
						currentChapter={currentChapter}
						path={type + '/' + itemId}
					/>
				)}
			</div>

			<div className='flex items-center mb-[5px] relative'>
				{+currentPage > 1 && type === 'story' && (
					<button
						onClick={clickPrev}
						className='w-[0.25rem] h-5 bg-[#E14177] absolute right-[140%] hover:w-[1.625rem] transition-all'
					/>
				)}
				<p className='text-primaryText font-tertiary text-2xl '>
					{currentPage}/{pages}
				</p>
				{+currentPage < pages && type === 'story' && (
					<button
						onClick={clickNext}
						className='w-[0.25rem] h-5 bg-[#E14177] absolute left-[140%] hover:w-[1.625rem] transition-all'
					/>
				)}
			</div>

			<Link
				to='/dangoteka'
				className='text-primaryText hover:text-white font-tertiary text-2xl w-[17.14281rem] h-full border-b-transparent flex items-center justify-center border-b-[5px] pb-[2.5px] -mb-[2px] absolute right-[4.3rem] hover:border-b-primary transition-all'
			>
				Назад
			</Link>
		</div>
	)
}

export default ReaderHeader
