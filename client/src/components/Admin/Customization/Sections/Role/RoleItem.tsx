import { IUniqueRole, UniqueRoleType } from '@/types/unique-role.interface'
import { FC, useEffect, useState } from 'react'
import { isNumber } from '@/utils/isNumber'
import { useCreateRole } from '@/api/useCreateRole'
import { useDeleteUniqueRole } from '@/api/useDeleteUniqueRole'
import { useUpdateRole } from '@/api/useUpdateRole'
import { toast } from 'react-toastify'
import CusomizationItem from '../../CusomizationItem'

interface IRoleItem {
  role?: IUniqueRole
  isNew?: boolean
  type: UniqueRoleType
}

const RoleItem: FC<IRoleItem> = ({ role, isNew = false, type }) => {
  const [isForSale, setIsForSale] = useState<boolean>(role ? role?.isForSale : false)
  const [price, setPrice] = useState<string>(role?.cost ? String(role?.cost) : '')
  const [title, setTitle] = useState<string>(role?.title ?? '')

  const { mutate: createRole, isSuccess: isSuccessCreate } = useCreateRole(type)
  const { mutate: updateRole } = useUpdateRole(role?.id ?? null)
  const { mutate: remove } = useDeleteUniqueRole(role?.id ?? null, type)

  const create = () => {
    if (!title) {
      toast.error('Нужно указать название')
      return
    }

    if (isForSale && !price) {
      toast.error('Нужно указать цену')
      return
    }
    if (isForSale && !isNumber(price)) {
      toast.error('Цена должна быть числом')
      return
    }

    createRole({ title, cost: Number(price), isForSale })
  }

  const update = () => {
    if (!title) {
      toast.error('Нужно указать название')
      return
    }

    if (isForSale && !price) {
      toast.error('Нужно указать цену')
      return
    }
    if (isForSale && !isNumber(price)) {
      toast.error('Цена должна быть числом')
      return
    }

    updateRole({ title, cost: Number(price) })
  }

  const clearFields = () => {
    setIsForSale(false)
    setPrice('')
    setTitle('')
  }

  useEffect(() => {
    if (isSuccessCreate) {
      clearFields()
    }
  }, [isSuccessCreate])

  return (
    <CusomizationItem isNew={isNew} create={create} update={update} remove={remove} section='roles' customizationItem={{
      badgeType: null,
      price: { value: price, setValue: setPrice },
      isForSale: { value: isForSale, setValue: setIsForSale },
      title: { value: title, setValue: setTitle },
      description: null,
      img: null,
      miniature: null,
    }} />
  )
}

export default RoleItem
