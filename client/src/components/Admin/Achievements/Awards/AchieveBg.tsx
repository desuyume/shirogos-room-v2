import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IAchieveBg {
	selectedAwardType: string | null
	imgSrc: string | null
	img: File | null
	setImg: React.Dispatch<React.SetStateAction<File | null>>
}

const AchieveBg: FC<IAchieveBg> = ({
	selectedAwardType,
	imgSrc,
	img,
	setImg,
}) => {
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0])
		}
	}

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
				(selectedAwardType === 'achieve-bg' ? 'block ' : 'hidden ') +
				'w-full flex-1 flex justify-center items-center transition-all relative'
			}
		>
			<input
				ref={inputRef}
				className='absolute z-10 bg-transparent w-full aspect-[213/30] opacity-0'
				accept='image/*'
				type='file'
				onChange={e => handleFileChange(e)}
			/>
			<div
				className={
					(isImgUploaded ? 'invisible opacity-0' : 'visible opacity-100') +
					' w-full aspect-[213/30] bg-primaryText transition-all'
				}
			/>
			<img
				ref={imgRef}
				className={
					(isImgUploaded ? 'visible opacity-100' : 'invisible opacity-0') +
					' absolute w-full aspect-[213/30] mx-auto'
				}
				src={
					!!imgSrc
						? imgSrc.includes('blob')
							? `${imgSrc}`
							: `${import.meta.env.VITE_SERVER_URL}/${imgSrc}`
						: '#'
				}
				alt='award-img'
			/>
		</div>
	)
}

export default AchieveBg
