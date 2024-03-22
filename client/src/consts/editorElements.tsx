import FavioriteCharacter from '@/components/Room/Editor/Widgets/FavioriteCharacter'
import Notepad from '@/components/Room/Editor/Widgets/Notepad'
import Statistic from '@/components/Room/Editor/Widgets/Statistic'
import UniqueRole from '@/components/Room/Editor/Widgets/UniqueRole'
import { IEditorWidget } from '@/components/Room/Sections/RoomEditor'

export const editorWidgetsProps: IEditorWidget[] = [
	{
		type: 'UNIQUE_ROLE',
		element: <UniqueRole />,
		className: 'w-[24.68%] aspect-[287/138.81]',
		zIndex: 0,
	},
	{
		type: 'STATISTIC',
		element: <Statistic />,
		className:
			'w-[38.865%] aspect-[452/313] bg-room-gradient rounded-[1.5625rem]',
		zIndex: 0,
	},
	{
		type: 'FAVORITE_CHARACTER',
		element: <FavioriteCharacter />,
		className:
			'w-[17.11%] aspect-[199/361] flex justify-center bg-room-gradient rounded-[1.5625rem]',
		zIndex: 0,
	},
	{
		type: 'NOTEPAD',
		element: <Notepad />,
		className: 'w-[20.55%] aspect-[239/292.37]',
		zIndex: 0,
	},
]
