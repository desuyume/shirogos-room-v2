import { useCreatePanopticon } from '@/api/useCreatePanopticon'
import { useDeletePanopticon } from '@/api/useDeletePanopticon'
import { IPanopticon } from '@/types/panopticon.interface'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useRef, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import CustomizationImgUpload from '../../CustomizationImgUpload'

interface IPanopticonItem {
  panopticon?: IPanopticon
  isNew?: boolean
}

const PanopticonItem: FC<IPanopticonItem> = ({ panopticon, isNew = false }) => {
  const [isForSale, setIsForSale] = useState<boolean>(panopticon ? panopticon?.isForSale : false)
  const [price, setPrice] = useState<string>(panopticon?.cost ? String(panopticon?.cost) : '')
  const [title, setTitle] = useState<string>(panopticon?.title ?? '')
  const [description, setDescription] = useState<string>(panopticon?.description ?? '')
  const [panopticonImg, setPanopticonImg] = useState<File | null>(null)
  const [miniatureImg, setMiniatureImg] = useState<File | null>(null)
  const miniatureRef = useRef<HTMLCanvasElement | null>(null)

  const [isMiniatureModalVisible, setIsMiniatureModalVisible] = useState<boolean>(false)

  const { mutate: create, isSuccess: isSuccessCreate } = useCreatePanopticon()
  const { mutate: remove } = useDeletePanopticon(panopticon?.id ?? null)

  const handleCreate = () => {
    const data = new FormData()

    if (!title) {
      console.log('title is required')
      return
    }
    data.append('title', title)

    if (description) {
      data.append('description', description)
    }

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

    if (!panopticonImg) {
      console.log('img is required')
      return
    }
    data.append('img', panopticonImg)

    if (miniatureImg) {
      data.append('miniatureImg', miniatureImg)
    }

    create(data)
  }

  const clearFields = () => {
    setIsForSale(false)
    setPrice('')
    setTitle('')
    setDescription('')
    setPanopticonImg(null)
    setMiniatureImg(null)
  }

  useEffect(() => {
    if (isSuccessCreate) {
      clearFields()
    }
  }, [isSuccessCreate])

  return (
    <div className='relative mb-6 flex h-[6.9375rem] w-full items-center justify-between last-of-type:mb-0'>
      <div className='flex h-full w-[83.44rem] items-center pr-[5%]'>
        <div className='flex h-full w-[12.3%] items-center justify-center'>
          <CustomizationCheckbox
            isActive={isNew}
            isChecked={isForSale}
            setIsChecked={setIsForSale}
          />
        </div>
        <div className='flex h-full w-[15%] items-center justify-center px-4'>
          {isNew ? (
            <input
              className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{panopticon?.cost}</p>
          )}
        </div>
        <div className='flex h-full w-[18%] items-center justify-center px-4'>
          {isNew ? (
            <input
              className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{panopticon?.title}</p>
          )}
        </div>
        <div className='flex h-full flex-1 items-center justify-center px-4'>
          {isNew ? (
            <textarea
              className='h-full w-full resize-none border-none bg-transparent py-2 text-center text-xs text-[#FFF] outline-none'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p className='text-center text-xs text-[#FFF]'>{panopticon?.description}</p>
          )}
        </div>
        <div className='mr-4 flex h-full w-[10%] items-center justify-center'>
          {isNew ? (
            <CustomizationImgUpload
              imgSrc={panopticon?.img ?? null}
              img={panopticonImg}
              setImg={setPanopticonImg}
              isHasMiniature
              miniatureProps={{
                isVisible: isMiniatureModalVisible,
                setIsVisible: setIsMiniatureModalVisible,
                setMiniature: setMiniatureImg,
                canvas: miniatureRef.current
              }}
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${panopticon?.img}`}
              alt='bg-img'
              className='h-full object-contain'
            />
          )}
        </div>
        <div className='flex h-full w-[10%] items-center justify-center'>
          {panopticon?.miniatureImg ? (
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/${panopticon?.miniatureImg}`}
              alt='bg-img'
              className='rounded-[1.5625rem]'
            />
          ) : (
            <canvas
              className={
                (panopticonImg || panopticon?.img
                  ? 'visible opacity-100 '
                  : 'invisible opacity-0 ') + 'h-full w-full rounded-[1.5625rem]'
              }
              ref={miniatureRef}
            ></canvas>
          )}
        </div>
      </div>
      {isNew ? (
        <div className='flex flex-col'>
          <button
            onClick={handleCreate}
            className='mb-2 h-[2.3125rem] w-[7.1875rem] bg-primary text-[0.9375rem] text-[#FFF] transition-all hover:bg-primaryHover'
          >
            Добавить
          </button>
          <button
            onClick={() => setIsMiniatureModalVisible(true)}
            className='mb-1 h-[1.875rem] w-[7.1875rem] bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80'
          >
            Миниатюра
          </button>
        </div>
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

export default PanopticonItem
