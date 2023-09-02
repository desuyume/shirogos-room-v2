import { FC, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

const SelectFavoriteCharacter: FC = () => {
	const [selectedCharacter, setSelectedCharacter] = useState<number>(4)
	const characters = [
		'Бинкс',
		'Кристал Ширен',
		'Курого',
		'Оленяша',
		'Сэм Аврорус',
		'Широго',
		'Широго',
		'Широго',
		'Широго',
		'Широго',
		'Широго',
		'Широго',
		'Широго',
		'Широго',
	]

	return (
		<div className='h-[9.9375rem] w-full bg-secondary rounded-t-[1.0625rem] select-character'>
			<div className='h-[2.8125rem] bg-tertiary rounded-[1.0625rem] flex justify-center items-center'>
				<p className='text-primaryText text-center text-lg fullhd:text-xl'>
					Любимый персонаж
				</p>
			</div>
			<Scrollbar noDefaultStyles style={{ height: '7.1rem' }}>
				{characters.map((character, index) => (
					<div className='w-full flex justify-center first-of-type:pt-1 last-of-type:pb-1 '>
						<p
							key={index}
							onClick={() => setSelectedCharacter(index)}
							className={
								(selectedCharacter === index
									? 'text-[#EBE984] '
									: 'text-primaryText ') +
								'text-xs text-center cursor-pointer hover:text-[#EBE984] transition-colors'
							}
						>
							{character}
						</p>
					</div>
				))}
			</Scrollbar>
		</div>
	)
}

export default SelectFavoriteCharacter
