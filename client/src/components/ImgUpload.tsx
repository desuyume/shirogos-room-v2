import { cn } from '@/utils/cn'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface ImgUploadProps {
	img: File | null
	setImg: React.Dispatch<React.SetStateAction<File | null>>
	imgSrc?: string | null
	containerSize?: {
		width: string
		height: string
	}
	className?: string
}

const ImgUpload: FC<ImgUploadProps> = ({
	imgSrc,
	img,
	setImg,
	containerSize: containerSizeProps,
	className,
}) => {
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const containerSize = containerSizeProps ?? {
		width: '6.625rem',
		height: '4.3125rem',
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
		if (!imgSrc && !img) {
			setIsImgUploaded(false)
			imgRef.current?.setAttribute('src', '')
		} else {
			setIsImgUploaded(true)
		}
	}, [imgSrc, img])

	return (
		<div
			onClick={e => e.stopPropagation()}
			style={{ width: containerSize.width, height: containerSize.height }}
			className={cn(
				'flex justify-center items-center border-white border-opacity-50 border-[1px] transition-all relative cursor-pointer group/img-upload',
				className
			)}
		>
			<input
				ref={inputRef}
				className='absolute z-10 bg-transparent opacity-0 w-full h-full cursor-pointer'
				accept='image/*'
				type='file'
				onChange={e => handleFileChange(e)}
			/>
			<div
				className={cn(
					'w-full h-full bg-white bg-opacity-[0.15] group-hover/img-upload:bg-opacity-10 transition-all',
					{
						'visible opacity-100': !isImgUploaded,
						'invisible opacity-0': isImgUploaded,
					}
				)}
			/>
			<img
				ref={imgRef}
				className={cn(
					'w-full h-full absolute object-contain group-hover/img-upload:opacity-80 transition-all',
					{
						'visible opacity-100': isImgUploaded,
						'invisible opacity-0': !isImgUploaded,
					}
				)}
				src={
					!!imgSrc
						? imgSrc.includes('blob')
							? `${imgSrc}`
							: `${import.meta.env.VITE_SERVER_URL}/${imgSrc}`
						: '#'
				}
				alt='img'
			/>
		</div>
	)
}

export default ImgUpload
