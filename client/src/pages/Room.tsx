import RoomNav from '@/components/Room/RoomNav'
import RoomSections from '@/components/Room/RoomSections'
import Header from '@/layout/Header/Header'

const Room = () => {
	return (
		<>
			<Header isFixed={false} withLine={false} />
			<div className='pt-[0.62rem] min-h-[calc(100vh-5.25rem)] bg-room-default-bg bg-cover bg-no-repeat relative z-10'>
				<div className='w-full h-full bg-tertiary absolute inset-0 opacity-80 -z-10' />
				<RoomNav />
				<RoomSections />
			</div>
		</>
	)
}

export default Room
