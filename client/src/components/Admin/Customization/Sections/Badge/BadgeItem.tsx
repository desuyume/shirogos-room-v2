import { FC, useEffect, useState } from 'react'
import { BadgeType, IBadge } from '@/types/badge.interface'
import { useCreateBadge } from '@/api/useCreateBadge'
import { useDeleteBadge } from '@/api/useDeleteBadge'
import { isNumber } from '@/utils/isNumber'
import { useUpdateBadge } from '@/api/useUpdateBadge'
import { toast } from 'react-toastify'
import { imgSrcToFile } from '@/utils/imageConvert'
import CusomizationItem from '../../CusomizationItem'

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
  const { mutate: updateBadge } = useUpdateBadge(badge?.id ?? null)
  const { mutate: remove } = useDeleteBadge(badge?.id ?? null)

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
    data.append('type', badgeType)

    if (!badgeImg) {
      toast.error('Нужно добавить картинку')
      return
    }
    data.append('badgeImg', badgeImg)

    createBadge(data)
  }

  const update = async () => {
    const data = new FormData()

    if (!title) {
      toast.error('Нужно указать название бейджа')
      return
    }
    data.append('title', title)

    if (isForSale && !price) {
      toast.error('Нужно указать цену бейджа')
      return
    }
    if (isForSale && !isNumber(price)) {
      toast.error('Цена должна быть числом')
      return
    }
    data.append('cost', price)
    data.append('type', badgeType)

    if (badgeImg) {
      data.append('badgeImg', badgeImg)
    } else if (badge?.img) {
      const img = await imgSrcToFile(badge.img)
      data.append('badgeImg', img)
    } else {
      toast.error('Нужно добавить картинку')
      return
    }

    updateBadge(data)
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
    <CusomizationItem isNew={isNew} create={create} update={update} remove={remove} section='badges' customizationItem={{
      badgeType: { value: badgeType, setValue: setBadgeType },
      price: { value: price, setValue: setPrice },
      isForSale: { value: isForSale, setValue: setIsForSale },
      title: { value: title, setValue: setTitle },
      description: null,
      img: { src: badge?.img ?? null, value: badgeImg, setValue: setBadgeImg },
      miniature: null,
    }} />
  )
}

export default BadgeItem
