import { IUniqueRole, UniqueRoleType } from '@/types/unique-role.interface'
import { FC, useEffect, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import { isNumber } from '@/utils/isNumber'
import { useCreateRole } from '@/api/useCreateRole'
import { useDeleteUniqueRole } from '@/api/useDeleteUniqueRole'

interface IRoleItem {
  role?: IUniqueRole
  isNew?: boolean
  type: UniqueRoleType
}

const RoleItem: FC<IRoleItem> = ({ role, isNew = false, type }) => {
  const [isForSale, setIsForSale] = useState<boolean>(role ? role?.isForSale : false)
  const [price, setPrice] = useState<string>(role?.cost ? String(role?.cost) : '')
  const [title, setTitle] = useState<string>(role?.title ?? '')

  const { mutate: create, isSuccess: isSuccessCreate } = useCreateRole(type)
  const { mutate: remove } = useDeleteUniqueRole(type)

  const handleCreate = () => {
    if (!title) {
      console.log('title is required')
      return
    }

    if (isForSale && !price) {
      console.log('price for sale items is required')
      return
    }
    if (isForSale && !isNumber(price)) {
      console.log('cost must be a number')
      return
    }

    create({ title, cost: Number(price), isForSale })
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
    <div className='relative mb-6 flex h-[6.9375rem] w-full items-center justify-between last-of-type:mb-0'>
      <div className='flex h-full w-[37.3125rem] items-center'>
        <div className='flex h-full w-[27.5%] items-center justify-center'>
          <CustomizationCheckbox
            isActive={isNew}
            isChecked={isForSale}
            setIsChecked={setIsForSale}
          />
        </div>
        <div className='flex h-full w-[33%] items-center justify-center px-4'>
          {isNew ? (
            <input
              className='h-full w-full border-none bg-transparent text-center text-[0.9375rem] text-[#FFF] outline-none'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{role?.cost}</p>
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
            <p className='text-center text-[0.9375rem] text-[#FFF]'>{role?.title}</p>
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
          onClick={() => role && remove(role?.id)}
          className='h-[1.875rem] w-[7.1875rem] bg-tertiary text-[0.9375rem] text-[#FFF] transition-all hover:bg-opacity-80'
        >
          Удалить
        </button>
      )}
    </div>
  )
}

export default RoleItem
