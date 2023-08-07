import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

const AddRoomContent: FC = () => {
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const [cost, setCost] = useState<number>(0)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	return (
		<div className='h-[6.6875rem] bg-tertiary w-full flex justify-between items-center'>
			<input
				value={cost}
				onChange={e => setCost(+e.target.value)}
				className='w-[45%] bg-transparent h-full outline-none text-center text-xl font-secondary font-bold text-[#FFF]'
			/>
			<div className={(isImgUploaded ? 'bg-transparent' : 'bg-[#D9D9D9]') + ' w-[30%] mr-[5%] h-[4.75rem] relative'}>
				<input
					ref={inputRef}
					className='absolute inset-0 z-10 bg-transparent w-full h-full opacity-0'
					accept='image/*'
					type='file'
				/>
				<img
					ref={imgRef}
					className={(isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') + ' absolute w-full h-full inset-0'}
					src='#'
					alt='panopticon-img'
				/>
			</div>
			<button className='bg-primary hover:bg-primaryHover transition-all text-[#FFF] w-[20%] text-[0.625rem] h-full'>
				Добавить
			</button>
		</div>
	)
}

export default AddRoomContent
