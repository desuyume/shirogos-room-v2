import { RoomAppearanceContext } from '@/Context'
import { useBuyPanopticon } from '@/api/useBuyPanopticon'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { IPanopticon } from '@/types/panopticon.interface'
import { FC, useContext, useEffect } from 'react'

interface IBuyPanopticon {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	panopticon: IPanopticon | null
	setBuyedPanopticons: React.Dispatch<React.SetStateAction<number[] | null>>
}

const BuyPanopticon: FC<IBuyPanopticon> = ({
	isVisible,
	setIsVisible,
	panopticon,
	setBuyedPanopticons,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	const { mutate, isSuccess } = useBuyPanopticon()

	const buyPanopticon = () => {
		if (panopticon) {
			mutate({ panopticonId: panopticon?.id })
		}
	}

	useEffect(() => {
		if (isSuccess && panopticon) {
			console.log('gdfgfd')

			setBuyedPanopticons(prev =>
				!!prev ? [...prev, panopticon?.id] : [panopticon?.id]
			)
			setIsVisible(false)
		}
	}, [isSuccess])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-full h-full absolute inset-0 transition-all z-40'
			}
		>
			<div
				className={`w-full h-[24rem] ${
					colorVariants.bgRoomGradientRevert[roomAppearance.active_room_color]
				} transition-all z-30 top-[50%] translate-y-[50%] pt-6 flex flex-col items-center`}
			>
				<p className='text-primaryText text-[2.5rem] text-center leading-[97.795%] mb-4'>
					Уверен/а???
				</p>
				<div className='w-[12.8125rem] aspect-[236/200] border-4 border-[#EBE984] rounded-[1.5625rem] bg-tertiary relative flex items-center justify-center mb-4'>
					<img
						className='w-full h-full rounded-[1.5625rem] opacity-10 blur-[2px]'
						src={`${import.meta.env.VITE_SERVER_URL}/${
							panopticon?.miniatureImg ?? panopticon?.img
						}`}
						alt='panopticon-img'
					/>
					<p className='text-[#EBE984] text-xl leading-[97.795%] text-center absolute'>
						{panopticon?.cost} ДО
					</p>
				</div>
				<div className='w-full flex justify-center'>
					<button
						onClick={buyPanopticon}
						className={`w-[12.45%] min-w-[9rem] h-[3.73rem] ${
							colorVariants.bg[roomAppearance.active_room_color]
						} ${
							colorVariantsHover.bg[roomAppearance.active_room_color]
						} text-primaryText text-[1.5625rem] transition-all mr-[0.64rem]`}
					>
						ДАН
					</button>
					<button
						onClick={() => setIsVisible(false)}
						className='w-[12.45%] min-w-[9rem] h-[3.73rem] bg-tertiary hover:bg-secondaryHover text-primaryText text-[1.5625rem] transition-all'
					>
						НЕ ДАН
					</button>
				</div>
			</div>
		</div>
	)
}

export default BuyPanopticon
