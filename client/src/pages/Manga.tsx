import { FC, useEffect, useRef, useState } from 'react'
import ReaderHeader from '../components/ReaderHeader'
import mangaImg from '../assets/dangoteka/manga.png'
import ReaderFooter from '../components/ReaderFooter'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Manga: FC = () => {
	const params = useParams()

	const mangaId = params.id ?? '' // TODO: use id to get manga from db
	console.log('manga id - ' + mangaId)

	const currentChapter = params.chapter ?? 1
	console.log('manga chapter - ' + currentChapter)
	const chapters = 4 // TODO: fetch chapters count from db

	// TODO: use page to fetch needed page
	const [searchParams] = useSearchParams()
	let currentPage = searchParams.get('page') ?? '1'
	console.log('manga page - ' + currentPage)

	const pages = 18 // TODO: fetch pages from db

	const mangaRef = useRef<HTMLDivElement | null>(null)
	const [offset, setOffset] = useState<number | undefined>(0)
	const [isZoomed, setIsZoomed] = useState<boolean>(false)
	const [mangaWidth, setMangaWidth] = useState<number>(47)

	const clickZoom = () => {
		if (!isZoomed) {
			setIsZoomed(true)
			setMangaWidth(mangaWidth + 30)
		} else {
			setIsZoomed(false)
			setMangaWidth(mangaWidth - 30)
		}
	}

	const navigate = useNavigate()

	useEffect(() => {
		if (!location.search) {
			navigate(location.pathname + '?page=1')
		}
		if (+currentPage < 1) {
			navigate(location.pathname + '?page=1')
		}
		if (+currentPage > pages) {
			navigate(location.pathname + '?page=' + pages)
		}
	}, [])

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			setOffset(((mangaRef.current?.offsetLeft ?? 0) / window.innerWidth) * 100)
		})
		observer.observe(document.documentElement)

		return () => {
			observer.unobserve(document.documentElement)
		}
	}, [mangaWidth])

	const clickNextPage = () => {
		navigate(location.pathname + '?page=' + (+currentPage + 1))
	}

	const clickPrevPage = () => {
		navigate(location.pathname + '?page=' + (+currentPage - 1))
	}

	const [isNextBttnHovered, setIsNextBttnHovered] = useState<boolean>(false)
	const [isPrevBttnHovered, setIsPrevBttnHovered] = useState<boolean>(false)

	return (
		<div className='h-screen flex flex-col'>
			<ReaderHeader
				currentPage={+currentPage}
				pages={pages}
				type='manga'
				currentChapter={+currentChapter}
				chapters={chapters}
				itemId={mangaId}
			/>
			<div
				ref={mangaRef}
				className='my-0 mx-auto relative pb-[0.8rem] flex-grow'
			>
				{+currentPage > 1 && (
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

				<img
					style={{ width: mangaWidth + 'vw' }}
					className='select-none'
					src={mangaImg}
					alt='manga-img'
				/>
				{+currentPage < pages && (
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
				currentPage={+currentPage}
				offset={offset}
				itemType='manga'
				clickZoom={clickZoom}
				pages={pages}
				type='manga'
			/>
		</div>
	)
}

export default Manga
