import { RoomAppearanceContext } from '@/Context'
import { useUpdateGender } from '@/api/useUpdateGender'
import { colorVariantsDisabled } from '@/consts/roomColors'
import { FC, useContext } from 'react'

interface IChangeGender {
	gender: string
	setGender: React.Dispatch<React.SetStateAction<string>>
}

const ChangeGender: FC<IChangeGender> = ({ gender, setGender }) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	const { mutate } = useUpdateGender()

	const handleChangeGender = (gender: string) => {
		setGender(gender)
		mutate({ gender })
	}

	return (
		<div className='h-[7.75rem] border-b-[1px] border-[#646464] flex flex-col justify-center items-center'>
			<h3 className='text-primaryText text-[1.875rem] leading-[97.795%] mb-1'>
				Пол
			</h3>
			<div className='flex justify-around w-full'>
				<button
					onClick={() => handleChangeGender('MALE')}
					disabled={gender === 'MALE'}
					className={`w-[20.8%] h-[2.4375rem] bg-transparent hover:bg-secondaryHover text-primaryText hover:text-white disabled:text-white text-xl ${
						colorVariantsDisabled.bg[roomAppearance.active_room_color]
					} transition-all`}
				>
					Мужской
				</button>
				<button
					onClick={() => handleChangeGender('FEMALE')}
					disabled={gender === 'FEMALE'}
					className={`w-[20.8%] h-[2.4375rem] bg-transparent hover:bg-secondaryHover text-primaryText hover:text-white disabled:text-white text-xl ${
						colorVariantsDisabled.bg[roomAppearance.active_room_color]
					} transition-all`}
				>
					Женский
				</button>
			</div>
		</div>
	)
}

export default ChangeGender
