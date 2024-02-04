import { FC } from 'react'
import editIcon from '@/assets/admin/edit.png'
import removeIcon from '@/assets/admin/remove.png'
import { IManga } from '@/types/manga.interface'

interface IMangaItem {
	manga: IManga
	setSelectedManga: React.Dispatch<React.SetStateAction<IManga | null>>
	setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditManga: React.Dispatch<React.SetStateAction<boolean>>
}

const MangaItem: FC<IMangaItem> = ({
	manga,
	setSelectedManga,
	setIsEditorVisible,
	setIsRemoveModalVisible,
	setIsEditManga
}) => {
	const clickEdit = () => {
		setSelectedManga(manga)
		setIsEditorVisible(true)
		setIsEditManga(true)
	}

	const clickRemove = () => {
		setSelectedManga(manga)
		setIsRemoveModalVisible(true)
	}

	return (
		<div key={manga.id} className='w-full h-[3.125rem] flex items-center'>
			<div className='w-[86.9%] h-full flex'>
				<div className='w-[67%] h-full bg-secondary mr-2 flex justify-center items-center'>
					<p className='text-[#FFF] text-xl text-center px-2 leading-none'>
						{manga.title}
					</p>
				</div>
				<div className='flex-1 h-full bg-secondary flex justify-center items-center'>
					<p className='text-[#FFF] text-xl px-2'>{manga.chapter}</p>
				</div>
			</div>

			<div className='flex-1 h-full flex justify-center items-center'>
				<button
					onClick={clickEdit}
					className='bg-primary hover:bg-primaryHover transition-all w-[30%] aspect-square flex justify-center items-center mr-2'
				>
					<img className='w-[75%]' src={editIcon} alt='edit-icon' />
				</button>
				<button
					onClick={clickRemove}
					className='bg-tertiary hover:bg-opacity-80 transition-all w-[30%] aspect-square flex justify-center items-center'
				>
					<img className='w-[75%]' src={removeIcon} alt='remove-icon' />
				</button>
			</div>
		</div>
	)
}

export default MangaItem
