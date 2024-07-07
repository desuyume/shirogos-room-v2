import { FC, useContext, useEffect, useState } from 'react'
import { useUserRoomColors } from '@/api/useUserRoomColors'
import { IRoomColor } from '@/types/room.interface'
import { useBuyRoomColor } from '@/api/useBuyRoomColor'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'

interface IBuyColor {
	type: string
}

const BuyColor: FC<IBuyColor> = ({ type }) => {
	const [cost, setCost] = useState<number>(0)
	const [selectedColor, setSelectedColor] = useState<string | null>(null)
	const [allColors, setAllColors] = useState<IRoomColor[] | null>(null)
	const roomAppearance = useContext(RoomAppearanceContext)

	const {
		data: roomColors,
		isLoading,
		isError,
		isSuccess,
	} = useUserRoomColors()
	const { mutate, isSuccess: isBuySucces, error } = useBuyRoomColor(type)

	const checkColor = (color: IRoomColor) => {
		if (type === 'room') {
			return roomColors?.userColors.room_colors.some(obj => obj === color.name)
		}

		if (type === 'username') {
			return roomColors?.userColors.username_colors.some(
				obj => obj === color.name
			)
		}
	}

	const toggleColor = (color: IRoomColor) => {
		if (selectedColor === color.name) {
			setCost(0)
			setSelectedColor(null)
		} else {
			setCost(color.cost)
			setSelectedColor(color.name)
		}
	}

	const clickBuy = () => {
		const color = roomColors?.roomColors.find(obj => obj.name === selectedColor)

		if (color) {
			mutate({ roomColorId: color.id, cost })
		}
	}

	useToastOnSuccess(isBuySucces, successBuyToast)
	useToastOnError(error, notEnoughDangoToast)

	useEffect(() => {
		if (!isLoading) {
			if (isSuccess) {
				setAllColors(
					type === 'room' ? roomColors.roomColors : roomColors.usernameColors
				)
			}
		}
	}, [isLoading])

	useEffect(() => {
		if (isBuySucces) {
			setCost(0)
		}
	}, [isBuySucces])

	return (
		<div
			className={`w-[48.7%] h-[21.5625rem] ${
				colorVariants.bgRoomGradient[roomAppearance.active_room_color]
			} rounded-[1.5625rem] pt-[0.68rem] flex flex-col justify-between items-center`}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-center'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-primaryText text-center'>Ошибка</p>
				</div>
			) : (
				<>
					<div className='bg-tertiary flex justify-center items-center min-w-[60%] max-w-[60%] min-h-[5.6rem] max-h-[5.6rem] rounded-[1.5625rem]'>
						<p className='text-primaryText text-xl text-center leading-[97.795%] px-2'>
							{type === 'room' ? 'Цветовая тема аккаунта' : 'Цвет никнейма'}
						</p>
					</div>
					<div className='laptop:h-[40%] min-desktop:h-[44%] medium-desktop:h-[52%] fullhd:h-[57.5%] 2k:h-[30%] flex justify-center items-center flex-wrap gap-[3%]'>
						{allColors
							?.filter(color => color.name !== 'pink')
							.map(color => (
								<button
									key={color.id}
									style={{ backgroundColor: color.hex }}
									className={
										(selectedColor === color.name
											? 'border-2 border-[#F8FEFA] scale-[107%] transition-transform '
											: '') +
										(checkColor(color)
											? 'opacity-0 invisible '
											: 'opacity-100 visible ') +
										'min-h-[30%] max-h-[30%] 2k:min-h-[40%] 2k:max-h-[40%] rounded-[1.125rem] aspect-square flex justify-center items-center cursor-pointer transition-all'
									}
									onClick={() => toggleColor(color)}
								/>
							))}
					</div>
				</>
			)}
			<div className='w-full min-h-[2.6875rem] flex'>
				<div className='w-[31%] h-full bg-tertiary flex justify-center items-center rounded-bl-[1.2rem]'>
					<p className='text-primaryText text-[0.8125rem] text-center leading-[97.795%]'>
						К оплате:
					</p>
				</div>
				<div className='w-[43.5%] h-full bg-secondary flex justify-center items-center'>
					<p className='text-[#EBE984] text-[0.9375rem] leading-[97.795%] text-center'>
						{cost} ДО
					</p>
				</div>
				<button
					disabled={cost <= 0}
					onClick={clickBuy}
					className={`h-full flex-1 ${
						colorVariants.bg[roomAppearance.active_room_color]
					} ${
						colorVariantsHover.bg[roomAppearance.active_room_color]
					} transition-all flex justify-center items-center text-primaryText text-xs disabled:bg-tertiary rounded-br-[1.2rem]`}
				>
					Купить
				</button>
			</div>
		</div>
	)
}

export default BuyColor
