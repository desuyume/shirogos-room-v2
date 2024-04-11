import { FC, useEffect, useState } from 'react'
import { BadgeType, IBadge } from '@/types/badge.interface'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import { useCreateBadge } from '@/api/useCreateBadge'
import CustomizationImgUpload from '../../CustomizationImgUpload'
import { useDeleteBadge } from '@/api/useDeleteBadge'
import { isNumber } from '@/utils/isNumber'

interface IBadgeItem {
	badge?: IBadge
	isNew?: boolean
}

const BadgeItem: FC<IBadgeItem> = ({ badge, isNew = false }) => {
	const [badgeType, setBadgeType] = useState<BadgeType>(
		badge ? badge.type.type : 'common'
	)
	const [isForSale, setIsForSale] = useState<boolean>(badge ? badge?.isForSale : false)
	const [price, setPrice] = useState<string>(
		badge?.cost ? String(badge?.cost) : ''
	)
	const [title, setTitle] = useState<string>(badge?.title ?? '')
	const [badgeImg, setBadgeImg] = useState<File | null>(null)

	const { mutate: createBadge, isSuccess: isSuccessCreate } = useCreateBadge()
	const { mutate: remove } = useDeleteBadge(badge?.id ?? null)

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
		data.append('type', badgeType)

		if (!badgeImg) {
			console.log('img is required')
			return
		}
		data.append('badgeImg', badgeImg)

		createBadge(data)
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
		<div className='w-full h-[6.9375rem] flex justify-between items-center relative mb-6 last-of-type:mb-0'>
			<div className='w-[68.06rem] h-full flex items-center pr-[7%]'>
				<div className='w-[17.5%] h-full flex justify-center items-center'>
					{isNew ? (
						<select
							defaultValue={badgeType}
							onChange={e => setBadgeType(e.target.value as BadgeType)}
							className='w-full h-full cursor-pointer text-center bg-transparent text-[#FFF] hover:bg-secondaryHover text-[0.9375rem]'
						>
							<option value='unique'>Уникальный</option>
							<option value='copyright'>Копирайтный</option>
							<option value='common'>Обычный</option>
						</select>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{badgeType === 'common' && 'Обычный'}
							{badgeType === 'copyright' && 'Копирайтный'}
							{badgeType === 'unique' && 'Уникальный'}
						</p>
					)}
				</div>
				<div className='w-[13%] h-full flex justify-center items-center'>
					<CustomizationCheckbox
						isActive={isNew}
						isChecked={isForSale}
						setIsChecked={setIsForSale}
					/>
				</div>
				<div className='w-[25%] h-full flex justify-center items-center px-4'>
					{isNew ? (
						<input
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-[0.9375rem]'
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{badge?.cost}
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
							{badge?.title}
						</p>
					)}
				</div>
				<div className='w-[12%] h-full flex justify-center items-center'>
					{isNew ? (
						<CustomizationImgUpload
							imgSrc={badge?.badgeImg ?? null}
							img={badgeImg}
							setImg={setBadgeImg}
						/>
					) : (
							<img
								src={`${import.meta.env.VITE_SERVER_URL}/${badge?.badgeImg}`}
								alt='badge-img'
								className='h-full object-contain'
							/>
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
					onClick={() => remove()}
					className='w-[7.1875rem] h-[1.875rem] bg-tertiary text-[#FFF] text-[0.9375rem] hover:bg-opacity-80 transition-all'
				>
					Удалить
				</button>
			)}
		</div>
	)
}

export default BadgeItem
