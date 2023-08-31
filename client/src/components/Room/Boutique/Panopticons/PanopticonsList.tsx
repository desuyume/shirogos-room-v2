import { FC, useEffect, useState } from 'react'
import panopticon1 from '@/assets/room/panopticon1.png'
import panopticon2 from '@/assets/room/panopticon2.png'
import { Scrollbar } from 'react-scrollbars-custom'
import { IPanopticon } from '@/types/panopticon.interface'
import BuyPanopticon from './BuyPanopticon'

const PanopticonsList: FC = () => {
	const [chosenPanopticon, setChosenPanopticon] = useState<IPanopticon | null>(
		null
	)
	const [isBuyPanopticonVisible, setIsBuyPanopticonVisible] =
		useState<boolean>(false)
	const [buyedPanopticons, setBuyedPanopticons] = useState<number[] | null>([1, 5])
	const panopticons = [
		{ id: 1, img: panopticon1, cost: 50 },
		{ id: 2, img: panopticon2, cost: 150 },
		{ id: 3, img: panopticon2, cost: 150 },
		{ id: 4, img: panopticon2, cost: 250 },
		{ id: 5, img: panopticon2, cost: 350 },
		{ id: 6, img: panopticon2, cost: 450 },
		{ id: 7, img: panopticon2, cost: 50 },
		{ id: 8, img: panopticon2, cost: 50 },
		{ id: 9, img: panopticon2, cost: 50 },
		{ id: 10, img: panopticon2, cost: 50 },
		{ id: 11, img: panopticon1, cost: 50 },
		{ id: 12, img: panopticon2, cost: 50 },
		{ id: 13, img: panopticon2, cost: 50 },
		{ id: 14, img: panopticon2, cost: 50 },
		{ id: 15, img: panopticon2, cost: 50 },
		{ id: 16, img: panopticon2, cost: 50 },
		{ id: 17, img: panopticon2, cost: 50 },
		{ id: 18, img: panopticon2, cost: 50 },
	]
	const [filteredPanopticons, setFilteredPanopticons] = useState<IPanopticon[]>(
		[]
	)

	const filterPanopticons = () => {
		setFilteredPanopticons(
			panopticons.filter(p => buyedPanopticons?.includes(p.id))
		)
		setFilteredPanopticons(prev => [
			...prev,
			...panopticons.filter(p => !buyedPanopticons?.includes(p.id)),
		])
	}

	const isPanopticonBuyed = (id: number) => buyedPanopticons?.includes(id)

	const openBuyPanopticon = (panopticon: IPanopticon) => {
		if (!isPanopticonBuyed(panopticon.id)) {
			setChosenPanopticon(panopticon)
			setIsBuyPanopticonVisible(true)
		}
	}

	useEffect(() => {
		filterPanopticons()
	}, [buyedPanopticons])

	return (
		<div className='w-full h-[44.875rem] bg-room-gradient rounded-[1.5625rem] pt-[1.04rem] pb-[1.28rem] px-[1.31rem] flex flex-col items-center relative panopticons'>
			<BuyPanopticon
				isVisible={isBuyPanopticonVisible}
				setIsVisible={setIsBuyPanopticonVisible}
				panopticon={chosenPanopticon}
				setBuyedPanopticons={setBuyedPanopticons}
			/>
			<div className='w-[41.7%] min-w-[12.5rem] h-[3.2rem] rounded-[1.5625rem] bg-tertiary flex justify-center items-center mb-[0.72rem]'>
				<h2 className='text-primaryText text-[1.5625rem]'>Паноптикум</h2>
			</div>
			<Scrollbar noDefaultStyles className='w-full flex-1'>
				<div className='w-full grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 min-desktop:grid-cols-4 medium-desktop:grid-cols-5 4k:grid-cols-6 gap-3 overflow-y-auto'>
					{filteredPanopticons.map(panopticon => (
						<div
							key={panopticon.id}
							onClick={() => openBuyPanopticon(panopticon)}
							className={
								(isPanopticonBuyed(panopticon.id) ? '' : 'cursor-pointer ') +
								'bg-tertiary rounded-[1.5625rem] flex justify-center items-center group'
							}
						>
							<img
								className={
									(buyedPanopticons?.includes(panopticon.id)
										? ''
										: 'opacity-10 blur-[2px] group-hover:opacity-30 ') +
									'rounded-[1.5625rem] min-w-full max-w-full transition-all'
								}
								src={panopticon.img}
								alt='panopticon-img'
							/>
							{!buyedPanopticons?.includes(panopticon.id) && (
								<p className='text-[#EBE984] text-xl text-center leading-[97.795%] absolute'>
									{panopticon.cost} ДО
								</p>
							)}
						</div>
					))}
				</div>
			</Scrollbar>
		</div>
	)
}

export default PanopticonsList
