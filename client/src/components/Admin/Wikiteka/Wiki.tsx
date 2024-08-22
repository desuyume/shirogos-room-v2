import { FC, useEffect, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import CharactersList from './Wiki/CharactersList'
import CharacterEditor from './Wiki/CharacterEditor'
import RemoveConfirmModal from '@/components/RemoveConfirmModal'
import { useDeleteCharacter } from '@/api/useDeleteCharacter'

const Wiki: FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isEditorVisible, setIsEditorVisible] = useState<boolean>(false)
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState<boolean>(false)
  const [activeCharacterId, setActiveCharacterId] = useState<string | null>(null)

  const { mutate: deleteMutate, isSuccess: isSuccessDelete } = useDeleteCharacter(activeCharacterId)

  const clickAdd = () => {
    setActiveCharacterId(null)
    setIsEditorVisible(true)
  }

  const removeCharacter = () => {
    deleteMutate()
  }

  useEffect(() => {
    if (isSuccessDelete) {
      setActiveCharacterId(null)
    }
  }, [isSuccessDelete])

  return (
    <div className='w-[25%]'>
      <div className='relative mb-[0.63rem] flex h-[2.9375rem] w-[81.25%] items-center'>
        <img className='absolute left-3 h-[2.1875rem]' src={searchIcon} alt='search-icon' />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='h-full w-full bg-tertiary pl-[4.06rem] pr-2 font-secondary text-[1.5625rem] font-normal text-[#FFF] outline-none'
        />
      </div>
      <button
        onClick={clickAdd}
        className='mb-2 h-[3.125rem] w-[81.25%] bg-primary text-[1.5625rem] text-[#FFF] transition-all hover:bg-primaryHover'
      >
        Добавить
      </button>
      <CharactersList
        searchQuery={searchQuery}
        setActiveCharacterId={setActiveCharacterId}
        setIsRemoveModalVisible={setIsRemoveModalVisible}
        setIsEditorVisible={setIsEditorVisible}
      />

      <CharacterEditor
        isVisible={isEditorVisible}
        setIsVisible={setIsEditorVisible}
        activeCharacterId={activeCharacterId}
        setActiveCharacterId={setActiveCharacterId}
      />
      <RemoveConfirmModal
        isVisible={isRemoveModalVisible}
        setIsVisible={setIsRemoveModalVisible}
        elementText={`Персонаж с id = ${activeCharacterId}`}
        removeFn={removeCharacter}
      />
    </div>
  )
}

export default Wiki
