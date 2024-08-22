import { FC } from 'react'
import editIcon from '@/assets/admin/edit.png'
import removeIcon from '@/assets/admin/remove.png'
import { IStory } from '@/types/story.interface'

interface IStoryItem {
  story: IStory
  setSelectedStory: React.Dispatch<React.SetStateAction<IStory | null>>
  setIsStoryEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
  setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const StoryItem: FC<IStoryItem> = ({
  story,
  setSelectedStory,
  setIsStoryEditorVisible,
  setIsRemoveModalVisible
}) => {
  const editHandler = () => {
    setSelectedStory(story)
    setIsStoryEditorVisible(true)
  }

  const removeHandler = () => {
    setSelectedStory(story)
    setIsRemoveModalVisible(true)
  }

  return (
    <div key={story.id} className='flex h-[3.125rem] w-full items-center'>
      <div className='flex h-full w-[80.8%] items-center justify-center bg-secondary'>
        <p className='px-2 text-center text-xl leading-none text-[#FFF]'>{story.title}</p>
      </div>

      <div className='flex h-full flex-1 items-center justify-center'>
        <button
          onClick={editHandler}
          className='mr-2 flex aspect-square w-[30%] items-center justify-center bg-primary transition-all hover:bg-primaryHover'
        >
          <img className='w-[75%]' src={editIcon} alt='edit-icon' />
        </button>
        <button
          onClick={removeHandler}
          className='flex aspect-square w-[30%] items-center justify-center bg-tertiary transition-all hover:bg-opacity-80'
        >
          <img className='w-[75%]' src={removeIcon} alt='remove-icon' />
        </button>
      </div>
    </div>
  )
}

export default StoryItem
