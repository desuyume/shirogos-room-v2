import { FC, useEffect, useState } from 'react'
import MangaList from './Manga/MangaList'
import MangaEditor from './Manga/MangaEditor'
import { useMangasWithChapters } from '@/api/useMangasWithChapters'
import MangaAddChapter from './Manga/MangaAddChapter'
import { IManga } from '@/types/manga.interface'
import { useDeleteManga } from '@/api/useDeleteManga'
import RemoveConfirmModal from '@/components/RemoveConfirmModal'
import { useAllMangas } from '@/api/useAllMangas'

const Manga: FC = () => {
	const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false)
	const [selectedManga, setSelectedManga] = useState<IManga | null>(null)
	const [isAddChapterVisible, setIsAddChapterVisible] = useState<boolean>(false)
	const [isCreateChapter, setIsCreateChapter] = useState<boolean>(false)
	const [isEditManga, setIsEditManga] = useState<boolean>(false)
	const [isRemoveModalVisible, setIsRemoveModalVisible] =
		useState<boolean>(false)

	const {
		data: mangas,
		isLoading,
		isError
	} = useMangasWithChapters()
	const { data: uniqueMangas, isLoading: isUniqueMangasLoading, isError: isUniqueMangasError } = useAllMangas()
	const { mutate: deleteMutate } = useDeleteManga(
		selectedManga?.chapterId ?? null
	)

	const removeManga = () => {
		deleteMutate()
	}

	useEffect(() => {
		if (!isEditorVisible) {
			setSelectedManga(null)
			setIsCreateChapter(false)
			setIsEditManga(false)
		}
	}, [isEditorVisible])

	return (
		<div className='w-[35%]'>
			{isLoading || isUniqueMangasLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p>Загрузка...</p>
				</div>
			) : isError || isUniqueMangasError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p>Ошибка</p>
				</div>
			) : (
				<>
					<MangaList
						mangas={mangas}
						setSelectedManga={setSelectedManga}
						setIsRemoveModalVisible={setIsRemoveModalVisible}
						setIsEditorVisible={setIsEditorVisible}
						setIsEditManga={setIsEditManga}
					/>
					<div className='w-[86.9%] h-8 flex'>
						<button
							onClick={() => {
								setSelectedManga(null)
								setIsCreateChapter(false)
								setIsEditorVisible(true)
							}}
							className='w-[67%] h-full bg-primary hover:bg-primaryHover text-[#FFF] text-[0.9375rem] px-2 mr-2 leading-none'
						>
							Добавить мангу
						</button>
						<button
							onClick={() => setIsAddChapterVisible(true)}
							className='flex-1 h-full bg-primary hover:bg-primaryHover text-[#FFF] text-[0.9375rem] px-2 leading-none'
						>
							Добавить главу
						</button>
					</div>

					<MangaEditor
						isVisible={isEditorVisible}
						setIsVisible={setIsEditorVisible}
						selectedManga={selectedManga}
						isCreateChapter={isCreateChapter}
						isEditManga={isEditManga}
					/>
					<MangaAddChapter
						isVisible={isAddChapterVisible}
						setIsVisible={setIsAddChapterVisible}
						setIsEditorVisible={setIsEditorVisible}
						allMangas={mangas}
						uniqueMangas={uniqueMangas}
						selectedManga={selectedManga}
						setSelectedManga={setSelectedManga}
						setIsCreateChapter={setIsCreateChapter}
					/>
					<RemoveConfirmModal
						isVisible={isRemoveModalVisible}
						setIsVisible={setIsRemoveModalVisible}
						elementText={`Манга - ${selectedManga?.title} - ${selectedManga?.chapter} глава`}
						removeFn={removeManga}
					/>
				</>
			)}
		</div>
	)
}

export default Manga
