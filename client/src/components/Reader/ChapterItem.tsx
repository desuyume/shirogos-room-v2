import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IChapterItem {
	chapter: number
	path: string
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChapterItem: FC<IChapterItem> = ({ chapter, path, setIsVisible }) => {
	return (
		<Link
			className='flex justify-center items-center font-tertiary text-[#FFF] text-2xl w-full h-[1.6875rem] bg-primary hover:bg-primaryHover transition-all mb-3 last-of-type:mb-0'
			to={`/${path}/${chapter}`}
			onClick={() => setIsVisible(false)}
		>
			Глава {chapter}
		</Link>
	)
}

export default ChapterItem
