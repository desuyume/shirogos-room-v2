import { FC, useEffect, useState } from 'react'
import lockImg from '@/assets/room/lock.png'
import { useUserRoomColors } from '@/api/useUserRoomColors'
import { IRoomColor } from '@/types/room.interface'
import { useBuyRoomColor } from '@/api/useBuyRoomColor'

interface IBuyColor {
	type: string
}

const BuyColor: FC<IBuyColor> = ({ type }) => {
	const [cost, setCost] = useState<number>(0)
	const [selectedColor, setSelectedColor] = useState<string | null>(null)
	const [allColors, setAllColors] = useState<IRoomColor[] | null>(null)

	const {
		data: roomColors,
		isLoading,
		isError,
		isSuccess,
	} = useUserRoomColors()
	const { mutate, isSuccess: isBuySucces } = useBuyRoomColor(type)

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

	const chooseColor = (color: IRoomColor) => {
		if (!checkColor(color)) {
			setCost(color.cost)
		} else {
			setCost(0)
		}
		setSelectedColor(color.name)
	}

	const clickBuy = () => {
		const color = roomColors?.roomColors.find(obj => obj.name === selectedColor)

		if (color) {
			mutate({ roomColorId: color.id, cost })
		}
	}

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
		<div className='w-[48.7%] h-[21.5625rem] bg-room-gradient rounded-[1.5625rem] pt-[0.68rem] flex flex-col justify-between items-center'>
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
						{allColors?.map(color => (
							<div
								key={color.id}
								style={{ backgroundColor: color.hex }}
								className={
									(selectedColor === color.name
										? 'border-2 border-[#F8FEFA] scale-[107%] transition-transform '
										: '') +
									'min-h-[30%] max-h-[30%] 2k:min-h-[40%] 2k:max-h-[40%] rounded-[1.125rem] aspect-square flex justify-center items-center cursor-pointer'
								}
								onClick={() => chooseColor(color)}
							>
								{!checkColor(color) && (
									<img className='w-[66%]' src={lockImg} alt='lock-icon' />
								)}
							</div>
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
					className='h-full flex-1 bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-primaryText text-xs disabled:bg-tertiary rounded-br-[1.2rem]'
				>
					Купить
				</button>
			</div>
		</div>
	)
}

export default BuyColor
