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
  setCategory
}) => {
  const { mutate: deleteCategory, isSuccess: isSuccessDelete } = useDeleteCharacterCategory(item.id)

  useEffect(() => {
    if (isSuccessDelete) {
      if (category?.id === item.id) {
        setCategory(null)
      }
    }
  }, [isSuccessDelete])

  return (
    <div key={item.id} className='flex max-h-[3rem] min-h-[3rem] w-full items-center'>
      <button
        onClick={() => chooseCategory(item)}
        className={
          (category?.id === item.id ? 'bg-tertiary ' : '') +
          'h-[3rem] w-[90%] text-xl text-[#FFF] transition-all hover:bg-tertiary'
        }
      >
        {item.title}
      </button>
      <button
        onClick={() => deleteCategory()}
        className='h-[3rem] flex-1 text-xl text-[#FFF] transition-all hover:bg-tertiary'
      >
        -
      </button>
    </div>
  )
}

export default CharacterCategoryItem
