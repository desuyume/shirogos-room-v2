import { FC, useContext, useEffect, useState } from 'react'
import CreateRoomHeader from '@/components/CreateRoom/CreateRoomHeader'
import CreateRoomForm from '@/components/CreateRoom/CreateRoomForm'
import shirogoImg from '@/assets/create-room-img.png'
import { useCreateRoom } from '@/api/useCreateRoom'
import { UserContext } from '@/Context'
import { useIsRoomCreated } from '../api/useIsRoomCreated'
import Loader from './Loader'

const CreateRoom: FC = () => {
	const userContext = useContext(UserContext)
	const [username, setUsername] = useState<string>('')
	const [roomName, setRoomName] = useState<string>('')

	const { data: isRoomCreated, isFetched: isFetchedIsRoomCreated } =
		useIsRoomCreated()
	const { mutate } = useCreateRoom()

	const createRoom = () => {
		if (username.length < 3 || username.length > 34) {
			console.log('username length must be > 3 and < 34')
			return
		}

		if (roomName.length < 3 || roomName.length > 34) {
			console.log('username length must be > 3 and < 34')
			return
		}

		mutate({ roomName, username })
	}

	useEffect(() => {
		if (userContext?.isFetched && userContext.user) {
			setUsername(userContext.user?.username)
		}
	}, [userContext?.isFetched])

	useEffect(() => {
		if (isRoomCreated) {
			window.location.href = '/room'
		}
	}, [isFetchedIsRoomCreated])

	return !isFetchedIsRoomCreated || isRoomCreated ? (
		<Loader />
	) : (
		<>
			<CreateRoomHeader />
			<p className='text-[#D9D9D9] text-[3.125rem] font-secondary font-bold text-center absolute top-[2.62rem] left-[50%] translate-x-[-50%] z-20 tracking-[-0.1875rem] leading-[95.5%]'>
				Привет, <br />
				<span className='text-primary text-[2.5rem] tracking-[-0.15rem]'>
					{username}
				</span>
				!
			</p>
			<div className='flex justify-center lg:mr-[3.57rem]'>
				<CreateRoomForm
					username={username}
					setUsername={setUsername}
					roomName={roomName}
					setRoomName={setRoomName}
					createRoom={createRoom}
				/>
			</div>
			<img
				className='hidden lg:block h-screen absolute bottom-0 left-[45%] pointer-events-none'
				src={shirogoImg}
				alt='shirogo-img'
			/>
		</>
	)
}

export default CreateRoom
