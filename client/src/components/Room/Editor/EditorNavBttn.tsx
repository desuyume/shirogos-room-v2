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

const EditorNavBttn: FC<IEditorNavBttn> = ({ type, activeSection, setActiveSection }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <div
      onClick={() => (activeSection === type ? setActiveSection(null) : setActiveSection(type))}
      className={
        (type === 'badges' ? 'ml-[0.8125rem] ' : 'mr-[0.8125rem] ') +
        'group relative flex h-[3.875rem] w-[3.875rem] cursor-pointer flex-col items-center'
      }
    >
      <div
        className={
          (activeSection === type ? 'invisible opacity-0 ' : 'opacity-1000 visible ') +
          'h-full w-full rounded-full transition-all'
        }
      >
        <img
          src={type === 'badges' ? badgesIcon : widgetsIcon}
          className='h-full w-full rounded-full transition-all'
        />
        <div className='invisible absolute inset-0 h-full w-full rounded-full border-[3px] border-primaryText opacity-0 transition-all group-hover:visible group-hover:opacity-100' />
      </div>

      <button
        className={
          (activeSection === type ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
          `${colorVariants.bg[roomAppearance.active_room_color]} ${
            colorVariantsGroupHover.bg[roomAppearance.active_room_color]
          } absolute inset-0 flex h-full w-full items-center justify-center rounded-full font-secondary text-xl font-bold text-primaryText transition-all`
        }
      >
        <img className='h-[1.75rem] w-[1.75rem]' src={crossIcon} alt='cross' />
      </button>

      <p className='absolute -bottom-1 translate-y-[100%] text-[0.625rem] leading-[0.4375rem] text-primaryText'>
        {type === 'badges' ? 'Значки' : 'Виджеты'}
      </p>
    </div>
  )
}

export default EditorNavBttn
