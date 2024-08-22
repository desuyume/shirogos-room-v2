import { FC, useContext } from 'react'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsGroupHover, colorVariantsHover } from '@/consts/roomColors'

interface IEditorElementCross {
  onClick: () => void
}

const EditorElementCross: FC<IEditorElementCross> = ({ onClick }) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <button
      onClick={onClick}
      className={`h-[2.1875vw] w-[2.1875vw] ${colorVariants.bg[roomAppearance.active_room_color]} ${
        colorVariantsHover.bg[roomAppearance.active_room_color]
      } group absolute right-0 top-0 flex -translate-y-[50%] translate-x-[50%] cursor-pointer items-center justify-center rounded-full transition-all`}
    >
      <div className='flex h-[90%] w-[90%] items-center justify-center rounded-full bg-white'>
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
