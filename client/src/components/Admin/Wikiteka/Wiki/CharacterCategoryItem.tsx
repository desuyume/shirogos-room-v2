import { useDeleteCharacterCategory } from '@/api/useDeleteCharacterCategory'
import { ICategory } from '@/types/wiki.interface'
import { FC, useEffect } from 'react'

interface ICharacterCategoryItem {
	item: ICategory
	chooseCategory: (item: ICategory) => void
	category: ICategory | null
	setCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
}

const CharacterCategoryItem: FC<ICharacterCategoryItem> = ({
	item,
	chooseCategory,
	category,
	setCategory,
}) => {
	const { mutate: deleteCategory, isSuccess: isSuccessDelete } =
		useDeleteCharacterCategory(item.id)

	useEffect(() => {
		if (isSuccessDelete) {
			if (category?.id === item.id) {
				setCategory(null)
			}
		}
	}, [isSuccessDelete])

	return (
		<div
			key={item.id}
			className='w-full flex items-center min-h-[3rem] max-h-[3rem]'
		>
			<button
				onClick={() => chooseCategory(item)}
				className={
					(category?.id === item.id ? 'bg-tertiary ' : '') +
					'w-[90%] h-[3rem] hover:bg-tertiary text-[#FFF] text-xl transition-all'
				}
			>
				{item.title}
			</button>
			<button
				onClick={() => deleteCategory()}
				className='flex-1 h-[3rem] hover:bg-tertiary text-[#FFF] text-xl transition-all'
			>
				-
			</button>
		</div>
	)
}

export default CharacterCategoryItem
