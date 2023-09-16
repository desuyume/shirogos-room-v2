import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IBadgeAward { 
	selectedAwardType: string | null
	setBadgeImg: React.Dispatch<React.SetStateAction<File | null>>
}

const BadgeAward: FC<IBadgeAward> = ({ selectedAwardType, setBadgeImg }) => {
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setBadgeImg(e.target.files[0])
		}
	}

	return (
		<div className={(selectedAwardType === 'badge' ? 'block ' : 'hidden ') + 'w-full flex-1 flex justify-center items-center transition-all relative'}>
			<input
					ref={inputRef}
					className='absolute z-10 bg-transparent w-[7.6875rem] h-[5.0625rem] opacity-0'
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
						' absolute h-[5.0625rem] mx-auto'
					}
					src='#'
					alt='award-img'
				/>
		</div>
	)
}

export default BadgeAward