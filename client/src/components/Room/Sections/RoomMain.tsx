import { FC, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoom } from '@/api/useRoom'
import UserBar from '../Main/UserBar'
import { useRoomEditor } from '@/api/useRoomEditor'
import Notepad from '../Editor/Widgets/Notepad'
import FavioriteCharacter from '../Editor/Widgets/FavioriteCharacter'
import UniqueRole from '../Editor/Widgets/UniqueRole'
import Statistic from '../Editor/Widgets/Statistic'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

const RoomMain: FC = () => {
	const location = useLocation()
	const isActive =
		location.pathname === '/room' || location.pathname === '/room/'

	const roomAppearance = useContext(RoomAppearanceContext)

	const { isLoading, isError, data: roomInfo } = useRoom()

	const {
		data: editorElements,
		isLoading: isEditorLoading,
		isError: isEditorError,
	} = useRoomEditor()

	return (
		<div
			className={
				(isActive ? 'block' : 'hidden') +
				' transition-all flex justify-between w-full h-full'
			}
		>
			{isLoading ? (
				<p className='text-xl text-center w-full'>Загрузка...</p>
			) : isError ? (
				<p className='text-xl text-center w-full'>Не удалось получить данные</p>
			) : (
				<>
					<div className='flex-1 mr-[1.38rem]'>
						<div className='bg-tertiary w-full flex flex-col justify-center items-center h-[4.875rem] rounded-[2.3125rem] mb-[1.125rem]'>
							<p className='text-primaryText text-xl leading-[97.795%]'>
								Комната
							</p>
							<p className='text-primaryText text-[1.875rem] leading-[97.795%]'>
								{roomInfo.name}
							</p>
						</div>
						<div className='bg-secondaryHover bg-opacity-75 rounded-[2.3125rem] w-full aspect-[1163/953] relative'>
							{isEditorLoading ? (
								<div className='w-full h-full flex justify-center items-center text-primaryText'>
									Загрузка...
								</div>
							) : isEditorError ? (
								<div className='w-full h-full flex justify-center items-center text-primaryText'>
									Не удалось получить данные
								</div>
							) : (
								!!editorElements && (
									<>
										{editorElements.badges.map(badge => (
											<div
												key={badge.id}
												style={{
													width: `${badge.width}%`,
													height: `${badge.height}%`,
													transform: `translate(${badge.translateX}%, ${badge.translateY}%)`,
													zIndex: badge.zIndex,
												}}
												className='absolute flex justify-center items-center'
											>
												<img
													key={badge.id}
													src={`${import.meta.env.VITE_SERVER_URL}/${
														badge.badge.award_img
													}`}
													alt=''
													className='h-full'
												/>
											</div>
										))}

										{editorElements.widgets
											.filter(
												widget => widget.widgetType === 'FAVORITE_CHARACTER'
											)
											.map(widget => (
												<div
													key={widget.widgetType}
													style={{
														transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
														zIndex: widget.zIndex,
													}}
													className={`w-[17.11%] aspect-[199/361] flex justify-center ${
														colorVariants.bgRoomGradient[
															roomAppearance.active_room_color
														]
													} rounded-[1.5625rem] absolute`}
												>
													<FavioriteCharacter />
												</div>
											))}

										{editorElements.widgets
											.filter(widget => widget.widgetType === 'NOTEPAD')
											.map(widget => (
												<div
													key={widget.widgetType}
													style={{
														transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
														zIndex: widget.zIndex,
													}}
													className='w-[20.55%] aspect-[239/292.37] absolute'
												>
													<Notepad
														notepadText={editorElements.notepad_text}
														isDisabled
													/>
												</div>
											))}

										{editorElements.widgets
											.filter(widget => widget.widgetType === 'UNIQUE_ROLE')
											.map(widget => (
												<div
													key={widget.widgetType}
													style={{
														transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
														zIndex: widget.zIndex,
													}}
													className='w-[24.68%] aspect-[287/138.81] absolute'
												>
													<UniqueRole />
												</div>
											))}

										{editorElements.widgets
											.filter(widget => widget.widgetType === 'STATISTIC')
											.map(widget => (
												<div
													key={widget.widgetType}
													style={{
														transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
														zIndex: widget.zIndex,
													}}
													className={`w-[38.865%] aspect-[452/313] ${
														colorVariants.bgRoomGradient[
															roomAppearance.active_room_color
														]
													} rounded-[1.5625rem] absolute`}
												>
													<Statistic />
												</div>
											))}
									</>
								)
							)}
						</div>
					</div>
					<UserBar
						profile_img={roomInfo.user.profile_img}
						username={roomInfo.user.username}
						created_at={roomInfo.created_at}
						level={roomInfo.user.level}
						past_usernames={roomInfo.user.past_usernames}
					/>
				</>
			)}
		</div>
	)
}

export default RoomMain
