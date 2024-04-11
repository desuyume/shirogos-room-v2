import { FC, useContext } from 'react'
import UserBar from './UserBar'
import Statistic from '../Editor/Widgets/Statistic'
import UniqueRole from '../Editor/Widgets/UniqueRole'
import Notepad from '../Editor/Widgets/Notepad'
import FavioriteCharacter from '../Editor/Widgets/FavioriteCharacter'
import { IRoom, IRoomAppearance, IRoomEditor } from '@/types/room.interface'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { IRoomGuideWidgetInfo } from '@/types/room-guide.interface'
import { Link } from 'react-router-dom'

interface IRoomMainContent {
	room: IRoom
	editor: IRoomEditor
	isGuide?: boolean
	widgetsInfo?: IRoomGuideWidgetInfo
	guideRoomAppearance?: IRoomAppearance
	fromSection?: 'screen' | 'preview' | null
}

const RoomMainContent: FC<IRoomMainContent> = ({
	room,
	editor,
	isGuide = false,
	widgetsInfo,
	guideRoomAppearance,
	fromSection,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<>
			<div className='flex-1 mr-[1.38rem]'>
				<div className='bg-tertiary w-full flex flex-col justify-center items-center h-[4.875rem] rounded-[2.3125rem] mb-[1.125rem] relative'>
					{isGuide && (
						<Link
							to={
								fromSection === 'screen'
									? '/?to=guideScreen'
									: fromSection === 'preview'
									? '/?to=guidePreview'
									: '/'
							}
							className={`w-[5.375rem] h-[5.625rem] ${
								colorVariants.bg[
									guideRoomAppearance?.active_room_color ?? 'pink'
								]
							} ${
								colorVariantsHover.bg[
									guideRoomAppearance?.active_room_color ?? 'pink'
								]
							} text-[#FFF] text-[5rem] rounded-[2.3125rem] transition-all flex justify-center items-center pb-3 pr-[0.3125rem] -translate-x-[100%] absolute -left-[1.3125rem]`}
						>{`<`}</Link>
					)}
					<p className='text-primaryText text-xl leading-[97.795%]'>Комната</p>
					<p className='text-primaryText text-[1.875rem] leading-[97.795%] text-center'>
						{room.name}
					</p>
				</div>
				<div className='bg-secondaryHover bg-opacity-75 rounded-[2.3125rem] w-full aspect-[1163/953] relative'>
					{!!editor && (
						<>
							{editor.badges.map(badge => (
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
											badge.badge.img
										}`}
										alt=''
										className='h-full'
									/>
								</div>
							))}

							{editor.widgets
								.filter(widget => widget.widgetType === 'FAVORITE_CHARACTER')
								.map(widget => (
									<div
										key={widget.widgetType}
										style={{
											transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
											zIndex: widget.zIndex,
										}}
										className={
											`w-[17.11%] aspect-[199/361] flex justify-center rounded-[1.5625rem] absolute ` +
											(isGuide
												? `${
														colorVariants.bgRoomGradient[
															guideRoomAppearance?.active_room_color ?? 'pink'
														]
												  }`
												: `${
														colorVariants.bgRoomGradient[
															roomAppearance.active_room_color
														]
												  }`)
										}
									>
										<FavioriteCharacter
											isGuide={isGuide}
											guideFavoriteCharacter={widgetsInfo?.favorite_character}
										/>
									</div>
								))}

							{editor.widgets
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
										<Notepad notepadText={editor.notepad_text} isDisabled />
									</div>
								))}

							{editor.widgets
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
										<UniqueRole
											isGuide={isGuide}
											guideUniqueRoles={widgetsInfo?.unique_role}
										/>
									</div>
								))}

							{editor.widgets
								.filter(widget => widget.widgetType === 'STATISTIC')
								.map(widget => (
									<div
										key={widget.widgetType}
										style={{
											transform: `translate(${widget.translateX}%, ${widget.translateY}%)`,
											zIndex: widget.zIndex,
										}}
										className={
											`w-[38.865%] aspect-[452/313] rounded-[1.5625rem] absolute ` +
											(isGuide
												? `${
														colorVariants.bgRoomGradient[
															guideRoomAppearance?.active_room_color ?? 'pink'
														]
												  }`
												: `${
														colorVariants.bgRoomGradient[
															roomAppearance.active_room_color
														]
												  }`)
										}
									>
										<Statistic
											isGuide={isGuide}
											guideStats={widgetsInfo?.stats}
										/>
									</div>
								))}
						</>
					)}
				</div>
			</div>
			<UserBar
				profile_img={room.user.profile_img}
				username={room.user.username}
				created_at={room.created_at}
				level={room.user.level}
				past_usernames={room.user.past_usernames}
				isGuide={isGuide}
				guideRoomAppearance={guideRoomAppearance}
			/>
		</>
	)
}

export default RoomMainContent
