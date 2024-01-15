import { FC } from 'react'
import CharacterItem from './CharacterItem'
import { useAllCharacter } from '@/api/useAllCharacter'
import { Scrollbar } from 'react-scrollbars-custom'

interface ICharactersList {
	searchQuery: string
	setActiveCharacterId: React.Dispatch<React.SetStateAction<string | null>>
	setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CharactersList: FC<ICharactersList> = ({
	searchQuery,
	setActiveCharacterId,
	setIsRemoveModalVisible,
	setIsEditorVisible
}) => {
	const { data: characters, isLoading, isError } = useAllCharacter()

	return (
		<div className='w-full h-[51.5625rem] flex flex-col'>
			<div className='w-[81.25%] flex'>
				<div className='w-[24%] bg-secondary mr-2'>
					<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
						<p className='text-[#FFF] text-[1.5625rem] text-center'>ID</p>
					</div>
				</div>
				<div className='flex-1 bg-secondary'>
					<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
						<p className='text-[#FFF] text-[1.5625rem] text-center'>Персонаж</p>
					</div>
				</div>
			</div>

			<div className='w-full h-full flex flex-col items-center'>
				{isLoading ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText text-xl leading-[97.795%] text-center'>
							Загрузка...
						</p>
					</div>
				) : isError ? (
					<div className='w-full h-full flex justify-center items-center'>
						<p className='text-primaryText text-xl leading-[97.795%] text-center'>
							Ошибка
						</p>
					</div>
				) : (
					<Scrollbar noDefaultStyles style={{ width: '100%', height: '100%' }}>
						<div>
							{characters
								.filter(character =>
									character.name
										.toLowerCase()
										.includes(searchQuery.toLowerCase())
								)
								.map(character => (
									<CharacterItem
										key={character.id}
										id={character.id}
										name={character.name}
										setActiveCharacterId={setActiveCharacterId}
										setIsRemoveModalVisible={setIsRemoveModalVisible}
										setIsEditorVisible={setIsEditorVisible}
									/>
								))}
						</div>
					</Scrollbar>
				)}
			</div>
		</div>
	)
}

export default CharactersList
