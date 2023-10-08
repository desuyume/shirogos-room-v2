import { FC, useEffect, useState } from 'react'
import panopticon1Miniature from '@/assets/room/panopticon1.png'
import panopticon1Original from '@/assets/room/panopticon1-original.png'
import panopticon2Miniature from '@/assets/room/panopticon2.png'
import panopticon2Original from '@/assets/room/panopticon2-original.png'
import { Scrollbar } from 'react-scrollbars-custom'
import { IPanopticon } from '@/types/panopticon.interface'
import BuyPanopticon from './BuyPanopticon'
import PanopticonPreview from './PanopticonPreview'

const PanopticonsList: FC = () => {
	const [chosenPanopticon, setChosenPanopticon] = useState<IPanopticon | null>(
		null
	)
	const [isBuyPanopticonVisible, setIsBuyPanopticonVisible] =
		useState<boolean>(false)
	const [isPanopticonPreviewVisible, setIsPanopticonPreviewVisible] =
		useState<boolean>(false)
	const [buyedPanopticons, setBuyedPanopticons] = useState<number[] | null>([
		1, 5,
	])
	const panopticons: IPanopticon[] = [
		{
			id: 1,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 2,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 3,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 4,
			miniatureImg: panopticon2Miniature,
			originalImg: panopticon2Original,
			cost: 150,
			title: 'Клен шумит под речной волной',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 5,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 6,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 7,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 8,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 9,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 10,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 11,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
		{
			id: 12,
			miniatureImg: panopticon1Miniature,
			originalImg: panopticon1Original,
			cost: 50,
			title: 'Широго отдыхает',
			description:
				'Это описание, в котором я пишу что-то очень интересное про то, как Широго жестко флексово отдыхает. Такие дела!',
			bought_date: '01.09.2023',
		},
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
		setChosenPanopticon(panopticon)
		setIsBuyPanopticonVisible(true)
	}

	const openPanopticonPreview = (panopticon: IPanopticon) => {
		setChosenPanopticon(panopticon)
		setIsPanopticonPreviewVisible(true)
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
			<PanopticonPreview
				isVisible={isPanopticonPreviewVisible}
				setIsVisible={setIsPanopticonPreviewVisible}
				panopticon={chosenPanopticon}
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
							className={
								(isPanopticonBuyed(panopticon.id) ? '' : '') +
								'bg-tertiary rounded-[1.5625rem] flex justify-center items-center cursor-pointer group'
							}
						>
							<img
								className={
									(buyedPanopticons?.includes(panopticon.id)
										? 'group-hover:blur-[1px] '
										: 'opacity-10 blur-[2px] group-hover:opacity-30 ') +
									'rounded-[1.5625rem] min-w-full max-w-full min-h-full max-h-full transition-all'
								}
								src={panopticon.miniatureImg}
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
