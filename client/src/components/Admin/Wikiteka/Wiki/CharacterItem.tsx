import { FC } from 'react'
import editIcon from '@/assets/admin/edit.png'
import removeIcon from '@/assets/admin/remove.png'

interface ICharacterItem {
  id: string
  name: string
  setActiveCharacterId: React.Dispatch<React.SetStateAction<string | null>>
  setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const CharacterItem: FC<ICharacterItem> = ({
  id,
  name,
  setActiveCharacterId,
  setIsRemoveModalVisible,
  setIsEditorVisible
}) => {
  const clickRemove = () => {
    setActiveCharacterId(id)
    setIsRemoveModalVisible(true)
  }

  const clickEdit = () => {
    setActiveCharacterId(id)
    setIsEditorVisible(true)
  }

  return (
    <div className='relative flex h-[3.1925rem] w-full items-center'>
      <div className='flex min-w-[81.25%] max-w-[81.25%] justify-between'>
        <div className='flex h-[3.375rem] min-w-[23.8%] max-w-[23.8%] items-center justify-center bg-secondary'>
          <p className='text-center text-xl text-[#FFF]'>{id}</p>
        </div>
        <div className='flex h-[3.375rem] min-w-[calc(76.2%-0.5rem)] max-w-[calc(76.2%-0.5rem)] items-center justify-center truncate bg-secondary'>
          <p className='px-2 text-center text-xl text-[#FFF]'>{name}</p>
        </div>
      </div>

      <div className='flex flex-1 items-center justify-center'>
        <button
          onClick={clickEdit}
          className='mr-[0.56rem] flex aspect-square w-[30%] items-center justify-center bg-primary transition-all hover:bg-primaryHover'
        >
          <img className='w-[75%]' src={editIcon} alt='edit-icon' />
        </button>
        <button
          onClick={clickRemove}
          className='flex aspect-square w-[30%] items-center justify-center bg-tertiary transition-all hover:bg-opacity-80'
        >
          <img className='w-[75%]' src={removeIcon} alt='remove-icon' />
        </button>
      </div>
    </div>
  )
}

export default CharacterItem
