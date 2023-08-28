import { FC, useState } from 'react'

const ChangeRoomName: FC = () => {
	const [roomName, setRoomName] = useState<string>('')
	const [limit, setLimit] = useState<number>(34)

	const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (limit > 0) {
			setRoomName(e.target.value)
			setLimit(34 - e.target.value.length)
		}
	}

	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Backspace" && limit < 34) {
			setLimit(prev => prev + 1)
		}
	}

	return (
		<div className='w-full h-[5.75rem] bg-tertiary rounded-[1.5625rem] flex justify-center items-center'>
			<div className='w-[93%] h-[87%] border-primaryText border-[1px] rounded-[1.5625rem] flex items-center'>
				<div className='w-[80.5%] h-full flex flex-col justify-center items-center mt-1'>
					<p className='text-primaryText text-xl mb-1.5 text-center leading-[97.795%]'>
						Изменить название комнаты
					</p>
					<div className='w-[80%] flex items-center relative'>
						<input
							value={roomName}
							onChange={e => changeNameHandler(e)}
							onKeyDown={e => keyDownHandler(e)}
							className='text-[0.9375rem] text-[#FFF] leading-[97.795%] text-center bg-transparent outline-none w-full border-primary border-b-[3px] pb-1 caret-primary'
						/>
						<p className='text-primary text-xs absolute -right-[12%] w-[12%] text-center'>{limit}</p>
					</div>
				</div>
				<hr className='bg-primaryText w-[1px] h-[86.25%]' />
				<div className='flex-1 h-full flex justify-center items-center'>
					<button disabled={limit === 34 || limit < 0} className='text-[#EBE984] text-[1.5625rem] w-full h-full hover:bg-secondary rounded-r-[1.5625rem] text-center leading-[97.795%] px-1 transition-all disabled:hover:bg-transparent'>
						10 ДО
					</button>
				</div>
			</div>
		</div>
	)
}

export default ChangeRoomName
