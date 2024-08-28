import { FC, useEffect, useState } from 'react'
import { IFrame } from '@/types/frame.interface'
import { useCreateFrame } from '@/api/useCreateFrame'
import { useDeleteFrame } from '@/api/useDeleteFrame'
import { isNumber } from '@/utils/isNumber'
import CusomizationItem from '../../CusomizationItem'
import { imgSrcToFile } from '@/utils/imageConvert'
import { toast } from 'react-toastify'
import { useUpdateFrame } from '@/api/useUpdateFrame'

interface IFrameItem {
  frame?: IFrame
  isNew?: boolean
}

const FrameItem: FC<IFrameItem> = ({ frame, isNew = false }) => {
  const [isForSale, setIsForSale] = useState<boolean>(frame ? frame?.isForSale : false)
  const [price, setPrice] = useState<string>(frame?.cost ? String(frame?.cost) : '')
  const [title, setTitle] = useState<string>(frame?.title ?? '')
  const [frameImg, setFrameImg] = useState<File | null>(null)

  const { mutate: createFrame, isSuccess: isSuccessCreate } = useCreateFrame()
  const { mutate: updateFrame } = useUpdateFrame(frame?.id ?? null)
  const { mutate: remove } = useDeleteFrame(frame?.id ?? null)

  const create = () => {
    const data = new FormData()

    if (!title) {
      toast.error('Нужно указать название')
      return
    }
    data.append('title', title)

    data.append('isForSale', JSON.stringify(isForSale))

    if (isForSale && !price) {
      toast.error('Нужно указать цену')
      return
    }
    if (isForSale && !isNumber(price)) {
      toast.error('Цена должна быть числом')
      return
    }
    data.append('cost', price)

    if (!frameImg) {
      toast.error('Нужно добавить картинку')
      return
    }
    data.append('frameImg', frameImg)

    createFrame(data)
  }

  const update = async () => {
    const data = new FormData()

    if (!title) {
      toast.error('Нужно указать название')
      return
    }
    data.append('title', title)

    if (isForSale && !price) {
      toast.error('Нужно указать цену')
      return
    }
    if (isForSale && !isNumber(price)) {
      toast.error('Цена должна быть числом')
      return
    }
    data.append('cost', price)

    if (frameImg) {
      data.append('frameImg', frameImg)
    } else if (frame?.img) {
      const img = await imgSrcToFile(frame.img)
      data.append('frameImg', img)
    } else {
      toast.error('Нужно добавить картинку')
      return
    }

    updateFrame(data)
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
    <CusomizationItem isNew={isNew} create={create} update={update} remove={remove} section='frames' customizationItem={{
      badgeType: null,
      price: { value: price, setValue: setPrice },
      isForSale: { value: isForSale, setValue: setIsForSale },
      title: { value: title, setValue: setTitle },
      description: null,
      img: { src: frame?.img ?? null, value: frameImg, setValue: setFrameImg },
      miniature: null,
    }} />
  )
}

export default FrameItem
