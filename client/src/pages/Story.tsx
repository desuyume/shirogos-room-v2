import { FC, useEffect, useRef, useState } from 'react'
import ReaderHeader from '@/components/Reader/ReaderHeader'
import ReaderFooter from '@/components/Reader/ReaderFooter'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { IStoryPage } from '@/types/story.interface'
import { isNumber } from '@/utils/isNumber'
import { useStory } from '@/api/useStory'
import HTMLReactParser from 'html-react-parser'
import '@/styles/story.scss'

const Story: FC = () => {
	const params = useParams()

	const storyId = params.id ?? ''

	const [searchParams] = useSearchParams()
	const [currentPageNum, setCurrentPageNum] = useState<string>(
		searchParams.get('page') ?? '1'
	)
	const [pagesCount, setPagesCount] = useState<number>(0)
	const [pages, setPages] = useState<IStoryPage[]>([])

	const storyRef = useRef<HTMLDivElement | null>(null)
	const [offset, setOffset] = useState<number | undefined>(0)
	const [isZoomed, setIsZoomed] = useState<boolean>(false)
	const [isContentLoaded, setIsContentLoaded] = useState<boolean>(false)

	const { data: story, isLoading, isError, isSuccess } = useStory(storyId)

	const clickZoom = () => {
		if (!isZoomed) {
			setIsZoomed(true)
		} else {
			setIsZoomed(false)
		}
	}

	const navigate = useNavigate()

	const clickNextPage = () => {
		navigate(location.pathname + '?page=' + (+currentPageNum + 1))
		setCurrentPageNum(String(+currentPageNum + 1))
	}

	const clickPrevPage = () => {
		navigate(location.pathname + '?page=' + (+currentPageNum - 1))
		setCurrentPageNum(String(+currentPageNum - 1))
	}

	const setPageParams = () => {
		if (!location.search) {
			navigate(location.pathname + '?page=1')
			setCurrentPageNum('1')
		} else if (+currentPageNum < 1) {
			navigate(location.pathname + '?page=1')
			setCurrentPageNum('1')
		} else if (+currentPageNum > pagesCount) {
			navigate(location.pathname + '?page=' + pagesCount)
			setCurrentPageNum(String(pagesCount))
		} else if (!isNumber(currentPageNum)) {
			navigate(location.pathname + '?page=1')
			setCurrentPageNum('1')
		}
	}

	useEffect(() => {
		if (isSuccess) {
			setPageParams()
			setIsContentLoaded(true)
		}
	}, [pagesCount])

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [currentPageNum])

	useEffect(() => {
		if (isSuccess) {
			setPagesCount(story.pages.length)
			setPages(story.pages)
		}
	}, [isLoading])

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			setOffset(
				(((storyRef.current?.offsetLeft ?? 0) + 19.2) / window.innerWidth) * 100
			)
		})
		observer.observe(document.documentElement)

		return () => {
			observer.unobserve(document.documentElement)
		}
	}, [pagesCount])

	return (
		<div className='h-screen flex flex-col story'>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-xl'>Ошибка</p>
				</div>
			) : (
				<>
					<ReaderHeader
						title={story.title}
						currentPage={+currentPageNum}
						pages={pagesCount}
						type='story'
						clickNext={clickNextPage}
						clickPrev={clickPrevPage}
						itemId={storyId}
					/>
					<div
						ref={storyRef}
						className='my-0 mx-auto relative flex-grow py-[0.8rem] px-[1.2rem]'
					>
						{+currentPageNum > 1 && (
							<button
								onClick={clickPrevPage}
								className='right-full top-0 absolute w-[0.9375rem] h-[6.5625rem] bg-primary hover:w-[1.6875rem] hover:bg-primaryHover transition-all'
							/>
						)}
						{pagesCount <= 0 ? (
							<div className='w-full h-full flex justify-center items-center'>
								<p className='text-xl'>Страниц нет</p>
							</div>
						) : !isContentLoaded ? (
							<p
								className={
									(isContentLoaded
										? 'opacity-0 invisible '
										: 'opacity-100 visible ') +
									'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl transition-all'
								}
							>
								Загрузка...
							</p>
						) : (
							<div
								className={
									(!isContentLoaded
										? 'opacity-0 invisible '
										: 'opacity-100 visible ') +
									'story-container leading-normal text-[#FFF] font-secondary w-[66.1875rem] [&_img]:w-[80%] [&_img]:mx-auto [&_img]:my-8 ql-editor [&_h1]:text-4xl [&_a]:text-primary [&_a:hover]:text-primaryHover' +
									(isZoomed ? ' zoomed' : '')
								}
							>
								{HTMLReactParser(pages[+currentPageNum - 1]?.text)}
							</div>
						)}

						{+currentPageNum < pagesCount && (
							<button
								onClick={clickNextPage}
								className='left-full top-0 absolute w-[0.9375rem] h-[6.5625rem] bg-primary hover:w-[1.6875rem] hover:bg-primaryHover transition-all'
							/>
						)}
					</div>
					<ReaderFooter
						currentPage={+currentPageNum}
						offset={offset}
						itemType='story'
						clickZoom={clickZoom}
						pages={pagesCount}
						type='story'
						clickNext={clickNextPage}
						clickPrev={clickPrevPage}
					/>
				</>
			)}
		</div>
	)
}

export default Story
