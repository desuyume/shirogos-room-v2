import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReaderHeader from '@/components/Reader/ReaderHeader'
import ReaderFooter from '@/components/Reader/ReaderFooter'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useManga } from '@/api/useManga'
import { IFetchMangaPage } from '@/types/manga.interface'
import { isNumber } from '@/utils/isNumber'
import sortPagesByCurrent from '@/utils/sortPagesByCurrent'
import loadImage from '@/utils/loadImage'
import MangaPage from '@/components/Reader/MangaPage'

const Manga: FC = () => {
	const params = useParams()
	const [searchParams] = useSearchParams()
	const navigate = useNavigate()

	const mangaId = params.id ?? ''
	const currentChapter = params.chapter ?? 1
	const [currentPageNum, setCurrentPageNum] = useState<string>(
		searchParams.get('page') ?? '1'
	)
	const [pagesCount, setPagesCount] = useState<number>(0)
	const [pages, setPages] = useState<IFetchMangaPage[]>([])
	const [loadedPageNumbers, setLoadedPageNumbers] = useState<number[]>([])

	const mangaRef = useRef<HTMLDivElement | null>(null)

	const [offset, setOffset] = useState<number | undefined>(0)
	const [isZoomed, setIsZoomed] = useState<boolean>(false)
	const [mangaWidth, setMangaWidth] = useState<number>(47)

	const [isNextBttnHovered, setIsNextBttnHovered] = useState<boolean>(false)
	const [isPrevBttnHovered, setIsPrevBttnHovered] = useState<boolean>(false)

	const {
		data: manga,
		isLoading,
		isError,
		isSuccess,
	} = useManga(mangaId, +currentChapter)

	const clickZoom = () => {
		if (!isZoomed) {
			setIsZoomed(true)
			setMangaWidth(mangaWidth + 30)
		} else {
			setIsZoomed(false)
			setMangaWidth(mangaWidth - 30)
		}
	}

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

	const loadImagesSequentially = async (
		pages: IFetchMangaPage[]
	): Promise<void> => {
		const sortedPages = sortPagesByCurrent(pages, +currentPageNum)
		for (const page of sortedPages) {
			try {
				await loadImage(`${import.meta.env.VITE_SERVER_URL}/${page.page_img}`)
				setLoadedPageNumbers(prev => [...prev, page.page_number])
			} catch (error) {
				console.error(
					`Failed to load image for page ${page.page_number}:`,
					error
				)
			}
		}
	}

	useEffect(() => {
		if (isSuccess) {
			setPageParams()
		}
	}, [pagesCount])

	useLayoutEffect(() => {
		window.scrollTo(0, 0)
	}, [currentPageNum])

	useEffect(() => {
		if (isSuccess) {
			setPagesCount(manga.pages.length)
			setPages(manga.pages)
		}
	}, [isLoading])

	useEffect(() => {
		if (isSuccess && pages.length) {
			loadImagesSequentially(pages)
		}
	}, [pages.length, currentPageNum])

	useEffect(() => {
		setOffset(((mangaRef.current?.offsetLeft ?? 0) / window.innerWidth) * 100)
	}, [isZoomed])

	useLayoutEffect(() => {
		const observer = new ResizeObserver(() => {
			setOffset(((mangaRef.current?.offsetLeft ?? 0) / window.innerWidth) * 100)
		})
		observer.observe(document.documentElement)

		return () => {
			observer.unobserve(document.documentElement)
		}
	})

	return (
		<div className='h-screen flex flex-col'>
			{isLoading || !currentPageNum ? (
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
						title={manga.title}
						currentPage={+currentPageNum}
						pages={pagesCount}
						type='manga'
						currentChapter={+currentChapter}
						chapters={manga.chaptersCount}
						itemId={mangaId}
					/>
					<div
						ref={mangaRef}
						className='my-0 mx-auto relative pb-[0.8rem] flex-grow'
					>
						{+currentPageNum > 1 && (
							<>
								<button
									onClick={clickPrevPage}
									onMouseOver={() => setIsPrevBttnHovered(true)}
									onMouseLeave={() => setIsPrevBttnHovered(false)}
									className={
										(isPrevBttnHovered && 'w-[1.6875rem] bg-primaryHover') +
										' right-full top-0 w-[0.9375rem] h-[6.5625rem] absolute bg-primary transition-all'
									}
								/>
								<button
									onClick={clickPrevPage}
									onMouseOver={() => setIsPrevBttnHovered(true)}
									onMouseLeave={() => setIsPrevBttnHovered(false)}
									className='h-full absolute top-0 left-0 w-[20%] bg-transparent'
								/>
							</>
						)}
						{pagesCount <= 0 ? (
							<div className='w-full h-full flex justify-center items-center'>
								<p className='text-xl'>Страниц нет</p>
							</div>
						) : (
							<MangaPage
								mangaWidth={mangaWidth}
								img={
									pages.find(page => page.page_number === +currentPageNum)
										?.page_img ?? null
								}
								isLoading={!loadedPageNumbers.includes(+currentPageNum)}
							/>
						)}

						{+currentPageNum < pagesCount && (
							<>
								<button
									onClick={clickNextPage}
									onMouseOver={() => setIsNextBttnHovered(true)}
									onMouseLeave={() => setIsNextBttnHovered(false)}
									className='h-full absolute top-0 right-0 w-[20%] bg-transparent'
								/>
								<button
									onClick={clickNextPage}
									onMouseOver={() => setIsNextBttnHovered(true)}
									onMouseLeave={() => setIsNextBttnHovered(false)}
									className={
										(isNextBttnHovered && 'w-[1.6875rem] bg-primaryHover') +
										' left-full top-0 w-[0.9375rem] h-[6.5625rem] absolute bg-primary transition-all'
									}
								/>
							</>
						)}
					</div>
					<ReaderFooter
						currentPage={+currentPageNum}
						offset={offset}
						itemType='manga'
						clickZoom={clickZoom}
						pages={pagesCount}
						type='manga'
					/>
				</>
			)}
		</div>
	)
}

export default Manga
