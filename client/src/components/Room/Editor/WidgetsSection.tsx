import { FC } from 'react'
import WidgetBttn from './WidgetBttn'
import { IEditorWidget } from '../Sections/RoomEditor'

interface IWidgetsSection {
  editorWidgets: IEditorWidget[]
  setEditorWidgets: React.Dispatch<React.SetStateAction<IEditorWidget[]>>
  zIndexCount: number
  setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const WidgetsSection: FC<IWidgetsSection> = ({
  editorWidgets,
  setEditorWidgets,
  zIndexCount,
  setZIndexCount
}) => {
  return (
    <div className='flex h-[13.125rem] min-w-[37.1875rem] justify-center overflow-x-auto rounded-[2.3125rem] bg-secondaryHover px-[0.9375rem] py-[0.8125rem]'>
      <div className='mr-6 flex flex-col'>
        <WidgetBttn
          editorWidgets={editorWidgets}
          setEditorWidgets={setEditorWidgets}
          type='UNIQUE_ROLE'
          title='Уникальная роль'
          isActive={editorWidgets.filter((e) => e.type === 'UNIQUE_ROLE').length > 0}
          zIndexCount={zIndexCount}
          setZIndexCount={setZIndexCount}
        />
        <WidgetBttn
          editorWidgets={editorWidgets}
          setEditorWidgets={setEditorWidgets}
          type='STATISTIC'
          title='Статистика'
          isActive={editorWidgets.filter((e) => e.type === 'STATISTIC').length > 0}
          zIndexCount={zIndexCount}
          setZIndexCount={setZIndexCount}
        />
      </div>
      <div className='flex flex-col'>
        <WidgetBttn
          editorWidgets={editorWidgets}
          setEditorWidgets={setEditorWidgets}
          type='FAVORITE_CHARACTER'
          title='Любимый персонаж'
          isActive={editorWidgets.filter((e) => e.type === 'FAVORITE_CHARACTER').length > 0}
          zIndexCount={zIndexCount}
          setZIndexCount={setZIndexCount}
        />
        <WidgetBttn
          editorWidgets={editorWidgets}
          setEditorWidgets={setEditorWidgets}
          type='NOTEPAD'
          title='Блокнот'
          isActive={editorWidgets.filter((e) => e.type === 'NOTEPAD').length > 0}
          zIndexCount={zIndexCount}
          setZIndexCount={setZIndexCount}
        />
      </div>
    </div>
  )
}

export default WidgetsSection
