import { RoomAppearanceContext } from '@/Context'
import { useUpdateUsername } from '@/api/useUpdateUsername'
import {
	colorVariants,
	colorVariantsFocus,
	colorVariantsHover,
} from '@/consts/roomColors'
import { useToastOnError } from '@/hooks/useToast'
import { usernameAlreadyExistsToast, usernameLengthToast } from '@/utils/toasts'
import { FC, useContext } from 'react'

interface IChangeUsername {
	initialValue: string
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const ChangeUsername: FC<IChangeUsername> = ({
	initialValue,
	value,
	setValue,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	const { mutate, error } = useUpdateUsername()

	const updateUsername = () => {
		if (value.length < 3 || value.length > 25) {
			usernameLengthToast()
		} else {
			mutate({ username: value })
		}
	}

	useToastOnError(error, usernameAlreadyExistsToast)

	return (
		<div className='h-[7.75rem] flex justify-between items-center border-b-[1px] border-[#646464]'>
			<div className='flex flex-1 flex-col justify-center items-center'>
				<h3 className='text-[1.875rem] leading-[97.795%] text-primaryText mb-5'>
					Никнейм
				</h3>
				<input
					className={`outline-none bg-transparent w-[11.6875rem] border-b-[0.1875rem] pb-3 px-2 ${
						colorVariants.border[roomAppearance.active_room_color]
					} text-center text-[#FFF] text-[0.9375rem] leading-[97.795%] ${
						colorVariantsFocus.border[roomAppearance.active_room_color]
					} ${
						colorVariantsHover.border[roomAppearance.active_room_color]
					} transition-all`}
					value={value}
					onChange={e => setValue(e.target.value)}
				/>
			</div>
			<button
				disabled={initialValue === value}
				className={`w-[8rem] h-[85%] ${
					colorVariants.bg[roomAppearance.active_room_color]
				} ${
					colorVariantsHover.bg[roomAppearance.active_room_color]
				} transition-all text-primaryText hover:text-white hover:disabled:text-primaryText text-[0.9375rem] mr-[2.73rem] disabled:bg-secondaryHover`}
				onClick={updateUsername}
			>
				Сохранить
			</button>
		</div>
	)
}

export default ChangeUsername
