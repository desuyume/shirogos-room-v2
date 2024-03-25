import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { FC, useContext, useEffect, useRef, useState } from 'react'

const BadgesTitle: FC = () => {
	const [isDescOpen, setIsDescOpen] = useState<boolean>(false)
	const [descHeight, setDescHeight] = useState<number>(0)
	const descRef = useRef<HTMLDivElement | null>(null)
	const roomAppearance = useContext(RoomAppearanceContext)

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			setDescHeight(descRef.current?.scrollHeight ?? 0)
		})
		observer.observe(document.documentElement)

		return () => {
			observer.unobserve(document.documentElement)
		}
	}, [])

	return (
		<>
			<button
				onClick={() => setIsDescOpen(!isDescOpen)}
				style={{ marginBottom: isDescOpen ? '8px' : `-${descHeight - 10}px` }}
				className='bg-tertiary text-primaryText text-xl w-[63%] h-[3.6875rem] rounded-[1.5625rem] flex flex-col justify-center items-center relative transition-all hover:bg-opacity-90'
			>
				Значки
				<span
					className={
						(isDescOpen
							? 'scale-y-[-1] border-t-[#EBE984] bottom-[0.50rem] '
							: `${
									colorVariants.border[roomAppearance.active_room_color]
							  } -bottom-[0.20rem] `) +
						'border-l-transparent border-r-transparent border-b-transparent border-[0.625rem] border-t-[0.5rem] absolute transition-all'
					}
				/>
			</button>
			<div
				ref={descRef}
				className={
					(isDescOpen
						? 'visible opacity-100 mb-3 duration-500 ease-in-out '
						: 'invisible opacity-0 ') + 'px-[0.62rem]'
				}
			>
				<p className='text-primaryText text-opacity-80 text-center text-xs leading-[97.795%] mb-2'>
					Играет роль украшения для своей комнаты через Редактор.
				</p>
				<p className='text-primaryText text-opacity-80 text-center text-[0.625rem] leading-[97.795%]'>
					Делятся на 3 категории: Уникальные, Копирайтные и Обычные.
				</p>
			</div>
		</>
	)
}

export default BadgesTitle
