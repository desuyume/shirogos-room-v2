import { RoomAppearanceContext } from '@/Context'
import { useBuyPanopticon } from '@/api/useBuyPanopticon'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { useToastOnError, useToastOnSuccess } from '@/hooks/useToast'
import { IPanopticon } from '@/types/panopticon.interface'
import { cn } from '@/utils/cn'
import { notEnoughDangoToast, successBuyToast } from '@/utils/toasts'
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

	const { mutate, isSuccess, error } = useBuyPanopticon()

	const buyPanopticon = () => {
		if (panopticon) {
			mutate({ panopticonId: panopticon?.id })
		}
	}

	useToastOnSuccess(isSuccess, successBuyToast)
	useToastOnError(error, notEnoughDangoToast)

	useEffect(() => {
		if (isSuccess && panopticon) {
			setBuyedPanopticons(prev =>
				!!prev ? [...prev, panopticon?.id] : [panopticon?.id]
			)
			setIsVisible(false)
		}
	}, [isSuccess])

	return (
		<div
			className={cn('w-full h-full absolute inset-0 transition-all z-40', {
				'opacity-100 visible': isVisible,
				'opacity-0 invisible': !isVisible,
			})}
		>
			<div
				className={`w-full h-[22rem] ${
					colorVariants.bgRoomGradientRevert[roomAppearance.active_room_color]
				} transition-all z-30 top-[50%] translate-y-[50%] pt-7 flex flex-col items-center`}
			>
				<p className='text-primaryText text-[2.5rem] text-center leading-7 mb-[1.0625rem]'>
					Покупаем?
				</p>
				<div className='w-[12.8125rem] aspect-[236/200] border-4 border-[#EBE984] rounded-[1.5625rem] bg-tertiary relative flex items-center justify-center mb-4'>
					<img
						className='w-full h-full rounded-[1.5625rem] opacity-10 blur-[2px]'
						src={`${import.meta.env.VITE_SERVER_URL}/${
							panopticon?.miniatureImg ?? panopticon?.img
						}`}
						alt='panopticon-img'
					/>
					<p className='text-[#EBE984] text-xl leading-none text-center absolute px-2'>
						{panopticon?.cost} ДО
					</p>
				</div>
				<div className='w-full flex justify-center'>
					<button
						onClick={buyPanopticon}
						className={`w-[12.6%] min-w-[7rem] h-[3.75rem] ${
							colorVariants.bg[roomAppearance.active_room_color]
						} ${
							colorVariantsHover.bg[roomAppearance.active_room_color]
						} text-primaryText hover:text-white text-[1.5625rem] rounded-l-[2.125rem] transition-all mr-2.5`}
					>
						ДАН
					</button>
					<button
						onClick={() => setIsVisible(false)}
						className='w-[12.6%] min-w-[7rem] h-[3.75rem] bg-tertiary hover:bg-secondaryHover text-primaryText hover:text-white text-[1.5625rem] text-center leading-none px-2 rounded-r-[2.125rem] transition-all'
					>
						НЕ ДАН
					</button>
				</div>
			</div>
		</div>
	)
}

export default BuyPanopticon
