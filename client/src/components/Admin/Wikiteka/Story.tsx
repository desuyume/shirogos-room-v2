import { FC, useState } from 'react'
import StoryList from './Story/StoryList'
import StoryEditor from './Story/StoryEditor'
import { IStory } from '@/types/story.interface'
import RemoveConfirmModal from '@/components/RemoveConfirmModal'
import { useAllStories } from '@/api/useAllStories'
import { useDeleteStory } from '@/api/useDeleteStory'

const Story: FC = () => {
  const [isStoryEditorVisible, setIsStoryEditorVisible] = useState<boolean>(false)
  const [isRemoveModalVisible, setIsRemoveModalVisible] = useState<boolean>(false)

  const [selectedStory, setSelectedStory] = useState<IStory | null>(null)

  const { data: stories, isLoading, isError } = useAllStories()
  const { mutate: deleteStory } = useDeleteStory(selectedStory?.id ?? null)

  const removeStory = () => {
    if (selectedStory) {
      deleteStory()
    }
  }

  return (
    <div className='w-[25.2%]'>
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Ошибка</p>
        </div>
      ) : (
        <>
          <StoryList
            stories={stories}
            setSelectedStory={setSelectedStory}
            setIsStoryEditorVisible={setIsStoryEditorVisible}
            setIsRemoveModalVisible={setIsRemoveModalVisible}
          />
          <button
            onClick={() => {
              setSelectedStory(null)
              setIsStoryEditorVisible(true)
            }}
            className='h-8 w-[80.8%] bg-primary px-2 text-[0.9375rem] leading-none text-[#FFF] hover:bg-primaryHover'
          >
            Добавить рассказ
          </button>
          <StoryEditor
            isVisible={isStoryEditorVisible}
            setIsVisible={setIsStoryEditorVisible}
            selectedStory={selectedStory}
          />

          <RemoveConfirmModal
            isVisible={isRemoveModalVisible}
            setIsVisible={setIsRemoveModalVisible}
            elementText={`Рассказ - ${selectedStory?.title}`}
            removeFn={removeStory}
          />
        </>
      )}
    </div>
  )
}

export default Story
