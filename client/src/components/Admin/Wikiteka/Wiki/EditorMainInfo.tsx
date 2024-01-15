import { FC } from 'react'
import EditorMainInfoInput from './EditorMainInfoInput'
import EditorMainInfoAvatar from './EditorMainInfoAvatar'
import { ICategory } from '@/types/wiki.interface'

interface IEditorMainInfo {
	id: string
	setId: React.Dispatch<React.SetStateAction<string>>
	name: string
	setName: React.Dispatch<React.SetStateAction<string>>
	subtitle: string
	setSubtitle: React.Dispatch<React.SetStateAction<string>>
	subsubtitle: string
	setSubsubtitle: React.Dispatch<React.SetStateAction<string>>
	category: ICategory | null
	setCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
	avatar: File | null
	setAvatar: React.Dispatch<React.SetStateAction<File | null>>
	setMiniature: React.Dispatch<React.SetStateAction<File | null>>
	setIsCategoryModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const EditorMainInfo: FC<IEditorMainInfo> = ({
	id,
	setId,
	name,
	setName,
	subtitle,
	setSubtitle,
	subsubtitle,
	setSubsubtitle,
	category,
	setCategory,
	avatar,
	setAvatar,
	setMiniature,
	setIsCategoryModalVisible,
}) => {
	return (
		<div className='w-full h-[45.4375rem] border-[5px] box-content border-primary bg-secondary mb-3 flex flex-col items-center'>
			<EditorMainInfoInput
				state={id}
				setState={setId}
				type='id'
				title='ID персонажа'
			/>
			<EditorMainInfoInput
				state={name}
				setState={setName}
				type='name'
				title='Имя персонажа'
			/>
			<EditorMainInfoInput
				state={subtitle}
				setState={setSubtitle}
				type='subtitle'
				title='Подтитул (если есть)'
			/>
			<EditorMainInfoInput
				state={subsubtitle}
				setState={setSubsubtitle}
				type='subsubtitle'
				title='Подподтитул (если есть)'
			/>
			<EditorMainInfoInput
				state={category}
				setState={setCategory}
				type='category'
				title='Категория (если есть)'
				setIsVisible={setIsCategoryModalVisible}
			/>

			<EditorMainInfoAvatar
				avatar={avatar}
				setAvatar={setAvatar}
				setMiniature={setMiniature}
			/>
		</div>
	)
}

export default EditorMainInfo
