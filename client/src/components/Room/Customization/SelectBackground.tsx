import { FC, useState } from 'react'
import testBg from '@/assets/room/test-bg.png'
import { Scrollbar } from 'react-scrollbars-custom'

const SelectBackground: FC = () => {
	const [selectedBg, setSelectedBg] = useState<number>(0)

	const backgrounds = [
		{ img: testBg, title: 'Рюгу Рэна' },
		{ img: testBg, title: 'Рюгу Рэна' },
		{ img: testBg, title: 'Рюгу Рэна' },
		{ img: testBg, title: 'Рюгу Рэна' },
		{ img: testBg, title: 'Рюгу Рэна' },
	]

	return (
		<div className='h-[17.5rem] bg-room-gradient w-[78%] ml-[2%] rounded-[1.5625rem] py-[0.63rem] pl-[0.56rem] flex items-center select-bg'>
			<button className='min-w-[14.85%] max-w-[14.85%] bg-tertiary hover:opacity-95 transition-all h-full rounded-[1.0625rem] text-primaryText text-[0.9375rem] mr-8'>
				Выбрать фон
			</button>
			<Scrollbar noDefaultStyles className='flex-1' style={{ height: '100%' }}>
				<div className='flex items-center pl-2'>
					{backgrounds.map((bg, index) => (
						<div
							key={bg.title + index}
							onClick={() => setSelectedBg(index)}
							className={(selectedBg === index ? 'scale-105 ' : '') + 'mr-5 flex flex-col items-center relative mb-2 cursor-pointer transition-all duration-300'}
						>
							<img
								className={
									(selectedBg === index ? 'border-2 border-[#F8FEFA] ' : '') +
									'min-w-[18.375rem] rounded-[1.5625rem] mb-2 pointer-events-none'
								}
								src={bg.img}
								alt='bg-img'
							/>
							<p
								className={
									(selectedBg === index
										? 'text-xl -bottom-6 '
										: 'text-[0.8125rem] -bottom-4 ') +
									'text-primaryText absolute transition-all select-none'
								}
							>
								{bg.title}
							</p>
						</div>
					))}
				</div>
			</Scrollbar>
		</div>
	)
}

export default SelectBackground
