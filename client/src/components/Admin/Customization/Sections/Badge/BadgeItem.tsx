import { FC, useEffect, useState } from 'react'
import { BadgeType, IBadge } from '@/types/badge.interface'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import { useCreateBadge } from '@/api/useCreateBadge'
import CustomizationImgUpload from '../../CustomizationImgUpload'
import { useDeleteBadge } from '@/api/useDeleteBadge'
import { isNumber } from '@/utils/isNumber'

interface IBadgeItem {
  badge?: IBadge
  isNew?: boolean
}

const BadgeItem: FC<IBadgeItem> = ({ badge, isNew = false }) => {
  const [badgeType, setBadgeType] = useState<BadgeType>(badge ? badge.type.type : 'common')
  const [isForSale, setIsForSale] = useState<boolean>(badge ? badge?.isForSale : false)
  const [price, setPrice] = useState<string>(badge?.cost ? String(badge?.cost) : '')
  const [title, setTitle] = useState<string>(badge?.title ?? '')
  const [badgeImg, setBadgeImg] = useState<File | null>(null)

  const { mutate: createBadge, isSuccess: isSuccessCreate } = useCreateBadge()
  const { mutate: remove } = useDeleteBadge(badge?.id ?? null)

  const handleCreate = () => {
    const data = new FormData()

    if (!title) {
      console.log('title is required')
      return
    }
    data.append('title', title)

    data.append('isForSale', JSON.stringify(isForSale))

    if (isForSale && !price) {
      console.log('price for sale items is required')
      return
    }
    if (isForSale && !isNumber(price)) {
      console.log('cost must be a number')
      return
    }
    data.append('cost', price)
    data.append('type', badgeType)

    if (!badgeImg) {
      console.log('img is required')
      return
    }
    data.append('badgeImg', badgeImg)

    createBadge(data)
  }

  const clearFields = () => {
    setBadgeType('common')
    setIsForSale(false)
    setPrice('')
    setTitle('')
    setBadgeImg(null)
  }

  useEffect(() => {
    if (isSuccessCreate) {
      clearFields()
    }
  }, [isSuccessCreate])

  return (
    <div className='relative mb-6 flex h-[6.9375rem] w-full items-center justify-between last-of-type:mb-0'>
      <div className='flex h-full w-[68.06rem] items-center pr-[7%]'>
        <div className='flex h-full w-[17.5%] items-center justify-center'>
          {isNew ? (
            <select
              defaultValue={badgeType}
              onChange={(e) => setBadgeType(e.target.value as BadgeType)}
              className='h-full w-full cursor-pointer bg-transparent text-center text-[0.9375rem] text-[#FFF] hover:bg-secondaryHover'
            >
              <option value='unique'>Уникальный</option>
              <option value='copyright'>Копирайтный</option>
              <option value='common'>Обычный</option>
            </select>
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>
              {badgeType === 'common' && 'Обычный'}
              {badgeType === 'copyright' && 'Копирайтный'}
              {badgeType === 'unique' && 'Уникальный'}
            </p>
          )}
        </div>
        <div className='flex h-full w-[13%] items-center justify-center'>
          <CustomizationCheckbox
            isActive={isNew}
            isChecked={isForSale}
            setIsChecked={setIsForSale}
          />
        </div>
        <div className='flex h-full w-[25%] items-center justify-center px-4'>
          {isNew ? (
            <input
              className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{badge?.cost}</p>
          )}
        </div>
        <div className='flex h-full flex-1 items-center justify-center px-4'>
          {isNew ? (
            <input
              className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{badge?.title}</p>
          )}
        </div>
        <div className='flex h-full w-[12%] items-center justify-center'>
          {isNew ? (
            <CustomizationImgUpload
              imgSrc={badge?.img ?? null}
              img={badgeImg}
              setImg={setBadgeImg}
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${badge?.img}`}
              alt='badge-img'
              className='h-full object-contain'
            />
          )}
        </div>
      </div>
      {isNew ? (
        <button
          onClick={handleCreate}
          className='h-[2.3125rem] w-[7.1875rem] bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
        >
          Добавить
        </button>
      ) : (
        <button
          onClick={() => remove()}
          className='h-[1.875rem] w-[7.1875rem] bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80'
        >
          Удалить
        </button>
      )}
    </div>
  )
}

export default BadgeItem
