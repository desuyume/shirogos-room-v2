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
  setCategory
}) => {
  const [categoryValue, setCategoryValue] = useState<string>('')

  const { data: categories, isLoading, isError } = useCharacterCategories()
  const { mutate: createCategory, isSuccess: isSuccessCreate } = useCreateCharacterCategory()

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
        `fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-all`
      }
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='w-[30rem] items-center rounded-[37px] bg-secondary pt-4 text-center'
      >
        <h2 className='border-b-2 border-primary pb-4 text-3xl text-[#FFF]'>Категории</h2>
        <div className='flex max-h-[18rem] min-h-[18rem] flex-col items-center overflow-y-auto'>
          {isLoading ? (
            <div className='flex h-[18rem] w-full items-center justify-center'>
              <p>Загрузка...</p>
            </div>
          ) : isError ? (
            <div className='flex h-[18rem] w-full items-center justify-center'>
              <p>Ошибка</p>
            </div>
          ) : (
            categories.map((item) => (
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

        <div className='flex h-10 w-full items-center'>
          <input
            value={categoryValue}
            onChange={(e) => setCategoryValue(e.target.value)}
            className='h-full w-[80%] rounded-bl-[37px] border-4 border-r-0 border-primary bg-transparent px-4 text-center text-[#FFF] outline-none'
          />
          <button
            onClick={handleCreateCategory}
            className='h-full flex-1 rounded-br-[37px] bg-primary text-xl text-[#FFF] transition-all hover:bg-primaryHover'
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CharacterCategoryModal
