import { FC, useEffect, useState } from 'react'
import EditorBlocks from '../EditorBlocks'
import { IManga, IMangaPage } from '@/types/manga.interface'
import MangaPageEditor from './MangaPageEditor'
import EditorInput from '../EditorInput'
import MangaEditorImgUpload from './MangaEditorImgUpload'
import { useCreateManga } from '@/api/useCreateManga'
import { isNumber } from '@/utils/isNumber'
import { useAddChapter } from '@/api/useAddChapter'
import { useUpdateManga } from '@/api/useUpdateManga'
import { imgSrcToFile } from '@/utils/imageConvert'

interface IMangaEditor {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	selectedManga: IManga | null
	isCreateChapter: boolean
	isEditManga: boolean
}

const MangaEditor: FC<IMangaEditor> = ({
	isVisible,
	setIsVisible,
	selectedManga,
	isCreateChapter,
	isEditManga,
}) => {
	const [id, setId] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [chapter, setChapter] = useState<string>('1')
	const [description, setDescription] = useState<string>('')
	const [cover, setCover] = useState<File | null>(null)
	const [coverSrc, setCoverSrc] = useState<string | null>('')

	const [pages, setPages] = useState<IMangaPage[]>([])
	const [selectedPage, setSelectedPage] = useState<IMangaPage | null>(null)

	const [isPageEditorVisible, setIsPageEditorVisible] = useState<boolean>(false)

	const { mutate: createManga, isSuccess: isSuccessCreate } = useCreateManga()
	const { mutate: addChapterMutate, isSuccess: isSuccessAddChapter } =
		useAddChapter(id)
	const { mutate: updateManga, isSuccess: isSuccessUpdate } = useUpdateManga(id)

	const clickAddHandler = () => {
		if (isCreateChapter) {
			addChapter()
			return
		}

		if (isEditManga) {
			update()
			return
		}

		add()
	}

	const add = () => {
		const formData = new FormData()

		if (!id) {
			console.log('ID не может быть пустым')
			return
		}
		if (!title) {
			console.log('Название манги не может быть пустым')
			return
		}
		if (!chapter) {
			console.log('Номер главы не может быть пустым')
			return
		}
		if (!isNumber(chapter)) {
			console.log('Номер главы должен быть числом')
			return
		}

		formData.append('id', id)
		formData.append('title', title)
		formData.append('chapter', chapter)
		formData.append('description', description)
		if (!cover) {
			console.log('Обложка не выбрана')
			return
		}
		formData.append('coverImg', cover)

		for (const page of pages) {
			const pageImg = page.img

			if (!!pageImg && typeof pageImg === 'object') {
				formData.append('pageImgs', pageImg)
			} else {
				console.log('Изображение не выбрано')
			}
		}

		createManga(formData)
	}

	const addChapter = () => {
		const formData = new FormData()

		formData.append('chapter', chapter)

		for (const page of pages) {
			const pageImg = page.img

			if (!!pageImg && typeof pageImg === 'object') {
				formData.append('pageImgs', pageImg)
			} else {
				console.log('Изображение не выбрано')
			}
		}

		addChapterMutate(formData)
	}

	const update = async () => {
		const formData = new FormData()

		if (!id) {
			console.log('ID не может быть пустым')
			return
		}
		if (!title) {
			console.log('Название манги не может быть пустым')
			return
		}
		if (!chapter) {
			console.log('Номер главы не может быть пустым')
			return
		}
		if (!isNumber(chapter)) {
			console.log('Номер главы должен быть числом')
			return
		}

		formData.append('id', id)
		formData.append('title', title)
		formData.append('chapter', chapter)
		formData.append('description', description)

		if (cover) {
			formData.append('coverImg', cover)
		}

		// TODO: rewrite this without reuploading not changed images
		for (const page of pages) {
			const pageImg = page.img

			if (!!pageImg && typeof pageImg === 'object') {
				formData.append('pageImgs', pageImg)
			} else if (!!pageImg && typeof pageImg === 'string') {
				const file = await imgSrcToFile(pageImg)
				formData.append('pageImgs', file)
			} else {
				console.log('Изображение не выбрано')
			}
		}

		updateManga(formData)
	}

	const setFields = (manga: IManga) => {
		setId(manga.id)
		setTitle(manga.title)
		setChapter(isEditManga ? manga.chapter.toString() : `${manga.chapter + 1}`)
		setDescription(manga.description ?? '')
		setCover(null)
		setCoverSrc(manga.cover_img)
		if (!isCreateChapter) {
			setPages(
				manga.pages.map(page => ({
					id: page.id,
					page: page.page_number,
					img: page.page_img,
				}))
			)
		} else {
			setPages([])
		}
	}

	const clearFields = () => {
		setId('')
		setTitle('')
		setChapter('1')
		setDescription('')
		setCover(null)
		setCoverSrc(null)
		setPages([])
	}

	useEffect(() => {
		if (isSuccessCreate || isSuccessAddChapter || isSuccessUpdate) {
			setIsVisible(false)
		}
	}, [isSuccessCreate, isSuccessAddChapter, isSuccessUpdate])

	useEffect(() => {
		if (isVisible) {
			if (selectedManga) {
				setFields(selectedManga)
			} else {
				clearFields()
			}
		}
	}, [isVisible])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'bg-tertiary w-full h-[60.625rem] border-t-[1px] border-t-primary absolute inset-0 top-[5.25rem] flex justify-center transition-all px-8 pt-[1.94rem] z-20'
			}
		>
			<button
				onClick={() => setIsVisible(false)}
				className='min-w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				Назад
			</button>

			<div className='flex-1 flex flex-col justify-between items-center h-[57.3125rem] mx-8'>
				<div className='w-full h-[50rem] bg-secondary border-[5px] border-primary mt-[-5px] flex flex-col items-center'>
					<EditorInput
						title='ID манги'
						state={id}
						setState={setId}
						type='manga-id'
						isDisabled={isCreateChapter}
					/>
					<EditorInput
						title='Название манги'
						state={title}
						setState={setTitle}
						type='manga-title'
						isDisabled={isCreateChapter}
					/>
					<EditorInput
						title='Глава'
						state={chapter}
						setState={setChapter}
						type='manga-chapter'
						isDisabled={true}
					/>
					<EditorInput
						title='Описание'
						state={description}
						setState={setDescription}
						type='manga-description'
						isDisabled={isCreateChapter}
						isTextarea
					/>
					<MangaEditorImgUpload
						title='Обложка'
						img={cover}
						imgSrc={coverSrc}
						setImg={setCover}
						className='mt-8 h-[22.5rem]'
						isDisabled={isCreateChapter}
					/>
				</div>

				<EditorBlocks
					title='Страницы'
					blocks={pages}
					setSelectedBlock={setSelectedPage}
					setIsEditorVisible={setIsPageEditorVisible}
				/>
			</div>

			<button
				onClick={clickAddHandler}
				className='min-w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				{isEditManga ? 'Изменить' : 'Добавить'}
			</button>

			<MangaPageEditor
				isVisible={isPageEditorVisible}
				setIsVisible={setIsPageEditorVisible}
				pages={pages}
				setPages={setPages}
				selectedPage={selectedPage}
				title={title}
			/>
		</div>
	)
}

export default MangaEditor
