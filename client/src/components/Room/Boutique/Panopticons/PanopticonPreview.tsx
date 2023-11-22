import { IBuyedPanopticon } from '@/types/room.interface'
import { formatDate } from '@/utils/formatDate'
import { FC, useEffect, useRef, useState } from 'react'

interface IPanopticonPreview {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	panopticon: IBuyedPanopticon | null
}

const PanopticonPreview: FC<IPanopticonPreview> = ({
	isVisible,
	setIsVisible,
	panopticon,
}) => {
	const imgRef = useRef<HTMLImageElement>(null)
	const [isVerticalImg, setIsVericalImg] = useState<boolean>(true)

	useEffect(() => {
		if (imgRef.current && isVisible) {
			if (imgRef.current.offsetWidth >= imgRef.current.offsetHeight) {
				setIsVericalImg(true)
			} else {
				setIsVericalImg(false)
			}
		}
	}, [isVisible])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'w-full h-full absolute transition-all z-30 flex pt-[3.92rem] px-[1.3rem] pb-[2.6rem]'
			}
		>
			<div className='w-[14.375rem] flex flex-col justify-between mr-[0.87rem] pt-[1.13rem] pb-[1.02rem]'>
				<button
					onClick={() => setIsVisible(false)}
					className='w-full h-[5.4375rem] bg-tertiary bg-opacity-75 rounded-[1.5625rem] text-[#EBE984] text-[1.875rem] hover:bg-opacity-60 transition-all'
				>
					Назад
				</button>
				<div className='w-full h-[23.6875rem] bg-tertiary bg-opacity-75 border-[3px] border-primary rounded-[1.5625rem] flex flex-col items-center'>
					<div className='w-[90%] py-10 flex items-center'>
						<p className='text-primaryText text-[1.5625rem] leading-[97.795%] text-center'>
							{panopticon?.Panopticon.title ? (
								<>
									“
									<span className='text-primary'>
										{panopticon?.Panopticon.title}
									</span>
									”
								</>
							) : (
								'Название отсутствует'
							)}
						</p>
					</div>

					<p className='text-primaryText text-[0.9375rem] leading-[97.795%] text-center w-3/4 flex-1 flex items-center pb-8'>
						{panopticon?.Panopticon.description
							? panopticon?.Panopticon.description
							: 'Описание отсутствует'}
					</p>
				</div>
				<div className='w-full h-[3.6875rem] bg-tertiary bg-opacity-75 rounded-[1.5625rem] flex flex-col justify-center items-center'>
					<p className='text-primaryText text-[0.9375rem] leading-[97.795%]'>
						Получено за {panopticon?.buyed_cost} до
					</p>
					<p className='text-primaryText text-xl leading-[97.795%]'>
						{panopticon?.buyed_at
							? formatDate(panopticon?.buyed_at)
							: 'Дата отсутствует'}
					</p>
				</div>
			</div>
			<div className='flex-1 flex justify-center items-center relative'>
				<img
					ref={imgRef}
					className={
						(isVerticalImg ? 'rounded-[1.5625rem]' : '') +
						' z-20 absolute max-h-full'
					}
					src={`${import.meta.env.VITE_SERVER_URL}/${panopticon?.Panopticon
						.img}`}
				/>
				<img
					className={
						(isVerticalImg ? 'hidden' : 'block') +
						' absolute opacity-20 h-full object-cover rounded-[1.5625rem]'
					}
					src={`${import.meta.env.VITE_SERVER_URL}/${panopticon?.Panopticon
						.img}`}
				/>
			</div>
		</div>
	)
}

export default PanopticonPreview
