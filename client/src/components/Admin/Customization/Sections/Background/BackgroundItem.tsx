import { useCreateBackground } from '@/api/useCreateBackground'
import { useDeleteBackground } from '@/api/useDeleteBackground'
import { IBackground } from '@/types/background.interface'
import { FC, useEffect, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import CustomizationImgUpload from '../../CustomizationImgUpload'
import { isNumber } from '@/utils/isNumber'

interface IBackgroundItem {
  bg?: IBackground
  isNew?: boolean
}

const BackgroundItem: FC<IBackgroundItem> = ({ bg, isNew = false }) => {
  const [isForSale, setIsForSale] = useState<boolean>(bg ? bg?.isForSale : false)
  const [price, setPrice] = useState<string>(bg?.cost ? String(bg?.cost) : '')
  const [title, setTitle] = useState<string>(bg?.title ?? '')
  const [bgImg, setBgImg] = useState<File | null>(null)

  const { mutate: create, isSuccess: isSuccessCreate } = useCreateBackground()
  const { mutate: remove } = useDeleteBackground(bg?.id ?? null)

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

    if (!bgImg) {
      console.log('img is required')
      return
    }
    data.append('bgImg', bgImg)

    create(data)
  }

  const clearFields = () => {
    setIsForSale(false)
    setPrice('')
    setTitle('')
    setBgImg(null)
  }

  useEffect(() => {
    if (isSuccessCreate) {
      clearFields()
    }
  }, [isSuccessCreate])

  return (
    <div className='relative mb-6 flex h-[6.9375rem] w-full items-center justify-between last-of-type:mb-0'>
      <div className='flex h-full w-[56.81rem] items-center pr-[5%]'>
        <div className='flex h-full w-[18%] items-center justify-center'>
          <CustomizationCheckbox
            isActive={isNew}
            isChecked={isForSale}
            setIsChecked={setIsForSale}
          />
        </div>
        <div className='flex h-full w-[21.7%] items-center justify-center px-4'>
          {isNew ? (
            <input
              className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{bg?.cost}</p>
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
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{bg?.title}</p>
          )}
        </div>
        <div className='flex h-full w-[12%] items-center justify-center'>
          {isNew ? (
            <CustomizationImgUpload imgSrc={bg?.img ?? null} img={bgImg} setImg={setBgImg} />
          ) : (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${bg?.img}`}
              alt='bg-img'
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

export default BackgroundItem
