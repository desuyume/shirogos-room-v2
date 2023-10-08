import { IPanopticon } from '@/types/panopticon.interface'
import { FC, useEffect, useRef, useState } from 'react'

interface IPanopticonPreview {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	panopticon: IPanopticon | null
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
			console.log(imgRef.current.offsetWidth, imgRef.current.offsetHeight)
			console.log(isVerticalImg)
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
							“<span className='text-primary'>{panopticon?.title}</span>”
						</p>
					</div>

					<p className='text-primaryText text-[0.9375rem] leading-[97.795%] text-center w-3/4 flex-1 flex items-center pb-8'>
						{panopticon?.description}
					</p>
				</div>
				<div className='w-full h-[3.6875rem] bg-tertiary bg-opacity-75 rounded-[1.5625rem] flex flex-col justify-center items-center'>
					<p className='text-primaryText text-[0.9375rem] leading-[97.795%]'>
						Получено за {panopticon?.cost} до
					</p>
					<p className='text-primaryText text-xl leading-[97.795%]'>
						{panopticon?.bought_date}
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
					src={panopticon?.originalImg}
				/>
				<img
					className={
						(isVerticalImg ? 'hidden' : 'block') +
						' absolute opacity-20 h-full object-cover rounded-[1.5625rem]'
					}
					src={panopticon?.miniatureImg}
				/>
			</div>
		</div>
	)
}

export default PanopticonPreview
