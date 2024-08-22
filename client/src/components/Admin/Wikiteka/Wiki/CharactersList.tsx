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
    <div className='flex h-[51.5625rem] w-full flex-col'>
      <div className='flex w-[81.25%]'>
        <div className='mr-2 w-[24%] bg-secondary'>
          <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
            <p className='text-center text-[1.5625rem] text-[#FFF]'>ID</p>
          </div>
        </div>
        <div className='flex-1 bg-secondary'>
          <div className='flex h-[3.375rem] w-full items-center justify-center bg-tertiary'>
            <p className='text-center text-[1.5625rem] text-[#FFF]'>Персонаж</p>
          </div>
        </div>
      </div>

      <div className='flex h-full w-full flex-col items-center'>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-xl leading-[97.795%] text-primaryText'>Загрузка...</p>
          </div>
        ) : isError ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-center text-xl leading-[97.795%] text-primaryText'>Ошибка</p>
          </div>
        ) : (
          <Scrollbar noDefaultStyles style={{ width: '100%', height: '100%' }}>
            <div>
              {characters
                .filter((character) =>
                  character.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((character) => (
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
