import { FC, useContext } from 'react'
import { RoomAppearanceContext } from '@/Context'
import {
	colorVariants,
	colorVariantsGroupHover,
	colorVariantsHover,
} from '@/consts/roomColors'

interface IEditorElementCross {
	onClick: () => void
}

const EditorElementCross: FC<IEditorElementCross> = ({ onClick }) => {
	const roomAppearance = useContext(RoomAppearanceContext)

	return (
		<button
			onClick={onClick}
			className={`w-[2.1875vw] h-[2.1875vw] ${
				colorVariants.bg[roomAppearance.active_room_color]
			} ${
				colorVariantsHover.bg[roomAppearance.active_room_color]
			} rounded-full absolute right-0 top-0 translate-x-[50%] -translate-y-[50%] flex justify-center items-center cursor-pointer group transition-all`}
		>
			<div className='w-[90%] h-[90%] bg-white rounded-full flex justify-center items-center'>
				<p
					className={`${
						colorVariantsGroupHover.text[roomAppearance.active_room_color]
					} text-[1.2vw] transition-all`}
				>
					X
				</p>
			</div>
		</button>
	)
}

export default EditorElementCross
