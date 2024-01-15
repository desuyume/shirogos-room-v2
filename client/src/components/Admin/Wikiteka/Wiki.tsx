import { FC, useEffect, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import CharactersList from './Wiki/CharactersList'
import CharacterEditor from './Wiki/CharacterEditor'
import RemoveConfirmModal from '@/components/RemoveConfirmModal'
import { useDeleteCharacter } from '@/api/useDeleteCharacter'

const Wiki: FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false)
	const [isRemoveModalVisible, setIsRemoveModalVisible] =
		useState<boolean>(false)
	const [activeCharacterId, setActiveCharacterId] = useState<string | null>(
		null
	)

	const { mutate: deleteMutate, isSuccess: isSuccessDelete } =
		useDeleteCharacter(activeCharacterId)

	const clickAdd = () => {
		setActiveCharacterId(null)
		setIsEditorVisible(true)
	}

	const removeCharacter = () => {
		deleteMutate()
	}

	useEffect(() => {
		if (isSuccessDelete) {
			setActiveCharacterId(null)
		}
	}, [isSuccessDelete])

	return (
		<div className='w-[25%]'>
			<div className='w-[81.25%] h-[2.9375rem] relative flex items-center mb-[0.63rem]'>
				<img
					className='absolute h-[2.1875rem] left-3'
					src={searchIcon}
					alt='search-icon'
				/>
				<input
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='w-full h-full bg-tertiary outline-none pl-[4.06rem] pr-2 font-secondary font-normal text-[1.5625rem] text-[#FFF]'
				/>
			</div>
			<button
				onClick={clickAdd}
				className='w-[81.25%] h-[3.125rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[1.5625rem] mb-2'
			>
				Добавить
			</button>
			<CharactersList
				searchQuery={searchQuery}
				setActiveCharacterId={setActiveCharacterId}
				setIsRemoveModalVisible={setIsRemoveModalVisible}
				setIsEditorVisible={setIsEditorVisible}
			/>

			<CharacterEditor
				isVisible={isEditorVisible}
				setIsVisible={setIsEditorVisible}
				activeCharacterId={activeCharacterId}
				setActiveCharacterId={setActiveCharacterId}
			/>
			<RemoveConfirmModal
				isVisible={isRemoveModalVisible}
				setIsVisible={setIsRemoveModalVisible}
				elementText={`Персонаж с id = ${activeCharacterId}`}
				removeFn={removeCharacter}
			/>
		</div>
	)
}

export default Wiki
