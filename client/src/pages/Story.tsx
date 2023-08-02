import { FC, useEffect, useRef, useState } from 'react'
import ReaderHeader from '@/components/Reader/ReaderHeader'
import ReaderFooter from '@/components/Reader/ReaderFooter'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

const Story: FC = () => {
	const params = useParams()

	const storyId = params.id ?? '' // TODO: use id to get manga from db
	console.log('story id - ' + storyId)

	const currentChapter = params.chapter ?? 1
	console.log('story chapter - ' + currentChapter)
	const chapters = 1 // TODO: fetch chapters count from d

	// TODO: use page to fetch needed page
	const [searchParams] = useSearchParams()
	let currentPage = searchParams.get('page') ?? '1'
	console.log('story page - ' + currentPage)

	const pages = 18 // TODO: fetch pages from db

	const storyRef = useRef<HTMLDivElement | null>(null)
	const [offset, setOffset] = useState<number | undefined>(0)
	const [isZoomed, setIsZoomed] = useState<boolean>(false)
	const [textSize, setTextSize] = useState<number>(1.5)

	const clickZoom = () => {
		if (!isZoomed) {
			setIsZoomed(true)
			setTextSize(textSize + 1)
		} else {
			setIsZoomed(false)
			setTextSize(textSize - 1)
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
			setOffset(
				(((storyRef.current?.offsetLeft ?? 0) + 19.2) / window.innerWidth) * 100
			)
		})
		observer.observe(document.documentElement)

		return () => {
			observer.unobserve(document.documentElement)
		}
	}, [])

	const clickNextPage = () => {
		navigate(location.pathname + '?page=' + (+currentPage + 1))
	}

	const clickPrevPage = () => {
		navigate(location.pathname + '?page=' + (+currentPage - 1))
	}

	return (
		<div className='h-screen flex flex-col'>
			<ReaderHeader currentPage={+currentPage} pages={pages} type='story' clickNext={clickNextPage} clickPrev={clickPrevPage} chapters={chapters} currentChapter={+currentChapter} itemId={storyId} />
			<div
				ref={storyRef}
				className='my-0 mx-auto relative flex-grow py-[0.8rem] px-[1.2rem]'
			>
				{+currentPage > 1 && (
					<button
						onClick={clickPrevPage}
						className='right-full top-0 absolute w-[0.9375rem] h-[6.5625rem] bg-primary hover:w-[1.6875rem] hover:bg-primaryHover transition-all'
					/>
				)}
				<p
					style={{ fontSize: textSize + 'rem' }}
					className='leading-normal text-[#FFF] font-secondary text-2xl w-[66.1875rem]'
				>
					Достаточно шумный летний день: Богом покинутую деревеньку оставляли
					последние жители. Город Авантюристов был рядом, буквально за горой —
					поэтому-то деревенские, водрузив на себя и в тележки с повозками
					большие сумки и вещи, потихоньку шли вдоль каменных стен, оставляя
					позади себя дряхлые деревянные постройки. Благодаря помощи маленьких,
					но коренастых людей поход не предполагал какой-то неимоверной
					сложности. В былину их бы точно назвали дворфами, но сейчас это
					несколько устаревший термин. “Авантюристы”, - подумала Копи. Да,
					именно так она бы их и назвала. <br />
					<br /> Алтарь. Это было последнее, что поместилось в повозку Копи. Не
					то чтобы она была жрицей деревни или девушкой божественного помысла,
					на которую все поклонялись, скорее, самый близкий друг почившего
					старосты. Светловолосая леди оставалась позади всех, чтобы помочь им
					собрать свои вещи. Теперь же не без помощи крепкого авантюриста Копи
					грузила последние деревенские предметы, в том числе пожитки старосты.
					Как раз последним из них и был старый алтарь. Похож он был, скорее, на
					статуэтку размером с пень, однако воплощал в себе всю историческую
					ценность деревни. <br />
					<br /> — На этом всё, спасибо за помощь! — сказала Копи авантюристу.
					Сев во главе повозки, крупный парень потихоньку уехал за остальными,
					тем самым оставив юную девушку наедине с собой: она вежливо попросила
					об этом прежде, чем погрузили последний предмет. <br />
					<br /> Это был тяжёлый день. Свалившись на траву, Копи протянула руку
					в небо, в котором уже не осталось ничего от солнца, прежде игравшего
					лучами в пинг-понг с воображаемыми друзьями-тенями. "Где же ты,
					сестра?", - тревожная мысль уже второй год выдавливала из Копи её
					горькие слёзы.
				</p>
				{+currentPage < pages && (
					<button
						onClick={clickNextPage}
						className='left-full top-0 absolute w-[0.9375rem] h-[6.5625rem] bg-primary hover:w-[1.6875rem] hover:bg-primaryHover transition-all'
					/>
				)}
			</div>
			<ReaderFooter
				currentPage={+currentPage}
				offset={offset}
				itemType='story'
				clickZoom={clickZoom}
				pages={pages}
				type='story'
				clickNext={clickNextPage}
				clickPrev={clickPrevPage}
			/>
		</div>
	)
}

export default Story
