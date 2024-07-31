import { FC } from 'react'

interface IChapterItem {
	chapter: number
	path: string
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const ChapterItem: FC<IChapterItem> = ({ chapter, path, setIsVisible }) => {
	return (
		<a
			className='flex justify-center items-center font-tertiary text-primaryText hover:text-white text-2xl w-full h-[1.6875rem] bg-primary hover:bg-primaryHover transition-all mb-3 last-of-type:mb-0'
			href={`/${path}/${chapter}`}
			onClick={() => setIsVisible(false)}
		>
			Глава {chapter}
		</a>
	)
}

export default ChapterItem
