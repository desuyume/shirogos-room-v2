import { FC } from 'react'
import editIcon from '@/assets/admin/edit.png'
import removeIcon from '@/assets/admin/remove.png'

interface ICharacterItem {
	id: string
	name: string
	setActiveCharacterId: React.Dispatch<React.SetStateAction<string | null>>
	setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CharacterItem: FC<ICharacterItem> = ({
	id,
	name,
	setActiveCharacterId,
	setIsRemoveModalVisible,
	setIsEditorVisible,
}) => {
	const clickRemove = () => {
		setActiveCharacterId(id)
		setIsRemoveModalVisible(true)
	}

	const clickEdit = () => {
		setActiveCharacterId(id)
		setIsEditorVisible(true)
	}

	return (
		<div className='w-full h-[3.1925rem] flex items-center relative'>
			<div className='min-w-[81.25%] max-w-[81.25%] flex justify-between'>
				<div className='min-w-[23.8%] max-w-[23.8%] h-[3.375rem] bg-secondary flex justify-center items-center'>
					<p className='text-[#FFF] text-xl text-center'>{id}</p>
				</div>
				<div className='min-w-[calc(76.2%-0.5rem)] max-w-[calc(76.2%-0.5rem)] h-[3.375rem] bg-secondary flex justify-center items-center truncate'>
					<p className='text-[#FFF] text-xl text-center px-2'>{name}</p>
				</div>
			</div>

			<div className='flex-1 flex justify-center items-center'>
				<button
					onClick={clickEdit}
					className='bg-primary hover:bg-primaryHover transition-all w-[30%] aspect-square flex justify-center items-center mr-[0.56rem]'
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

export default CharacterItem
