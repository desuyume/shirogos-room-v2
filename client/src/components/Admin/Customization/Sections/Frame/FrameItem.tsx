import { FC, useEffect, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import CustomizationImgUpload from '../../CustomizationImgUpload'
import { IFrame } from '@/types/frame.interface'
import { useCreateFrame } from '@/api/useCreateFrame'
import { useDeleteFrame } from '@/api/useDeleteFrame'
import { isNumber } from '@/utils/isNumber'

interface IFrameItem {
  frame?: IFrame
  isNew?: boolean
}

const FrameItem: FC<IFrameItem> = ({ frame, isNew = false }) => {
  const [isForSale, setIsForSale] = useState<boolean>(frame ? frame?.isForSale : false)
  const [price, setPrice] = useState<string>(frame?.cost ? String(frame?.cost) : '')
  const [title, setTitle] = useState<string>(frame?.title ?? '')
  const [frameImg, setFrameImg] = useState<File | null>(null)

  const { mutate: create, isSuccess: isSuccessCreate } = useCreateFrame()
  const { mutate: remove } = useDeleteFrame(frame?.id ?? null)

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

    if (!frameImg) {
      console.log('img is required')
      return
    }
    data.append('frameImg', frameImg)

    create(data)
  }

  const clearFields = () => {
    setIsForSale(false)
    setPrice('')
    setTitle('')
    setFrameImg(null)
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
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{frame?.cost}</p>
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
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{frame?.title}</p>
          )}
        </div>
        <div className='flex h-full w-[12%] items-center justify-center'>
          {isNew ? (
            <CustomizationImgUpload
              imgSrc={frame?.img ?? null}
              img={frameImg}
              setImg={setFrameImg}
              isFrame
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${frame?.img}`}
              alt='frame-img'
              className='h-[83px] w-[104px]'
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

export default FrameItem
