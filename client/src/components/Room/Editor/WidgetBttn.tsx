import { FC, useContext } from 'react'
import { IEditorWidget } from '../Sections/RoomEditor'
import { editorWidgetsProps } from '@/consts/editorElements'
import { WidgetType } from '@/types/room.interface'
import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'

interface IWidgetBttn {
  title: string
  type: WidgetType
  isActive: boolean
  editorWidgets: IEditorWidget[]
  setEditorWidgets: React.Dispatch<React.SetStateAction<IEditorWidget[]>>
  zIndexCount: number
  setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const WidgetBttn: FC<IWidgetBttn> = ({
  title,
  type,
  isActive,
  editorWidgets,
  setEditorWidgets,
  zIndexCount,
  setZIndexCount
}) => {
  const handleClickWidget = () => {
    const newWidget = editorWidgetsProps.find((e) => e.type === type)

    if (!newWidget) {
      return
    }

    if (editorWidgets.filter((e) => e.type === type).length > 0) {
      setEditorWidgets((prev) => prev.filter((e) => e.type !== type))
    } else {
      setEditorWidgets((prev) => {
        setZIndexCount((prev) => prev + 1)
        return prev.length > 0
          ? [
              ...prev,
              {
                ...newWidget,
                zIndex: zIndexCount
              }
            ]
          : [
              {
                ...newWidget,
                zIndex: zIndexCount
              }
            ]
      })
    }
  }

  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <button
      onClick={handleClickWidget}
      className={
        (isActive
          ? `${colorVariants.bg[roomAppearance.active_room_color]} ${
              colorVariantsHover.bg[roomAppearance.active_room_color]
            } `
          : `border-8 ${colorVariants.border[roomAppearance.active_room_color]} ${
              colorVariantsHover.border[roomAppearance.active_room_color]
            } `) +
        'h-[5.3125rem] rounded-[1.8125rem] px-4 text-[1.5625rem] leading-none text-primaryText transition-all odd:mb-[0.875rem] hover:text-white min-desktop:w-[20rem] medium-desktop:w-[23.1875rem]'
      }
    >
      {title}
    </button>
  )
}

export default WidgetBttn
