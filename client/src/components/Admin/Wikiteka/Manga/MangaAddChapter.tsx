import { IManga, IMangaGeneral } from '@/types/manga.interface'
import { FC } from 'react'

interface IMangaAddChapter {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
	allMangas: IManga[]
	uniqueMangas: IMangaGeneral[]
	selectedManga: IManga | null
	setSelectedManga: React.Dispatch<React.SetStateAction<IManga | null>>
	setIsCreateChapter: React.Dispatch<React.SetStateAction<boolean>>
}

const MangaAddChapter: FC<IMangaAddChapter> = ({
	isVisible,
	setIsVisible,
	setIsEditorVisible,
	allMangas,
	uniqueMangas,
	selectedManga,
	setSelectedManga,
	setIsCreateChapter,
}) => {
	const select = () => {
		if (!selectedManga) return
		setIsVisible(false)
		setIsCreateChapter(true)
		setIsEditorVisible(true)
	}

	const cancel = () => {
		setSelectedManga(null)
		setIsVisible(false)
		setIsCreateChapter(false)
	}

	const setManga = (chosenManga: IMangaGeneral) => {
		const manga = allMangas.find(manga => manga.id === chosenManga.id)

		if (manga) {
			const result: IManga = {
				...manga,
				chapter: chosenManga.lastChapter,
			}
			setSelectedManga(result)
		}
	}

	return (
		<div
			onClick={cancel}
			className={
				(isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				`bg-black bg-opacity-60 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all`
			}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-secondary text-center items-center rounded-[37px] w-[30rem] pt-4'
			>
				<h2 className='text-[#FFF] text-3xl pb-4 border-b-2 border-primary'>
					Манги
				</h2>
				<div className='flex flex-col items-center min-h-[18rem] max-h-[18rem] overflow-y-auto'>
					{uniqueMangas.map(manga => (
						<button
							key={manga.id}
							className={
								(selectedManga?.id === manga.id ? 'bg-tertiary ' : '') +
								'w-full py-2 text-primaryText hover:bg-tertiary transition-all'
							}
							onClick={() => setManga(manga)}
						>
							{manga.title}
						</button>
					))}
				</div>

				<div className='w-full h-10 flex items-center'>
					<button
						onClick={select}
						className='w-full h-full bg-primary hover:bg-primaryHover text-[#FFF] text-xl transition-all rounded-b-[37px]'
					>
						Выбрать
					</button>
				</div>
			</div>
		</div>
	)
}

export default MangaAddChapter
