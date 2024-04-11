import { FC, useContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRoom } from '@/api/useRoom'
import EditorNav from '../Editor/EditorNav'
import BadgesSection from '../Editor/BadgesSection'
import WidgetsSection from '../Editor/WidgetsSection'
import UserBar from '../Main/UserBar'
import EditorElement from '../Editor/EditorElement'
import Notepad from '../Editor/Widgets/Notepad'
import { useRoomEditor } from '@/api/useRoomEditor'
import { WidgetType } from '@/types/room.interface'
import { editorWidgetsProps } from '@/consts/editorElements'
import { useScreenObserver } from '@/hooks/useScreenObserver'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'

export type EditorSection = 'badges' | 'widgets'

export interface IEditorWidget {
	element: JSX.Element
	type: WidgetType
	className?: string
	translateX?: number
	translateY?: number
	zIndex: number
}

export interface IEditorBadge {
	badge_id: number
	badgeImg: string
	width?: number
	height?: number
	translateX?: number
	translateY?: number
	zIndex: number
}

const RoomEditor: FC = () => {
	const location = useLocation()
	const [isActiveEditor, setIsActiveEditor] = useState<boolean>(false)

	const { isLoading, isError, data: roomInfo } = useRoom()

	const [editorWidgets, setEditorWidgets] = useState<IEditorWidget[]>([])
	const [editorBadges, setEditorBadges] = useState<IEditorBadge[]>([])

	const [activeSection, setActiveSection] = useState<EditorSection | null>(null)

	const [isCancelEdit, setIsCancelEdit] = useState<boolean>(false)
	const [notepadText, setNotepadText] = useState<string>('')
	const [zIndexCount, setZIndexCount] = useState<number>(1)

	const containerRef = useRef<HTMLDivElement | null>(null)
	const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

	const roomAppearance = useContext(RoomAppearanceContext)

	const {
		data: editorElements,
		isLoading: isEditorLoading,
		isError: isEditorError,
		isSuccess: isEditorSuccess,
	} = useRoomEditor()

	const setFetchedData = () => {
		if (!editorElements) {
			return
		}

		let maxZIndex = 0

		setEditorWidgets(
			editorElements.widgets.map(widget => {
				const newWidget = editorWidgetsProps.find(
					e => e.type === widget.widgetType
				)

				if (widget.zIndex > maxZIndex) {
					maxZIndex = widget.zIndex
				}

				return {
					element: !!newWidget ? newWidget.element : <></>,
					className: newWidget?.className,
					type: widget.widgetType,
					translateX: widget.translateX,
					translateY: widget.translateY,
					zIndex: widget.zIndex,
				}
			})
		)
		setEditorBadges(
			editorElements.badges.map(badge => {
				if (badge.zIndex > maxZIndex) {
					maxZIndex = badge.zIndex
				}

				return {
					badge_id: badge.badge.id,
					badgeImg: badge.badge.img,
					width: badge.width,
					height: badge.height,
					translateX: badge.translateX,
					translateY: badge.translateY,
					zIndex: badge.zIndex,
				}
			})
		)

		setNotepadText(editorElements.notepad_text)
		setZIndexCount(maxZIndex + 1)
	}

	useEffect(() => {
		if (isEditorSuccess) {
			setFetchedData()
		}
	}, [isEditorSuccess])

	useEffect(() => {
		setFetchedData()
	}, [isCancelEdit])

	useEffect(() => {
		if (location.pathname.includes('/room/editor')) {
			setIsActiveEditor(true)
		} else {
			setIsActiveEditor(false)
		}
	}, [location])

	useEffect(() => {
		setContainerSize({
			width: containerRef.current?.clientWidth ?? 0,
			height: containerRef.current?.clientHeight ?? 0,
		})
	}, [isActiveEditor, containerRef.current])

	useScreenObserver(() => {
		setContainerSize({
			width: containerRef.current?.clientWidth ?? 0,
			height: containerRef.current?.clientHeight ?? 0,
		})
	}, [isActiveEditor, containerRef.current])

	return (
		<div
			className={
				(isActiveEditor ? 'block' : 'hidden') +
				' transition-all flex justify-between w-full h-full'
			}
		>
			{isLoading || isEditorLoading ? (
				<p className='text-xl text-center w-full'>Загрузка...</p>
			) : isError || isEditorError ? (
				<p className='text-xl text-center w-full'>Не удалось получить данные</p>
			) : (
				<>
					<div className='flex-1 h-full mr-[1.38rem]'>
						<EditorNav
							activeSection={activeSection}
							setActiveSection={setActiveSection}
							editorWidgets={editorWidgets}
							editorBadges={editorBadges}
							notepadText={notepadText}
							setIsCancelEdit={setIsCancelEdit}
						/>

						<div
							className={
								(!!activeSection
									? 'opacity-100 visible h-[13.125rem] mb-[1.125rem] '
									: 'opacity-0 invisible h-0 mb-0 ') + 'transition-all'
							}
						>
							{activeSection === 'badges' && (
								<BadgesSection
									editorBadges={editorBadges}
									setEditorBadges={setEditorBadges}
									zIndexCount={zIndexCount}
									setZIndexCount={setZIndexCount}
								/>
							)}
							{activeSection === 'widgets' && (
								<WidgetsSection
									editorWidgets={editorWidgets}
									setEditorWidgets={setEditorWidgets}
									zIndexCount={zIndexCount}
									setZIndexCount={setZIndexCount}
								/>
							)}
						</div>

						<div
							ref={containerRef}
							className='bg-secondaryHover rounded-[2.3125rem] w-full aspect-[1163/953] relative editor-container target'
						>
							{editorWidgets.filter(el => el.type === 'NOTEPAD').length > 0 && (
								<EditorElement
									className='w-[20.55%] aspect-[239/292.37]'
									element={
										<Notepad
											notepadText={notepadText}
											setNotepadText={setNotepadText}
										/>
									}
									type='widget'
									widgetType='NOTEPAD'
									setEditorWidgets={setEditorWidgets}
									setEditorBadges={setEditorBadges}
									translateX={
										editorWidgets.find(el => el.type === 'NOTEPAD')?.translateX
									}
									translateY={
										editorWidgets.find(el => el.type === 'NOTEPAD')?.translateY
									}
									zIndex={
										editorWidgets.find(el => el.type === 'NOTEPAD')?.zIndex || 0
									}
									isActiveEditor={isActiveEditor}
									isCancelEdit={isCancelEdit}
									containerSize={containerSize}
								/>
							)}
							{editorWidgets
								.filter(el => el.type !== 'NOTEPAD')
								.map(widget => (
									<EditorElement
										key={widget.type}
										element={widget.element}
										className={
											widget.type === 'FAVORITE_CHARACTER' ||
											widget.type === 'STATISTIC'
												? `${widget.className} ${
														colorVariants.bgRoomGradient[
															roomAppearance.active_room_color
														]
												  }`
												: widget.className
										}
										widgetType={widget.type}
										type='widget'
										setEditorWidgets={setEditorWidgets}
										setEditorBadges={setEditorBadges}
										translateX={widget.translateX}
										translateY={widget.translateY}
										zIndex={widget.zIndex}
										isActiveEditor={isActiveEditor}
										isCancelEdit={isCancelEdit}
										containerSize={containerSize}
									/>
								))}
							{editorBadges.map(badge => (
								<EditorElement
									key={badge.badge_id}
									type='badge'
									badge_img={badge.badgeImg}
									badge_id={badge.badge_id}
									setEditorWidgets={setEditorWidgets}
									setEditorBadges={setEditorBadges}
									width={badge.width}
									height={badge.height}
									translateX={badge.translateX}
									translateY={badge.translateY}
									zIndex={badge.zIndex}
									isActiveEditor={isActiveEditor}
									isCancelEdit={isCancelEdit}
									containerSize={containerSize}
								/>
							))}
						</div>
					</div>
					<UserBar
						profile_img={roomInfo.user.profile_img}
						username={roomInfo.user.username}
						created_at={roomInfo.created_at}
						level={roomInfo.user.level}
						past_usernames={roomInfo.user.past_usernames}
						className={!!activeSection ? 'mt-[14.25rem]' : ''}
					/>
				</>
			)}
		</div>
	)
}

export default RoomEditor
