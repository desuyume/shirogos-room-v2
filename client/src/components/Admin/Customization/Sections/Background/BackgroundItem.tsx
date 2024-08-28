import { useCreateBackground } from '@/api/useCreateBackground'
import { useDeleteBackground } from '@/api/useDeleteBackground'
import { IBackground } from '@/types/background.interface'
import { FC, useEffect, useState } from 'react'
import { isNumber } from '@/utils/isNumber'
import CusomizationItem from '../../CusomizationItem'
import { useUpdateBackground } from '@/api/useUpdateBackground'
import { imgSrcToFile } from '@/utils/imageConvert'
import { toast } from 'react-toastify'

interface IBackgroundItem {
  bg?: IBackground
  isNew?: boolean
}

const BackgroundItem: FC<IBackgroundItem> = ({ bg, isNew = false }) => {
  const [isForSale, setIsForSale] = useState<boolean>(bg ? bg?.isForSale : false)
  const [price, setPrice] = useState<string>(bg?.cost ? String(bg?.cost) : '')
  const [title, setTitle] = useState<string>(bg?.title ?? '')
  const [bgImg, setBgImg] = useState<File | null>(null)

  const { mutate: createBg, isSuccess: isSuccessCreate } = useCreateBackground()
  const { mutate: updateBg } = useUpdateBackground(bg?.id ?? null)
  const { mutate: remove } = useDeleteBackground(bg?.id ?? null)

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

    if (!bgImg) {
      toast.error('Нужно добавить картинку')
      return
    }
    data.append('bgImg', bgImg)

    createBg(data)
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

    if (bgImg) {
      data.append('bgImg', bgImg)
    } else if (bg?.img) {
      const img = await imgSrcToFile(bg.img)
      data.append('bgImg', img)
    } else {
      toast.error('Нужно добавить картинку')
      return
    }

    updateBg(data)
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
    <CusomizationItem isNew={isNew} create={create} update={update} remove={remove} section='backgrounds' customizationItem={{
      badgeType: null,
      price: { value: price, setValue: setPrice },
      isForSale: { value: isForSale, setValue: setIsForSale },
      title: { value: title, setValue: setTitle },
      description: null,
      img: { src: bg?.img ?? null, value: bgImg, setValue: setBgImg },
      miniature: null,
    }} />
  )
}

export default BackgroundItem
