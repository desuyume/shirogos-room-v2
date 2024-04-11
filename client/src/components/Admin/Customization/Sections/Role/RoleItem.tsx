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
	const [isForSale, setIsForSale] = useState<boolean>(
		role ? role?.isForSale : false
	)
	const [price, setPrice] = useState<string>(
		role?.cost ? String(role?.cost) : ''
	)
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
		<div className='w-full h-[6.9375rem] flex justify-between items-center relative mb-6 last-of-type:mb-0'>
			<div className='w-[37.3125rem] h-full flex items-center'>
				<div className='w-[27.5%] h-full flex justify-center items-center'>
					<CustomizationCheckbox
						isActive={isNew}
						isChecked={isForSale}
						setIsChecked={setIsForSale}
					/>
				</div>
				<div className='w-[33%] h-full flex justify-center items-center px-4'>
					{isNew ? (
						<input
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-[0.9375rem]'
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{role?.cost}
						</p>
					)}
				</div>
				<div className='flex-1 h-full flex justify-center items-center px-4'>
					{isNew ? (
						<input
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-[0.9375rem]'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{role?.title}
						</p>
					)}
				</div>
			</div>
			{isNew ? (
				<button
					onClick={handleCreate}
					className='w-[7.1875rem] h-[2.3125rem] bg-primary text-[#FFF] text-[0.9375rem] hover:bg-primaryHover transition-all'
				>
					Добавить
				</button>
			) : (
				<button
					onClick={() => role && remove(role?.id)}
					className='w-[7.1875rem] h-[1.875rem] bg-tertiary text-[#FFF] text-[0.9375rem] hover:bg-opacity-80 transition-all'
				>
					Удалить
				</button>
			)}
		</div>
	)
}

export default RoleItem
