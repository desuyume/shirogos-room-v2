import { FC } from 'react'
import notepadImg from '@/assets/room/notepad.png'
interface INotepad {
	notepadText?: string
	setNotepadText?: (text: string) => void
	isDisabled?: boolean
}

const Notepad: FC<INotepad> = ({ notepadText, setNotepadText, isDisabled }) => {
	return (
		<>
			<div className='w-full h-full relative handle'>
				<img
					className='w-full h-full pointer-events-none'
					src={notepadImg}
					alt='notepad'
				/>
				<div className='w-full top-[19%] px-[4%] h-[70%] absolute'>
					<textarea
						value={notepadText}
						onChange={e => setNotepadText && setNotepadText(e.target.value)}
						disabled={isDisabled}
						className='w-full h-full text-tertiary text-[0.6vw] 4k:leading-[205%] fullhd:leading-[185%] medium-desktop:leading-[170%] laptop:leading-[155%] leading-[170%] bg-transparent outline-none border-none resize-none'
					/>
				</div>
			</div>
		</>
	)
}

export default Notepad
