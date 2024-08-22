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
      <div className='handle relative h-full w-full'>
        <img className='pointer-events-none h-full w-full' src={notepadImg} alt='notepad' />
        <div className='absolute top-[19%] h-[70%] w-full px-[4%]'>
          <textarea
            value={notepadText}
            onChange={(e) => setNotepadText && setNotepadText(e.target.value)}
            disabled={isDisabled}
            className='h-full w-full resize-none border-none bg-transparent text-[0.6vw] leading-[170%] text-tertiary outline-none laptop:leading-[155%] medium-desktop:leading-[170%] fullhd:leading-[185%] 4k:leading-[205%]'
          />
        </div>
      </div>
    </>
  )
}

export default Notepad
