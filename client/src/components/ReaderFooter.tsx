import { FC } from 'react'
import zoomIcon from '../assets/dangoteka/zoom.png'

interface IReaderFooter {
	offset: number | undefined
	currentPage: number
	itemType: string
	clickZoom: () => void
	pages: number
	type: string
	clickNext?: () => void
	clickPrev?: () => void
}

const ReaderFooter: FC<IReaderFooter> = ({
	currentPage,
	offset,
	itemType,
	clickZoom,
	pages,
	type,
	clickNext,
	clickPrev,
}) => {
	return (
		<div
			className='flex justify-between items-center border-t-secondaryHover border-t-[1px] min-h-[7.8125rem] transition-all'
			style={{ paddingLeft: offset + '%', paddingRight: offset + '%' }}
		>
			<div className='flex items-center'>
				<img
					onClick={clickZoom}
					className='mr-2.5 cursor-pointer select-none'
					src={zoomIcon}
					alt='zoom-img'
				/>
				<p className='font-tertiary text-[0.9375rem] text-[#FFF]'>
					-{' '}
					{itemType === 'manga'
						? 'Увеличить размер страницы'
						: 'Увеличить текст'}
				</p>
			</div>
			<div className='relative flex items-center'>
				{+currentPage > 1 && type === 'story' && (
					<button
						onClick={clickPrev}
						className='w-[0.25rem] h-5 bg-[#E14177] absolute right-[125%] hover:w-[1.625rem] transition-all'
					/>
				)}
				<p className='font-tertiary text-2xl text-[#FFF]'>
					{currentPage}/{pages}
				</p>
				{+currentPage < pages && type === 'story' && (
					<button
						onClick={clickNext}
						className='w-[0.25rem] h-5 bg-[#E14177] absolute left-[125%] hover:w-[1.625rem] transition-all'
					/>
				)}
			</div>
		</div>
	)
}

export default ReaderFooter
