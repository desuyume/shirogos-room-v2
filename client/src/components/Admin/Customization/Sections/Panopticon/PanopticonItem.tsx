import { useCreatePanopticon } from '@/api/useCreatePanopticon'
import { useDeletePanopticon } from '@/api/useDeletePanopticon'
import { IPanopticon } from '@/types/panopticon.interface'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useState } from 'react'
import CusomizationItem from '../../CusomizationItem'
import { useUpdatePanopticon } from '@/api/useUpdatePanopticon'
import { toast } from 'react-toastify'
import { imgSrcToFile } from '@/utils/imageConvert'

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
  const [isNewMiniature, setIsNewMiniature] = useState<boolean>(false)

  const { mutate: createPanopticon, isSuccess: isSuccessCreate } = useCreatePanopticon()
  const { mutate: updatePanopticon } = useUpdatePanopticon(panopticon?.id ?? null)
  const { mutate: remove } = useDeletePanopticon(panopticon?.id ?? null)

  const create = () => {
    const data = new FormData()

    if (!title) {
      toast.error('Нужно указать название')
      return
    }
    data.append('title', title)

    if (description) {
      data.append('description', description)
    }

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

    if (!panopticonImg) {
      toast.error('Нужно добавить картинку')
      return
    }
    data.append('img', panopticonImg)

    if (miniatureImg) {
      data.append('miniatureImg', miniatureImg)
    }

    createPanopticon(data)
  }

  const update = async () => {
    const data = new FormData()

    if (!title) {
      toast.error('Нужно указать название')
      return
    }
    data.append('title', title)

    if (description) {
      data.append('description', description)
    }

    if (isForSale && !price) {
      toast.error('Нужно указать цену')
      return
    }
    if (isForSale && !isNumber(price)) {
      toast.error('Цена должна быть числом')
      return
    }
    data.append('cost', price)

    if (panopticonImg) {
      data.append('img', panopticonImg)
    } else if (panopticon?.img) {
      const img = await imgSrcToFile(panopticon.img)
      data.append('img', img)
    } else {
      toast.error('Нужно добавить картинку')
      return
    }

    if (miniatureImg) {
      data.append('miniatureImg', miniatureImg)
    } else if (panopticon?.miniatureImg && !isNewMiniature) {
      const img = await imgSrcToFile(panopticon.miniatureImg)
      data.append('miniatureImg', img)
    }

    updatePanopticon(data)
  }

  const clearFields = () => {
    setIsForSale(false)
    setPrice('')
    setTitle('')
    setDescription('')
    setPanopticonImg(null)
    setMiniatureImg(null)
    setIsNewMiniature(false)
  }

  useEffect(() => {
    if (isSuccessCreate) {
      clearFields()
    }
  }, [isSuccessCreate])

  useEffect(() => {
    setMiniatureImg(null)
  }, [panopticonImg])

  return (
    <CusomizationItem isNew={isNew} create={create} update={update} remove={remove} section='panopticons' customizationItem={{
      badgeType: null,
      price: { value: price, setValue: setPrice },
      isForSale: { value: isForSale, setValue: setIsForSale },
      title: { value: title, setValue: setTitle },
      description: { value: description, setValue: setDescription },
      img: { src: panopticon?.img ?? null, value: panopticonImg, setValue: setPanopticonImg },
      miniature: {
        src: panopticon?.miniatureImg ?? null,
        value: miniatureImg,
        setValue: setMiniatureImg,
        isNew: isNewMiniature,
        setIsNew: setIsNewMiniature,
      },
    }} />
  )
}

export default PanopticonItem
