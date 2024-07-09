import { FC, useContext, useEffect, useState } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import BuyPanopticon from './BuyPanopticon'
import PanopticonPreview from './PanopticonPreview'
import { useRoomPanopticons } from '@/api/useRoomPanopticons'
import { IBuyedPanopticon } from '@/types/room.interface'
import { IPanopticon } from '@/types/panopticon.interface'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { cn } from '@/utils/cn'

const PanopticonsList: FC = () => {
	const [chosenBuyPanopticon, setChosenBuyPanopticon] =
		useState<IPanopticon | null>(null)
	const [chosenPreviewPanopticon, setChosenPreviewPanopticon] =
		useState<IBuyedPanopticon | null>(null)
	const [isBuyPanopticonVisible, setIsBuyPanopticonVisible] =
		useState<boolean>(false)
	const [isPanopticonPreviewVisible, setIsPanopticonPreviewVisible] =
		useState<boolean>(false)
	const [buyedPanopticons, setBuyedPanopticons] = useState<number[] | null>(
		null
	)
	const roomAppearance = useContext(RoomAppearanceContext)

	const {
		isLoading,
		isError,
		isSuccess,
		data: panopticons,
	} = useRoomPanopticons()

	const [filteredPanopticons, setFilteredPanopticons] = useState<IPanopticon[]>(
		[]
	)

	const handleFetchedPanopticons = (
		fetchedBuyedPanopticons: IBuyedPanopticon[] | null
	) => {
		if (fetchedBuyedPanopticons && fetchedBuyedPanopticons.length) {
			setBuyedPanopticons(fetchedBuyedPanopticons.map(p => p.Panopticon.id))
		}
	}

	const filterPanopticons = () => {
		if (panopticons) {
			setFilteredPanopticons(
				panopticons?.panopticons.filter(p => buyedPanopticons?.includes(p.id))
			) // set buyed first
			setFilteredPanopticons(prev => [
				...prev,
				...panopticons?.panopticons.filter(
					p => !buyedPanopticons?.includes(p.id) && !!p.isForSale
				),
			]) // and other panopticons then
		}
	}

	const isPanopticonBuyed = (id: number): boolean =>
		!!buyedPanopticons ? buyedPanopticons?.includes(id) : false

	const openBuyPanopticon = (panopticon: IPanopticon) => {
		setChosenBuyPanopticon(panopticon)
		setIsBuyPanopticonVisible(true)
	}

	const openPanopticonPreview = (panopticon: IPanopticon) => {
		const findedPanopticon = panopticons?.buyedPanopticons.find(
			p => p.Panopticon.id === panopticon.id
		)

		if (findedPanopticon) {
			setChosenPreviewPanopticon(findedPanopticon)
			setIsPanopticonPreviewVisible(true)
		}
	}

	useEffect(() => {
		if (!isLoading) {
			if (isSuccess) {
				handleFetchedPanopticons(panopticons?.buyedPanopticons)
				filterPanopticons()
			}
		}
	}, [isLoading])

	useEffect(() => {
		filterPanopticons()
	}, [buyedPanopticons])

	return (
		<div
			className={`w-full h-[44.875rem] ${
				colorVariants.bgRoomGradient[roomAppearance.active_room_color]
			} rounded-[1.5625rem] pt-[1.04rem] pb-[1.28rem] px-[1.31rem] flex flex-col items-center relative panopticons`}
		>
			{isLoading ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center text-xl text-primaryText'>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center text-xl text-primaryText'>Ошибка 0_0</p>
				</div>
			) : !filteredPanopticons.length || !filteredPanopticons ? (
				<div className='w-full h-full flex justify-center items-center'>
					<p className='text-center text-xl text-primaryText'>
						Паноптикумы не найдены
					</p>
				</div>
			) : (
				<>
					<BuyPanopticon
						isVisible={isBuyPanopticonVisible}
						setIsVisible={setIsBuyPanopticonVisible}
						panopticon={chosenBuyPanopticon}
						setBuyedPanopticons={setBuyedPanopticons}
					/>
					<div className='w-[41.7%] min-w-[12.5rem] h-[3.2rem] rounded-[1.5625rem] bg-tertiary flex justify-center items-center mb-[0.72rem]'>
						<h2 className='text-primaryText text-[1.5625rem]'>Паноптикум</h2>
					</div>
					<PanopticonPreview
						isVisible={isPanopticonPreviewVisible}
						setIsVisible={setIsPanopticonPreviewVisible}
						panopticon={chosenPreviewPanopticon}
					/>
					<Scrollbar
						noDefaultStyles
						className={
							(isPanopticonPreviewVisible
								? 'invisible opacity-0'
								: 'visible opacity-100') + ' w-full flex-1'
						}
					>
						<div
							className={
								' w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 min-desktop:grid-cols-4 medium-desktop:grid-cols-5 4k:grid-cols-6 gap-3 overflow-y-auto transition-all'
							}
						>
							{filteredPanopticons.map(panopticon => (
								<div
									key={panopticon.id}
									onClick={() =>
										isPanopticonBuyed(panopticon.id)
											? openPanopticonPreview(panopticon)
											: openBuyPanopticon(panopticon)
									}
									className='bg-tertiary rounded-[1.5625rem] flex justify-center items-center cursor-pointer aspect-[236/200] relative group'
								>
									<img
										className={cn(
											'rounded-[1.5625rem] min-w-full max-w-full min-h-full max-h-full transition-all',
											{
												'opacity-10 blur-[2px] group-hover:opacity-30':
													!isPanopticonBuyed(panopticon.id),
											}
										)}
										src={`${import.meta.env.VITE_SERVER_URL}/${
											panopticon.miniatureImg ?? panopticon.img
										}`}
										alt='panopticon-img'
									/>

									{isPanopticonBuyed(panopticon.id) && (
										<div className='w-full h-full rounded-[1.5625rem] bg-black bg-opacity-70 absolute inset-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all flex justify-center items-center'>
											<p className='text-primaryText text-[1.3vw] text-opacity-[0.55] text-center max-w-full break-words'>
												ПОСМОТРЕТЬ
											</p>
										</div>
									)}

									{!isPanopticonBuyed(panopticon.id) && (
										<p className='text-[#EBE984] text-xl text-center leading-[97.795%] absolute'>
											{panopticon.cost} ДО
										</p>
									)}
								</div>
							))}
						</div>
					</Scrollbar>
				</>
			)}
		</div>
	)
}

export default PanopticonsList
