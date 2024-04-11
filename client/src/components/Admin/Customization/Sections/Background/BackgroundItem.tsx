import { useCreateBackground } from '@/api/useCreateBackground'
import { useDeleteBackground } from '@/api/useDeleteBackground'
import { IBackground } from '@/types/background.interface'
import { FC, useEffect, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import CustomizationImgUpload from '../../CustomizationImgUpload'
import { isNumber } from '@/utils/isNumber'

interface IBackgroundItem {
	bg?: IBackground
	isNew?: boolean
}

const BackgroundItem: FC<IBackgroundItem> = ({ bg, isNew = false }) => {
	const [isForSale, setIsForSale] = useState<boolean>(
		bg ? bg?.isForSale : false
	)
	const [price, setPrice] = useState<string>(bg?.cost ? String(bg?.cost) : '')
	const [title, setTitle] = useState<string>(bg?.title ?? '')
	const [bgImg, setBgImg] = useState<File | null>(null)

	const { mutate: create, isSuccess: isSuccessCreate } = useCreateBackground()
	const { mutate: remove } = useDeleteBackground(bg?.id ?? null)

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

		if (!bgImg) {
			console.log('img is required')
			return
		}
		data.append('bgImg', bgImg)

		create(data)
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
		<div className='w-full h-[6.9375rem] flex justify-between items-center relative mb-6 last-of-type:mb-0'>
			<div className='w-[56.81rem] h-full flex items-center pr-[5%]'>
				<div className='w-[18%] h-full flex justify-center items-center'>
					<CustomizationCheckbox
						isActive={isNew}
						isChecked={isForSale}
						setIsChecked={setIsForSale}
					/>
				</div>
				<div className='w-[21.7%] h-full flex justify-center items-center px-4'>
					{isNew ? (
						<input
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-[0.9375rem]'
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{bg?.cost}
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
							{bg?.title}
						</p>
					)}
				</div>
				<div className='w-[12%] h-full flex justify-center items-center'>
					{isNew ? (
						<CustomizationImgUpload
							imgSrc={bg?.img ?? null}
							img={bgImg}
							setImg={setBgImg}
						/>
					) : (
						<img
							src={`${import.meta.env.VITE_SERVER_URL}/${bg?.img}`}
							alt='bg-img'
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

export default BackgroundItem
