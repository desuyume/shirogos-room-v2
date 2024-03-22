import { FC } from 'react'
import crossIcon from '@/assets/room/widget-cross.svg'

interface IEditorElementCross { 
	onClick: () => void
}

const EditorElementCross: FC<IEditorElementCross> = ({ onClick }) => {
	return (
		<button onClick={onClick} className='w-[2.1875vw] h-[2.1875vw] bg-primary rounded-full absolute right-0 top-0 translate-x-[50%] -translate-y-[50%] flex justify-center items-center cursor-pointer transition-all'>
			<div className='w-[90%] h-[90%] bg-white rounded-full flex justify-center items-center'>
				<img className='w-[58%] pointer-events-none' src={crossIcon} alt='cross-icon' />
			</div>
		</button>
	)
}

export default EditorElementCross
