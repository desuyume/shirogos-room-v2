import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IMangaEditorImgUpload {
	title: string
	img?: File | null
	imgSrc?: string | null
	setImg: React.Dispatch<React.SetStateAction<File | null>>
	className?: string
	isDisabled?: boolean
}

const MangaEditorImgUpload: FC<IMangaEditorImgUpload> = ({
	title,
	img,
	imgSrc,
	setImg,
	className,
	isDisabled,
}) => {
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

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
			className={
				(!!className ? className : '') +
				' w-[66.25rem] flex border-[5px] border-primary'
			}
		>
			<div className='w-[24.5%] h-full bg-tertiary flex justify-center items-center'>
				<p className='text-[#FFF] text-[1.5625rem] px-2'>{title}</p>
			</div>
			<div
				className={
					(isDisabled ? '' : 'hover:bg-opacity-30 ') +
					'flex-1 h-full bg-primaryText bg-opacity-20 transition-all flex justify-center items-center relative'
				}
			>
				<input
					ref={inputRef}
					type='file'
					accept='image/*'
					className='w-full h-full opacity-0 absolute inset-0 cursor-pointer disabled:cursor-default'
					onChange={e => handleFileChange(e)}
					disabled={isDisabled}
				/>
				<img
					ref={imgRef}
					src={
						!!imgSrc
							? imgSrc.includes('blob')
								? `${imgSrc}`
								: `${import.meta.env.VITE_SERVER_URL}/${imgSrc}`
							: '#'
					}
					alt='avatar'
					className={
						(isImgUploaded ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
						`h-full absolute pointer-events-none select-none`
					}
				/>
				<p
					className={
						(isImgUploaded ? 'opacity-0 invisible ' : 'opacity-100 visible ') +
						'text-[#FFF] text-opacity-25 text-center text-[3.125rem] select-none pointer-events-none'
					}
				>
					Загрузить изображение
				</p>
			</div>
		</div>
	)
}

export default MangaEditorImgUpload
