import { FC } from 'react'

import {
	EditorSection,
	IEditorBadge,
	IEditorWidget,
} from '../Sections/RoomEditor'
import EditorNavBttn from './EditorNavBttn'
import {
	getEditorBadgePercentSize,
	getEditorElementPosition,
} from '@/utils/getEditorElementPosition'
import { useUpdateRoomEditor } from '@/api/useUpdateRoomEditor'
import { IEditorBadgeFetch, IEditorWidgetFetch } from '@/types/room.interface'

interface IEditorNav {
	activeSection: EditorSection | null
	setActiveSection: (section: EditorSection | null) => void
	editorWidgets: IEditorWidget[]
	editorBadges: IEditorBadge[]
	notepadText: string
	setIsCancelEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const EditorNav: FC<IEditorNav> = ({
	activeSection,
	setActiveSection,
	editorWidgets,
	editorBadges,
	notepadText,
	setIsCancelEdit,
}) => {
	const { mutate: updateEditor } = useUpdateRoomEditor()

	const clickSave = () => {
		const widgets: IEditorWidgetFetch[] = []
		const badges: IEditorBadgeFetch[] = []
		for (const widget of editorWidgets) {
			const widgetElement = document.querySelector(
				`.editor-container [data-widgettype='${widget.type}']`
			) as HTMLElement
			if (!widgetElement) continue
			const widgetPos = getEditorElementPosition(widgetElement)
			widgets.push({
				widgetType: widget.type,
				translateX: widgetPos.translateX,
				translateY: widgetPos.translateY,
				zIndex: widget.zIndex,
			})
		}

		for (const badge of editorBadges) {
			const container = document.querySelector(
				'.editor-container'
			) as HTMLElement
			const badgeElement = document.querySelector(
				`.editor-container [data-badgeid='${badge.badge_id}']`
			) as HTMLElement
			if (!badgeElement || !container) continue
			const badgePos = getEditorElementPosition(badgeElement)
			const badgeBounding = badgeElement.getBoundingClientRect()
			const badgeSize = getEditorBadgePercentSize(
				container,
				badgeBounding.width,
				badgeBounding.height
			)
			badges.push({
				badgeId: badge.badge_id,
				width: badgeSize.width,
				height: badgeSize.height,
				translateX: badgePos.translateX,
				translateY: badgePos.translateY,
				zIndex: badge.zIndex,
			})
		}

		const data = {
			notepad_text: notepadText,
			widgets,
			badges,
		}

		updateEditor(data)
	}

	return (
		<div className='w-full flex justify-center items-center h-[4.875rem] mb-[1.13rem]'>
			<div className='flex items-center'>
				<EditorNavBttn
					type={'widgets'}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>
				<div className='w-[27.8125rem] h-[3.6875rem] bg-secondaryHover rounded-[2.0625rem] flex justify-center items-center'>
					<button
						onClick={() => setIsCancelEdit(prev => !prev)}
						className='bg-secondary hover:bg-opacity-70 text-primaryText rounded-[2.3125rem] transition-all w-[12.25rem] h-[2.0625rem] mr-[0.8125rem]'
					>
						Отмена
					</button>
					<button
						onClick={clickSave}
						className='bg-primary hover:bg-primaryHover text-primaryText rounded-[2.3125rem] transition-all w-[12.25rem] h-[2.0625rem]'
					>
						Сохранить
					</button>
				</div>
				<EditorNavBttn
					type={'badges'}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
				/>
			</div>
		</div>
	)
}

export default EditorNav
