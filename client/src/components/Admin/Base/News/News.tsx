import { useCreateNews } from '@/hooks/useCreateNews'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

const News: FC = () => {
	const [text, setText] = useState<string>('')
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const [img, setImg] = useState<File | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const { mutate, isSuccess } = useCreateNews()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0])
		}
	}

	const clickAdd = () => {
		if (img) {
			const contentData = new FormData()
			contentData.append('text', text)
			contentData.append('img', img)
			mutate(contentData)
		} else {
			console.log('img is required')
		}
	}

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	useEffect(() => {
		if (isSuccess) {
			setImg(null)
			setText('')
			setIsImgUploaded(false)
		}
	}, [isSuccess])

	return (
		<div className='w-[24.56%] h-full flex flex-col'>
			<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
				<p className='text-xl text-[#FFF] text-center leading-none'>
					Окно отправки новости
				</p>
			</div>
			<div className='w-full flex-1 flex items-center px-[1.06rem] bg-secondary'>
				<div className='min-w-[4.0625rem] max-w-[4.0625rem] h-[5.5rem] rounded-[0.4375rem] border-[1px] border-[#FFF] mr-[0.81rem] relative'>
					<input
						ref={inputRef}
						className='absolute inset-0 z-10 bg-transparent w-full h-full opacity-0 rounded-[0.4375rem]'
						accept='image/*'
						type='file'
						onChange={e => handleFileChange(e)}
					/>
					<img
						ref={imgRef}
						className={
							(isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') +
							' absolute w-full h-full inset-0 rounded-[0.4375rem]'
						}
						src='#'
						alt='panopticon-img'
					/>
				</div>
				<textarea
					value={text}
					onChange={e => setText(e.target.value)}
					className='flex-1 h-[5.5rem] py-[0.31rem] bg-transparent outline-none text-[#FFF] font-secondary font-semibold text-[0.9375rem] resize-none'
				/>
			</div>
			<button
				onClick={clickAdd}
				className='w-full h-[2.0625rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-center text-[0.9375rem]'
			>
				Отправить
			</button>
		</div>
	)
}

export default News
