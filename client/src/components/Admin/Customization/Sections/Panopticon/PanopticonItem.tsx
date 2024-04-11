import { useCreatePanopticon } from '@/api/useCreatePanopticon'
import { useDeletePanopticon } from '@/api/useDeletePanopticon'
import { IPanopticon } from '@/types/panopticon.interface'
import { isNumber } from '@/utils/isNumber'
import { FC, useEffect, useRef, useState } from 'react'
import CustomizationCheckbox from '../../ui/CustomizationCheckbox'
import CustomizationImgUpload from '../../CustomizationImgUpload'

interface IPanopticonItem {
	panopticon?: IPanopticon
	isNew?: boolean
}

const PanopticonItem: FC<IPanopticonItem> = ({ panopticon, isNew = false }) => {
	const [isForSale, setIsForSale] = useState<boolean>(
		panopticon ? panopticon?.isForSale : false
	)
	const [price, setPrice] = useState<string>(
		panopticon?.cost ? String(panopticon?.cost) : ''
	)
	const [title, setTitle] = useState<string>(panopticon?.title ?? '')
	const [description, setDescription] = useState<string>(
		panopticon?.description ?? ''
	)
	const [panopticonImg, setPanopticonImg] = useState<File | null>(null)
	const [miniatureImg, setMiniatureImg] = useState<File | null>(null)
	const miniatureRef = useRef<HTMLCanvasElement | null>(null)

	const [isMiniatureModalVisible, setIsMiniatureModalVisible] =
		useState<boolean>(false)

	const { mutate: create, isSuccess: isSuccessCreate } = useCreatePanopticon()
	const { mutate: remove } = useDeletePanopticon(panopticon?.id ?? null)

	const handleCreate = () => {
		const data = new FormData()

		if (!title) {
			console.log('title is required')
			return
		}
		data.append('title', title)

		if (description) {
			data.append('description', description)
		}

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

		if (!panopticonImg) {
			console.log('img is required')
			return
		}
		data.append('img', panopticonImg)

		if (miniatureImg) {
			data.append('miniatureImg', miniatureImg)
		}

		create(data)
	}

	const clearFields = () => {
		setIsForSale(false)
		setPrice('')
		setTitle('')
		setDescription('')
		setPanopticonImg(null)
		setMiniatureImg(null)
	}

	useEffect(() => {
		if (isSuccessCreate) {
			clearFields()
		}
	}, [isSuccessCreate])

	return (
		<div className='w-full h-[6.9375rem] flex justify-between items-center relative mb-6 last-of-type:mb-0'>
			<div className='w-[83.44rem] h-full flex items-center pr-[5%]'>
				<div className='w-[12.3%] h-full flex justify-center items-center'>
					<CustomizationCheckbox
						isActive={isNew}
						isChecked={isForSale}
						setIsChecked={setIsForSale}
					/>
				</div>
				<div className='w-[15%] h-full flex justify-center items-center px-4'>
					{isNew ? (
						<input
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-[0.9375rem]'
							value={price}
							onChange={e => setPrice(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{panopticon?.cost}
						</p>
					)}
				</div>
				<div className='w-[18%] h-full flex justify-center items-center px-4'>
					{isNew ? (
						<input
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-[0.9375rem]'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-[0.9375rem] text-center'>
							{panopticon?.title}
						</p>
					)}
				</div>
				<div className='flex-1 h-full flex justify-center items-center px-4'>
					{isNew ? (
						<textarea
							className='w-full h-full bg-transparent text-[#FFF] outline-none border-none text-center text-xs resize-none py-2'
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
					) : (
						<p className='text-[#FFF] text-xs text-center'>
							{panopticon?.description}
						</p>
					)}
				</div>
				<div className='w-[10%] h-full flex justify-center items-center mr-4'>
					{isNew ? (
						<CustomizationImgUpload
							imgSrc={panopticon?.img ?? null}
							img={panopticonImg}
							setImg={setPanopticonImg}
							isHasMiniature
							miniatureProps={{
								isVisible: isMiniatureModalVisible,
								setIsVisible: setIsMiniatureModalVisible,
								setMiniature: setMiniatureImg,
								canvas: miniatureRef.current,
							}}
						/>
					) : (
						<img
							src={`${import.meta.env.VITE_SERVER_URL}/${panopticon?.img}`}
							alt='bg-img'
							className='h-full object-contain'
						/>
					)}
				</div>
				<div className='w-[10%] h-full flex justify-center items-center'>
					{panopticon?.miniatureImg ? (
						<img
							src={`${import.meta.env.VITE_SERVER_URL}/${panopticon?.miniatureImg}`}
							alt='bg-img'
							className='rounded-[1.5625rem]'
						/>
					) : (
						<canvas
							className={
								(panopticonImg || panopticon?.img
									? 'opacity-100 visible '
									: 'opacity-0 invisible ') + 'w-full h-full rounded-[1.5625rem]'
							}
							ref={miniatureRef}
						></canvas>
					)}
				</div>
			</div>
			{isNew ? (
				<div className='flex flex-col'>
					<button
						onClick={handleCreate}
						className='w-[7.1875rem] h-[2.3125rem] bg-primary text-[#FFF] text-[0.9375rem] hover:bg-primaryHover transition-all mb-2'
					>
						Добавить
					</button>
					<button
						onClick={() => setIsMiniatureModalVisible(true)}
						className='w-[7.1875rem] h-[1.875rem] bg-tertiary text-[#FFF] text-[0.9375rem] hover:bg-opacity-80 transition-all mb-1'
					>
						Миниатюра
					</button>
				</div>
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

export default PanopticonItem
