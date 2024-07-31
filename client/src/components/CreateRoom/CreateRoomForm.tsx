import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface ICreateRoomForm {
	username: string
	setUsername: React.Dispatch<React.SetStateAction<string>>
	roomName: string
	setRoomName: React.Dispatch<React.SetStateAction<string>>
	createRoom: () => void
}

const CreateRoomForm: FC<ICreateRoomForm> = ({
	username,
	setUsername,
	roomName,
	setRoomName,
	createRoom,
}) => {
	const navigate = useNavigate()

	const cancel = () => {
		navigate('/')
	}

	return (
		<div className='h-[calc(100vh-84px)] w-[50.6875rem] bg-tertiary relative flex flex-col justify-center pb-[7rem] lg:items-start items-center rounded-[1.5rem] lg:pl-14'>
			<div className='flex flex-col items-center mb-[1.87rem]'>
				<label
					className='text-primaryText font-secondary font-bold text-[2.1875rem] leading-[95.5%] mb-2 tracking-[-0.13125rem]'
					htmlFor='room-name'
				>
					Название комнаты:
				</label>
				<input
					className='w-[27rem] h-[2.75rem] outline-none text-tertiary bg-primaryText text-[2.1875rem] font-quaternary leading-[100%] text-center mb-[0.31rem]'
					id='room-name'
					value={roomName}
					onChange={e => setRoomName(e.target.value)}
				/>
				<p className='text-primaryText text-[0.9375rem] font-secondary font-bold leading-[103.5%] w-[18.5rem] text-center tracking-[-0.05625rem]'>
					Так будет называться твоя комната. Можно будет изменить.
				</p>
			</div>
			<div className='flex flex-col items-center mb-[4.51rem]'>
				<label
					className='text-primaryText font-secondary font-bold text-[2.1875rem] leading-[95.5%] mb-2 tracking-[-0.13125rem]'
					htmlFor='nickname'
				>
					Никнейм:
				</label>
				<input
					value={username}
					onChange={e => setUsername(e.target.value)}
					className='w-[27rem] h-[2.75rem] outline-none text-tertiary bg-primaryText text-[2.1875rem] font-quaternary leading-[100%] text-center mb-[0.31rem]'
					id='nickname'
				/>
			</div>
			<button
				onClick={createRoom}
				className='bg-primary hover:bg-primaryHover flex justify-center items-center w-[23.5rem] h-[5rem] text-primaryText hover:text-white font-secondary font-bold text-[2.1875rem] transition-all tracking-[-0.13125rem] ml-7'
			>
				Принять
			</button>
			<button
				onClick={cancel}
				className='bg-secondaryHover hover:bg-secondary transition-all w-[12.3125rem] h-[5rem] text-primaryText hover:text-white font-secondary font-bold text-[1.875rem] rounded-[1.5625rem] absolute left-14 bottom-6 tracking-[-0.1125rem]'
			>
				Отмена
			</button>
		</div>
	)
}

export default CreateRoomForm
