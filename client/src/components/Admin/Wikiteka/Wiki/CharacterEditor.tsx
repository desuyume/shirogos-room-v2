import { FC, useEffect, useState } from 'react'
import EditorMainInfo from './EditorMainInfo'
import EditorBlocks from './EditorBlocks'
import CharacteristicEditor from './CharacteristicEditor'
import {
	ICategory,
	ICharacteristic,
	IDescription,
} from '@/types/wiki.interface'
import DescriptionEditor from './DescriptionEditor'
import { useCreateCharacter } from '@/api/useCreateCharacter'
import { useCharacter } from '@/api/useCharacter'
import { useUpdateCharacter } from '@/api/useUpdateCharacter'
import CharacterCategoryModal from './CharacterCategoryModal'

interface ICharacterEditor {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	activeCharacterId: string | null
	setActiveCharacterId: React.Dispatch<React.SetStateAction<string | null>>
}

const CharacterEditor: FC<ICharacterEditor> = ({
	isVisible,
	setIsVisible,
	activeCharacterId,
	setActiveCharacterId
}) => {
	const [isDescEditorOpen, setIsDescEditorOpen] = useState<boolean>(false)
	const [isCharacteristicEditorOpen, setIsCharacteristicEditorOpen] =
		useState<boolean>(false)
	const [isCategoryModalVisible, setIsCategoryModalVisible] =
		useState<boolean>(false)

	const [id, setId] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [subtitle, setSubtitle] = useState<string>('')
	const [subsubtitle, setSubsubtitle] = useState<string>('')
	const [category, setCategory] = useState<ICategory | null>(null)

	const [avatar, setAvatar] = useState<File | null>(null)
	const [miniature, setMiniature] = useState<File | null>(null)

	const [descriptions, setDescriptions] = useState<IDescription[]>([])
	const [selectedDescription, setSelectedDescription] =
		useState<IDescription | null>(null)

	const [characteristics, setCharacteristics] = useState<ICharacteristic[]>([])
	const [selectedCharacteristic, setSelectedCharacteristic] =
		useState<ICharacteristic | null>(null)

	const { mutate: createCharacter, isSuccess: isSuccessCreate } =
		useCreateCharacter()
	const { mutate: updateCharacter, isSuccess: isSuccessUpdate } =
		useUpdateCharacter(activeCharacterId)
	const {
		data: character,
		isLoading: isCharacterLoading,
		isError: isCharacterError,
	} = useCharacter(activeCharacterId)

	const saveCharacter = async () => {
		const data = new FormData()

		if (!name) {
			console.log('Name is required')
			return
		}
		if (!id) {
			console.log('ID is required')
			return
		}

		data.append('id', id)
		data.append('name', name)
		data.append('subTitle', subtitle)
		data.append('subSubTitle', subsubtitle)
		if (!!category) {
			data.append('categoryId', category.id.toString())
		}
		if (avatar) {
			data.append('originalImg', avatar)
		}
		if (miniature) {
			data.append('miniatureImg', miniature)
		}
		data.append('characterDescriptions', JSON.stringify(descriptions))
		data.append('characterCharacteristics', JSON.stringify(characteristics))

		if (!!activeCharacterId) {
			updateCharacter(data)
		} else {
			createCharacter(data)
		}
	}

	const setCharacter = () => {
		if (!character) return

		setId(character.id)
		setName(character.name)
		setSubtitle(character.subTitle ?? '')
		setSubsubtitle(character.subSubTitle ?? '')
		setCategory(!!character.category ? character.category : null)
		setDescriptions(character.characterDescriptions ?? [])
		setCharacteristics(character.characterCharacteristics ?? [])
	}

	const clearFields = () => {
		setId('')
		setName('')
		setSubtitle('')
		setSubsubtitle('')
		setCategory(null)
		setAvatar(null)
		setMiniature(null)
		setDescriptions([])
		setCharacteristics([])
	}

	useEffect(() => {
		if (isSuccessCreate || isSuccessUpdate) {
			setIsVisible(false)
			clearFields()
			setActiveCharacterId(null)
		}
	}, [isSuccessCreate, isSuccessUpdate])

	useEffect(() => {
		if (!!activeCharacterId && !!character) {
			setCharacter()
		} else {
			clearFields()
		}
	}, [character])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'bg-tertiary w-full h-[60.625rem] border-t-[1px] border-t-primary absolute inset-0 top-[5.25rem] flex justify-center transition-all px-8 pt-[1.94rem] z-20'
			}
		>
			<button
				onClick={() => setIsVisible(false)}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				Назад
			</button>
			<div className='flex-1 h-full mx-8 mt-2'>
				{!!activeCharacterId && isCharacterLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-xl'>Загрузка...</p>
					</div>
				) : !!activeCharacterId && isCharacterError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-xl'>Ошибка</p>
					</div>
				) : (
					<>
						<EditorMainInfo
							{...{
								id,
								setId,
								name,
								setName,
								subtitle,
								setSubtitle,
								subsubtitle,
								setSubsubtitle,
								category,
								setCategory,
								avatar,
								setAvatar,
								setMiniature,
								setIsCategoryModalVisible,
							}}
						/>
						<EditorBlocks
							blocks={descriptions}
							setSelectedBlock={setSelectedDescription}
							setIsEditorVisible={setIsDescEditorOpen}
							title='Блоки описания'
						/>
						<EditorBlocks
							blocks={characteristics}
							setSelectedBlock={setSelectedCharacteristic}
							setIsEditorVisible={setIsCharacteristicEditorOpen}
							title='Блоки характеристик'
						/>
					</>
				)}
			</div>
			<button
				onClick={saveCharacter}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				{!!activeCharacterId ? 'Изменить' : 'Добавить'}
			</button>

			<DescriptionEditor
				selectedBlock={selectedDescription}
				isVisible={isDescEditorOpen}
				setIsVisible={setIsDescEditorOpen}
				setBlocks={setDescriptions}
			/>
			<CharacteristicEditor
				selectedBlock={selectedCharacteristic}
				isVisible={isCharacteristicEditorOpen}
				setIsVisible={setIsCharacteristicEditorOpen}
				setBlocks={setCharacteristics}
			/>
			<CharacterCategoryModal
				isVisible={isCategoryModalVisible}
				setIsVisible={setIsCategoryModalVisible}
				category={category}
				setCategory={setCategory}
			/>
		</div>
	)
}

export default CharacterEditor
