import { useRoomByUsername } from '@/api/useRoomByUsername'
import RoomMainContent from '@/components/Room/Main/RoomMainContent'
import { colorVariants } from '@/consts/roomColors'
import Header from '@/layout/Header/Header'
import { AxiosError } from 'axios'
import { FC, useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

const Guide: FC = () => {
	const { username } = useParams()
	const [searchParams, setSearchParams] = useSearchParams()
	const [fromSection, setFromSection] = useState<'screen' | 'preview' | null>(
		null
	)

	const {
		data: guideRoom,
		isLoading: isGuideLoading,
		isError: isGuideError,
		error: guideError,
	} = useRoomByUsername(username ?? '')

	useEffect(() => {
		if (searchParams.get('from') === 'guideScreen') {
			setFromSection('screen')
		} else if (searchParams.get('from') === 'guidePreview') {
			setFromSection('preview')
		} else {
			setFromSection(null)
		}

		searchParams.delete('from')
		setSearchParams(searchParams)
	}, [])

	return (
		<>
			<Header
				isFixed={false}
				withLine={false}
				room_color={guideRoom?.roomAppearance?.active_room_color}
			/>
			{isGuideLoading ? (
				<div className='w-full h-[calc(100vh-5.25rem)] flex justify-center items-center'>
					<p className='text-xl'>Загрузка...</p>
				</div>
			) : isGuideError &&
			  guideError instanceof AxiosError &&
			  guideError.response?.status === 400 ? (
				<div className='w-full h-[calc(100vh-5.25rem)] flex flex-col justify-center items-center'>
					<p className='text-4xl mb-6'>Комната не создана</p>
					<Link
						to={
							fromSection === 'screen'
								? '/?to=guideScreen'
								: fromSection === 'preview'
								? '/?to=guidePreview'
								: '/'
						}
						className='text-primaryText text-xl px-8 py-4 rounded-[2.3125rem] bg-primary hover:bg-primaryHover transition-all'
					>
						{fromSection === 'screen' || fromSection === 'preview'
							? 'Назад'
							: 'На главную'}
					</Link>
				</div>
			) : isGuideError ? (
				<div className='w-full h-[calc(100vh-5.25rem)] flex justify-center items-center'>
					<p className='text-xl'>Ошибка</p>
				</div>
			) : (
				<div
					style={{
						backgroundImage: !!guideRoom.roomAppearance.selected_background
							? `url(${import.meta.env.VITE_SERVER_URL}/${guideRoom
									.roomAppearance.selected_background?.img})`
							: "url('/images/room-default-bg.webp')",
					}}
					className={
						(!!guideRoom?.roomAppearance.selected_background
							? 'bg-cover bg-no-repeat bg-center '
							: '') +
						`min-h-[calc(100vh-5.25rem)] relative z-10 ${
							colorVariants.text[guideRoom.roomAppearance.active_room_color]
						}`
					}
				>
					<div className='w-full h-full bg-tertiary absolute inset-0 opacity-80 -z-10' />
					<div className='pt-[0.9375rem] w-[73.85vw] mx-auto pb-[6.8125rem]'>
						<div className='flex justify-between w-full h-full'>
							<RoomMainContent
								room={guideRoom?.room}
								editor={guideRoom?.editor}
								isGuide
								widgetsInfo={guideRoom?.widgetsInfo}
								guideRoomAppearance={guideRoom?.roomAppearance}
								fromSection={fromSection}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default Guide
