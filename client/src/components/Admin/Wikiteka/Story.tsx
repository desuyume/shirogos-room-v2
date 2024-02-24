import { FC, useState } from 'react'
import StoryList from './Story/StoryList'
import StoryEditor from './Story/StoryEditor'
import { IStory } from '@/types/story.interface'
import RemoveConfirmModal from '@/components/RemoveConfirmModal'
import { useAllStories } from '@/api/useAllStories'
import { useDeleteStory } from '@/api/useDeleteStory'

const Story: FC = () => {
	const [isStoryEditorVisible, setIsStoryEditorVisible] =
		useState<boolean>(false)
	const [isRemoveModalVisible, setIsRemoveModalVisible] =
		useState<boolean>(false)

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
				<div className='w-full h-full flex justify-center items-center'>
					<p>Загрузка...</p>
				</div>
			) : isError ? (
				<div className='w-full h-full flex justify-center items-center'>
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
						className='w-[80.8%] h-8 bg-primary hover:bg-primaryHover text-[#FFF] text-[0.9375rem] px-2 leading-none'
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
