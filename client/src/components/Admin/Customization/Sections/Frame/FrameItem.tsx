import { FC, useEffect, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import CustomizationImgUpload from '../../CustomizationImgUpload'
import { IFrame } from '@/types/frame.interface'
import { useCreateFrame } from '@/api/useCreateFrame'
import { useDeleteFrame } from '@/api/useDeleteFrame'
import { isNumber } from '@/utils/isNumber'

interface IFrameItem {
	frame?: IFrame
	isNew?: boolean
}

const FrameItem: FC<IFrameItem> = ({ frame, isNew = false }) => {
	const [isForSale, setIsForSale] = useState<boolean>(frame ? frame?.isForSale : false)
	const [price, setPrice] = useState<string>(
		frame?.cost ? String(frame?.cost) : ''
	)
	const [title, setTitle] = useState<string>(frame?.title ?? '')
	const [frameImg, setFrameImg] = useState<File | null>(null)

	const { mutate: create, isSuccess: isSuccessCreate } = useCreateFrame()
	const { mutate: remove } = useDeleteFrame(frame?.id ?? null)

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

		if (!frameImg) {
			console.log('img is required')
			return
		}
		data.append('frameImg', frameImg)

		create(data)
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
							{frame?.cost}
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
							{frame?.title}
						</p>
					)}
				</div>
				<div className='w-[12%] h-full flex justify-center items-center'>
					{isNew ? (
						<CustomizationImgUpload
							imgSrc={frame?.frameImg ?? null}
							img={frameImg}
							setImg={setFrameImg}
						/>
					) : (
						<img
							src={`${import.meta.env.VITE_SERVER_URL}/${frame?.frameImg}`}
							alt='frame-img'
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

export default FrameItem
