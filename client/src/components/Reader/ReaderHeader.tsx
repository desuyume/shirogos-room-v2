import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import ChaptersList from './ChaptersList'

interface IReaderHeader {
	title: string
	currentPage: number
	pages: number
	currentChapter?: number
	chapters?: number
	type: string
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
	const [isChaptersVisible, setIsChaptersVisible] = useState<boolean>(false)

	return (
		<div className='header min-h-[7.875rem] bg-tertiary border-b-secondaryHover border-b-[1px] flex items-center justify-center relative'>
			<div 
				onClick={() => setIsChaptersVisible(!isChaptersVisible)}
				className={(chapters && chapters > 1 && 'cursor-pointer') + ' h-full border-b-[5px] border-b-primary -mb-[2px] pb-[2.5px] flex items-center absolute left-[4.3rem]'}
			>
				<p 
					className='font-tertiary text-[#FFF] text-2xl px-2 w-[17rem] text-center'
				>
					{title} {chapters&& chapters > 1 && "/ Глава " + currentChapter}
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
				<p className='text-[#FFF] font-tertiary text-2xl '>
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
				className='text-[#FFF] font-tertiary text-2xl w-[17.14281rem] h-full border-b-transparent flex items-center justify-center border-b-[5px] pb-[2.5px] -mb-[2px] absolute right-[4.3rem] hover:border-b-primary transition-all'
			>
				Назад
			</Link>
		</div>
	)
}

export default ReaderHeader
