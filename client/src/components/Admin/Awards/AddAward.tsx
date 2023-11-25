import { useCreateAward } from '@/api/useCreateAward'
import { AwardType, IAwardType } from '@/types/award.interface'
import { isNumber } from '@/utils/isNumber'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IAddAward {
	sectionType: AwardType
	awardTypes: IAwardType[]
}

const AddAward: FC<IAddAward> = ({ sectionType, awardTypes }) => {
	const [cost, setCost] = useState<string>('')
	const [title, setTitle] = useState<string>('')
	const [img, setImg] = useState<File | null>(null)
	const [awardTypeValue, setAwardTypeValue] = useState<string>(
		awardTypes[0].type
	)
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const { mutate, isSuccess } = useCreateAward()

	const clickCreate = () => {
		if (!isNumber(cost)) {
			console.log('cost must be number')
			return
		}

		if (!title || !title.length) {
			console.log('title must be not empty')
			return
		}

		if (!img) {
			console.log('img is required')
			return
		}

		const awardData = new FormData()
		awardData.append('cost', cost)
		awardData.append('title', title)
		awardData.append('awardType', awardTypeValue)
		awardData.append('awardImg', img)
		awardData.append('category', sectionType)

		mutate(awardData)
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0])
		}
	}

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	useEffect(() => {
		if (isSuccess) {
			setCost('')
			setTitle('')
			setImg(null)
			setIsImgUploaded(false)
		}
	}, [isSuccess])

	return (
		<div className='flex justify-center items-center h-[5.5rem] ml-[10.69rem]'>
			{sectionType === AwardType.BOUTIQUE ? (
				<div className='w-[9.9375rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
					<input
						value={cost}
						onChange={e => setCost(e.target.value)}
						className='text-[#FFF] text-xl bg-transparent w-full h-full outline-none text-center'
					/>
				</div>
			) : (
				<></>
			)}

			<div className='w-[19.1875rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
					className='text-[#FFF] text-xl bg-transparent w-full h-full outline-none text-center'
				/>
			</div>
			<div className='w-[27.625rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
				<select
					value={awardTypeValue}
					onChange={e => setAwardTypeValue(e.target.value)}
					className='w-full h-full cursor-pointer text-center bg-transparent outline-none text-[1.125rem] text-[#FFF]'
				>
					{awardTypes.map(awardType => (
						<option key={awardType.id} className='bg-tertiary'>
							{awardType.type}
						</option>
					))}
				</select>
			</div>
			<div className='w-[18.125rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem] relative'>
				<input
					ref={inputRef}
					className='absolute inset-0 z-10 bg-transparent w-full h-full opacity-0'
					accept='image/*'
					type='file'
					onChange={e => handleFileChange(e)}
				/>
				<div
					className={
						(isImgUploaded ? 'invisible opacity-0' : 'visible opacity-100') +
						' w-[7.6875rem] h-[5.0625rem] bg-[#D9D9D9] transition-all'
					}
				/>
				<img
					ref={imgRef}
					className={
						(isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') +
						' absolute h-[5.0625rem] mx-auto inset-0'
					}
					src='#'
					alt='award-img'
				/>
			</div>
			<button
				onClick={clickCreate}
				className='bg-primary hover:bg-primaryHover w-[9.75rem] h-[3.125rem] text-xl text-[#FFF] hover:bg-opacity-90 transition-all'
			>
				Добавить
			</button>
		</div>
	)
}

export default AddAward
