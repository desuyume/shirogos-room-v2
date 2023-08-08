import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IAddAward {
	sectionType: string
}

const AddAward: FC<IAddAward> = ({ sectionType }) => {
	const [cost, setCost] = useState<string>('')
	const [name, setName] = useState<string>('')
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	return (
		<div className='flex justify-center items-center h-[5.5rem] ml-[10.69rem]'>
			{sectionType === 'boutique' ? (
				<></>
			) : (
				<div className='w-[9.9375rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
					<input 
						value={cost}
						onChange={e => setCost(e.target.value)}
						className='text-[#FFF] text-xl bg-transparent w-full h-full outline-none text-center' 
					/>
				</div>
			)}

			<div className='w-[19.1875rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
				<input 
					value={name}
					onChange={e => setName(e.target.value)}
					className='text-[#FFF] text-xl bg-transparent w-full h-full outline-none text-center' 
				/>
			</div>
			<div className='w-[27.625rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem]'>
				<select className='w-full cursor-pointer text-center bg-transparent outline-none text-[1.125rem] text-[#FFF]'>
					<option className='bg-tertiary'>Рамка</option>
					<option className='bg-tertiary'>Значок</option>
					<option className='bg-tertiary'>Фон</option>
				</select>
			</div>
			<div className='w-[18.125rem] h-full bg-tertiary flex justify-center items-center mr-[0.94rem] relative'>
				<input
					ref={inputRef}
					className='absolute inset-0 z-10 bg-transparent w-full h-full opacity-0'
					accept='image/*'
					type='file'
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
						' absolute w-[7.6875rem] mx-auto inset-0'
					}
					src='#'
					alt='award-img'
				/>
			</div>
			<button className='bg-primary hover:bg-primaryHover w-[9.75rem] h-[3.125rem] text-xl text-[#FFF] hover:bg-opacity-90 transition-all'>
				Добавить
			</button>
		</div>
	)
}

export default AddAward
