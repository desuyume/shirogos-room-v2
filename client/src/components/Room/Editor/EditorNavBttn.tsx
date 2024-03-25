import { FC, useContext } from 'react'
import { EditorSection } from '../Sections/RoomEditor'
import badgesIcon from '@/assets/room/badges-icon.png'
import widgetsIcon from '@/assets/room/widgets-icon.png'
import crossIcon from '@/assets/room/editor-nav-cross.svg'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsGroupHover } from '@/consts/roomColors'

interface IEditorNavBttn {
	type: EditorSection
	activeSection: EditorSection | null
	setActiveSection: (section: EditorSection | null) => void
}

const EditorNavBttn: FC<IEditorNavBttn> = ({
	type,
	activeSection,
	setActiveSection,
}) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<div
			onClick={() =>
				activeSection === type ? setActiveSection(null) : setActiveSection(type)
			}
			className={
				(type === 'badges' ? 'ml-[0.8125rem] ' : 'mr-[0.8125rem] ') +
				'w-[3.875rem] h-[3.875rem] flex flex-col items-center relative cursor-pointer group'
			}
		>
			<div
				className={
					(activeSection === type
						? 'invisible opacity-0 '
						: 'visible opacity-1000 ') +
					'w-full h-full rounded-full transition-all'
				}
			>
				<img
					src={type === 'badges' ? badgesIcon : widgetsIcon}
					className='w-full h-full rounded-full transition-all'
				/>
				<div className='w-full h-full rounded-full border-[3px] border-primaryText opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute inset-0 transition-all' />
			</div>

			<button
				className={
					(activeSection === type
						? 'visible opacity-100 '
						: 'invisible opacity-0 ') +
					`${colorVariants.bg[roomAppearance.active_room_color]} ${
						colorVariantsGroupHover.bg[roomAppearance.active_room_color]
					} text-primaryText rounded-full w-full h-full absolute inset-0 transition-all font-secondary font-bold text-xl flex justify-center items-center`
				}
			>
				<img className='w-[1.75rem] h-[1.75rem]' src={crossIcon} alt='cross' />
			</button>

			<p className='absolute -bottom-1 leading-[0.4375rem] translate-y-[100%] text-[0.625rem] text-primaryText'>
				{type === 'badges' ? 'Значки' : 'Виджеты'}
			</p>
		</div>
	)
}

export default EditorNavBttn
