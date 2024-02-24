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
	setIsRemoveModalVisible,
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
		<div key={story.id} className='w-full h-[3.125rem] flex items-center'>
			<div className='w-[80.8%] h-full flex justify-center items-center bg-secondary'>
				<p className='text-[#FFF] text-xl text-center px-2 leading-none'>
					{story.title}
				</p>
			</div>

			<div className='flex-1 h-full flex justify-center items-center'>
				<button
					onClick={editHandler}
					className='bg-primary hover:bg-primaryHover transition-all w-[30%] aspect-square flex justify-center items-center mr-2'
				>
					<img className='w-[75%]' src={editIcon} alt='edit-icon' />
				</button>
				<button
					onClick={removeHandler}
					className='bg-tertiary hover:bg-opacity-80 transition-all w-[30%] aspect-square flex justify-center items-center'
				>
					<img className='w-[75%]' src={removeIcon} alt='remove-icon' />
				</button>
			</div>
		</div>
	)
}

export default StoryItem
