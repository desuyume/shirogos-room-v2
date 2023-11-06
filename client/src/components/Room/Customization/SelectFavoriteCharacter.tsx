import { useChooseFavoriteCharacter } from '@/api/useChooseFavoriteCharacter'
import { useRoomCharacters } from '@/api/useRoomCharacters'
import { ICharacterName } from '@/types/room.interface'
import { FC, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const SelectFavoriteCharacter: FC = () => {
	const [selectedCharacter, setSelectedCharacter] = useState<number | null>(
		null
	)

	const {
		isLoading,
		isError,
		isSuccess,
		data: characters,
	} = useRoomCharacters()
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
		<div className='h-[9.9375rem] w-full bg-secondary rounded-t-[1.0625rem] select-character'>
			<div className='h-[2.8125rem] bg-tertiary rounded-[1.0625rem] flex justify-center items-center'>
				<p className='text-primaryText text-center text-lg fullhd:text-xl'>
					Любимый персонаж
				</p>
			</div>
			{isLoading ? (
				<div className='w-full h-[7.1rem] flex justify-center items-center'>
					<p className='text-primaryText text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-[7.1rem] flex justify-center items-center'>
					<p className='text-primaryText text-center'>Ошибка 0_0</p>
				</div>
			) : (
				<Scrollbar noDefaultStyles style={{ height: '7.1rem' }}>
					{characters?.characterNames.map(character => (
						<div className='w-full flex justify-center first-of-type:pt-1 last-of-type:pb-1 '>
							<p
								key={character.id}
								onClick={() => clickCharacter(character)}
								className={
									(selectedCharacter === character.id
										? 'text-[#EBE984] '
										: 'text-primaryText ') +
									'text-xs text-center cursor-pointer hover:text-[#EBE984] transition-colors'
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
