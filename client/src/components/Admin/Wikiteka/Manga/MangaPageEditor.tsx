import { FC, useEffect, useState } from 'react'
import MangaEditorImgUpload from '../EditorImgUpload'
import { IMangaPage } from '@/types/manga.interface'

interface IMangaPageEditor {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	pages: IMangaPage[]
	setPages: React.Dispatch<React.SetStateAction<IMangaPage[]>>
	selectedPage: IMangaPage | null
	title: string
}

const MangaPageEditor: FC<IMangaPageEditor> = ({
	isVisible,
	setIsVisible,
	pages,
	setPages,
	selectedPage,
	title,
}) => {
	const [pageImg, setPageImg] = useState<File | null>(null)
	const [pageImgSrc, setPageImgSrc] = useState<string | null>(null)

	const add = () => {
		if (!pageImg) {
			console.log('Изображение не выбрано')
			return
		}

		const prevPage = pages[pages.length - 1]

		if (!!prevPage) {
			setPages([
				...pages,
				{ id: prevPage.id + 1, page: prevPage.page + 1, img: pageImg },
			])
		} else {
			setPages([{ id: 1, page: 1, img: pageImg }])
		}

		setIsVisible(false)
		setPageImg(null)
	}

	const update = () => {
		if (!pageImg) {
			console.log('Изображение не выбрано')
			return
		}

		const updatedPages = pages.map(page => {
			if (page.id === selectedPage?.id) {
				return { ...page, img: pageImg }
			}
			return page
		})
		setPages(updatedPages)

		setIsVisible(false)
		setPageImg(null)
	}

	useEffect(() => {
		if (selectedPage && typeof selectedPage.img === 'string') {
			setPageImgSrc(selectedPage.img)
		}

		if (
			selectedPage &&
			!!selectedPage.img &&
			typeof selectedPage.img === 'object'
		) {
			setPageImgSrc(URL.createObjectURL(selectedPage.img))
		}

		if (!selectedPage) {
			setPageImg(null)
			setPageImgSrc(null)
		}
	}, [selectedPage, isVisible])

	useEffect(() => {
		if (pageImg) {
			setPageImgSrc(URL.createObjectURL(pageImg))
		}
	}, [pageImg])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'bg-tertiary w-full h-[60.625rem] absolute inset-0 flex justify-center transition-all px-8 pt-[1.94rem]'
			}
		>
			<button
				onClick={() => setIsVisible(false)}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				Назад
			</button>

			<div className='flex-1 flex flex-col justify-center items-center h-[57.3125rem] mx-8'>
				<div className='w-full h-[45.4375rem] bg-secondary border-[5px] border-primary flex flex-col items-center justify-center relative'>
					<div className='flex h-[3.8125rem] absolute top-0'>
						<div className='w-[30rem] h-full flex justify-center items-center'>
							<p className='text-[#FFF] text-[1.5625rem] text-center'>
								Страница {selectedPage?.page ?? pages.length + 1}
							</p>
						</div>
						<div className='w-[36.25rem] h-full flex justify-center items-center'>
							<p className='text-[#A3A3A3] text-[1.5625rem] text-center'>
								{title}
							</p>
						</div>
					</div>

					<MangaEditorImgUpload
						title='Страница'
						img={pageImg}
						imgSrc={pageImgSrc}
						setImg={setPageImg}
						className='h-[25.8125rem]'
					/>
				</div>
			</div>

			<button
				onClick={!!selectedPage ? update : add}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				{!!selectedPage ? 'Изменить' : 'Добавить'}
			</button>
		</div>
	)
}

export default MangaPageEditor
