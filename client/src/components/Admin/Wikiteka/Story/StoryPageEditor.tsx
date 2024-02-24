import TextEditor from '@/components/TextEditor'
import { storyPageEditorOptions } from '@/consts/reactQuillOptions'
import { IStoryPage } from '@/types/story.interface'
import { FC, useEffect, useState } from 'react'

interface IStoryPageEditor {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	selectedPage: IStoryPage | null
	pages: IStoryPage[]
	setPages: React.Dispatch<React.SetStateAction<IStoryPage[]>>
}

const StoryPageEditor: FC<IStoryPageEditor> = ({
	isVisible,
	setIsVisible,
	selectedPage,
	pages,
	setPages,
}) => {
	const [text, setText] = useState<string>('')

	const add = () => {
		const prevPage = pages[pages.length - 1]

		if (!!prevPage) {
			setPages([
				...pages,
				{ id: prevPage.id + 1, text, page_num: prevPage.page_num + 1 },
			])
		} else {
			setPages([{ id: 1, text, page_num: 1 }])
		}

		setIsVisible(false)
		setText('')
	}

	const update = () => {
		const updatedPages = pages.map(page => {
			if (page.id === selectedPage?.id) {
				return { ...page, text }
			}
			return page
		})
		setPages(updatedPages)

		setIsVisible(false)
		setText('')
	}

	useEffect(() => {
		if (selectedPage) {
			setText(selectedPage.text)
		} else {
			setText('')
		}
	}, [selectedPage, isVisible])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'bg-tertiary w-full h-[60.625rem] absolute inset-0 flex justify-center transition-all px-8 pt-[1.94rem] story'
			}
		>
			<button
				onClick={() => setIsVisible(false)}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				Назад
			</button>

			<div className='flex-1 flex flex-col justify-center items-center h-[57.3125rem] mx-8'>
				<div className='w-full h-full bg-secondary border-[5px] border-primary flex flex-col items-center justify-center relative px-[1.625rem] pb-[1.5625rem]'>
					<p className='text-[#FFF] text-[1.5625rem] py-4'>
						Страница{' '}
						{!!selectedPage
							? selectedPage.page_num
							: pages.length > 0
							? pages[pages.length - 1].page_num + 1
							: 1}
					</p>
					<div className='w-full h-full bg-tertiary border-primary border-[5px]'>
						<TextEditor
							value={text}
							setValue={setText}
							toolbarOptions={storyPageEditorOptions.toolbarOptions}
						/>
					</div>
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

export default StoryPageEditor
