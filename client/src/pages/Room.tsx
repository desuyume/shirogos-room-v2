import { useIsRoomCreated } from '@/api/useIsRoomCreated'
import RoomNav from '@/components/Room/RoomNav'
import RoomSections from '@/components/Room/RoomSections'
import Header from '@/layout/Header/Header'
import { useContext, useEffect } from 'react'
import Loader from './Loader'
import { useLocation } from 'react-router-dom'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const Room = () => {
	const { data: isRoomCreated, isFetched: isFetchedIsRoomCreated } =
		useIsRoomCreated()
	const { pathname } = useLocation()
	const roomAppearance = useContext(RoomAppearanceContext)

	useEffect(() => {
		if (isRoomCreated === false) {
			window.location.href = '/room/create'
		}
	}, [isFetchedIsRoomCreated])

	return !isFetchedIsRoomCreated || !isRoomCreated ? (
		<Loader />
	) : (
		<>
			<Header isFixed={false} withLine={false} />
			<div
				style={
					!pathname.includes('editor')
						? {
								backgroundImage: !!roomAppearance.selected_background
									? `url(${import.meta.env.VITE_SERVER_URL}/${roomAppearance
											.selected_background?.img})`
									: "url('/images/room-default-bg.png')",
						  }
						: {}
				}
				className={
					(pathname.includes('editor')
						? 'bg-tertiary '
						: 'bg-cover bg-no-repeat bg-center ') +
					`pt-[0.62rem] min-h-[calc(100vh-5.25rem)] relative z-10 ${
						colorVariants.text[roomAppearance.active_room_color]
					}`
				}
			>
				<div className='w-full h-full bg-tertiary absolute inset-0 opacity-80 -z-10' />
				<RoomNav />
				<RoomSections />
			</div>
		</>
	)
}

export default Room
