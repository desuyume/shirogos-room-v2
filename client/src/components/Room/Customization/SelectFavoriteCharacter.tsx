import { RoomAppearanceContext } from '@/Context'
import { useChooseFavoriteCharacter } from '@/api/useChooseFavoriteCharacter'
import { useRoomCharacters } from '@/api/useRoomCharacters'
import { ICharacterName } from '@/types/room.interface'
import { FC, useContext, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const SelectFavoriteCharacter: FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const { isLoading, isError, isSuccess, data: characters } = useRoomCharacters()
  const { mutate } = useChooseFavoriteCharacter()

  const clickCharacter = (character: ICharacterName) => {
    mutate({ characterId: character.id })
    setSelectedCharacter(character.id)
  }

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        setSelectedCharacter(characters.favoriteCharacter?.id ?? null)
      }
    }
  }, [isLoading])

  return (
    <div className='select-character h-[9.9375rem] w-full rounded-t-[1.0625rem] bg-secondary'>
      <div className='flex h-[2.8125rem] items-center justify-center rounded-[1.0625rem] bg-tertiary'>
        <p className='px-2 text-center text-lg leading-none text-primaryText fullhd:text-xl'>
          Любимый персонаж
        </p>
      </div>
      {isLoading ? (
        <div className='flex h-[7.1rem] w-full items-center justify-center'>
          <p className='text-center text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-[7.1rem] w-full items-center justify-center'>
          <p className='text-center text-primaryText'>Ошибка 0_0</p>
        </div>
      ) : (
        <Scrollbar
          noDefaultStyles
          style={{ height: '7.1rem' }}
          className={`${roomAppearance.active_room_color}-scrollbar`}
        >
          {characters?.characterNames.map((character) => (
            <div
              key={character.id}
              className='flex w-full justify-center first-of-type:pt-1 last-of-type:pb-1 '
            >
              <p
                onClick={() => clickCharacter(character)}
                className={
                  (selectedCharacter === character.id ? 'text-[#EBE984] ' : 'text-primaryText ') +
                  'cursor-pointer text-center text-xs transition-colors hover:text-[#EBE984]'
                }
              >
                {character.name}
              </p>
            </div>
          ))}
        </Scrollbar>
      )}
    </div>
  )
}

export default SelectFavoriteCharacter
