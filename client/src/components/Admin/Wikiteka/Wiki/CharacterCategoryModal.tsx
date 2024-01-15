import { useCharacterCategories } from '@/api/useCharacterCategories'
import { useCreateCharacterCategory } from '@/api/useCreateCharacterCategory'
import { ICategory } from '@/types/wiki.interface'
import { FC, useEffect, useState } from 'react'
import CharacterCategoryItem from './CharacterCategoryItem'

interface ICharacterCategoryModal {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	category: ICategory | null
	setCategory: React.Dispatch<React.SetStateAction<ICategory | null>>
}

const CharacterCategoryModal: FC<ICharacterCategoryModal> = ({
	isVisible,
	setIsVisible,
	category,
	setCategory,
}) => {
	const [categoryValue, setCategoryValue] = useState<string>('')

	const { data: categories, isLoading, isError } = useCharacterCategories()
	const { mutate: createCategory, isSuccess: isSuccessCreate } =
		useCreateCharacterCategory()

	const chooseCategory = (item: ICategory) => {
		if (category?.id === item.id) {
			setCategory(null)
		} else {
			setCategory(item)
		}
	}

	const handleCreateCategory = () => {
		if (categoryValue) {
			createCategory({ title: categoryValue })
		}
	}

	useEffect(() => {
		if (isSuccessCreate) {
			setCategoryValue('')
		}
	}, [isSuccessCreate])

	return (
		<div
			onClick={() => setIsVisible(false)}
			className={
				(isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				`bg-black bg-opacity-60 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all`
			}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-secondary text-center items-center rounded-[37px] w-[30rem] pt-4'
			>
				<h2 className='text-[#FFF] text-3xl pb-4 border-b-2 border-primary'>
					Категории
				</h2>
				<div className='flex flex-col items-center min-h-[18rem] max-h-[18rem] overflow-y-auto'>
					{isLoading ? (
						<div className='w-full h-[18rem] flex justify-center items-center'>
							<p>Загрузка...</p>
						</div>
					) : isError ? (
						<div className='w-full h-[18rem] flex justify-center items-center'>
							<p>Ошибка</p>
						</div>
					) : (
						categories.map(item => (
							<CharacterCategoryItem
								key={item.id}
								item={item}
								chooseCategory={chooseCategory}
								category={category}
								setCategory={setCategory}
							/>
						))
					)}
				</div>

				<div className='w-full h-10 flex items-center'>
					<input
						value={categoryValue}
						onChange={e => setCategoryValue(e.target.value)}
						className='bg-transparent outline-none w-[80%] h-full border-primary border-4 border-r-0 text-center rounded-bl-[37px] px-4 text-[#FFF]'
					/>
					<button
						onClick={handleCreateCategory}
						className='flex-1 h-full bg-primary hover:bg-primaryHover text-[#FFF] text-xl transition-all rounded-br-[37px]'
					>
						+
					</button>
				</div>
			</div>
		</div>
	)
}

export default CharacterCategoryModal
