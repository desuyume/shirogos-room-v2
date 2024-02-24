import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import StoryItem from './StoryItem'
import { IStory } from '@/types/story.interface'

interface IStoryList {
	stories: IStory[]
	setSelectedStory: React.Dispatch<React.SetStateAction<IStory | null>>
	setIsStoryEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const StoryList: FC<IStoryList> = ({
	stories,
	setSelectedStory,
	setIsStoryEditorVisible,
	setIsRemoveModalVisible,
}) => {
	return (
		<div className='w-full h-[52.6875rem] flex flex-col mb-[0.69rem]'>
			<div className='w-[80.8%] h-[3.375rem] flex justify-center items-center bg-tertiary'>
				<p className='text-[#FFF] text-[1.5625rem]'>Манга</p>
			</div>

			<Scrollbar noDefaultStyles style={{ width: '100%', height: '100%' }}>
				{stories.map(story => (
					<StoryItem
						key={story.id}
						story={story}
						setSelectedStory={setSelectedStory}
						setIsStoryEditorVisible={setIsStoryEditorVisible}
						setIsRemoveModalVisible={setIsRemoveModalVisible}
					/>
				))}
			</Scrollbar>
		</div>
	)
}

export default StoryList
