import CropModal from '@/components/CropModal'
import { cn } from '@/utils/cn'
import { clearCanvas } from '@/utils/cropUtils'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface ICustomizationImgUpload {
	imgSrc: string | null
	img: File | null
	setImg: React.Dispatch<React.SetStateAction<File | null>>
	isHasMiniature?: boolean
	miniatureProps?: {
		isVisible: boolean
		setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
		setMiniature: React.Dispatch<React.SetStateAction<File | null>>
		canvas: HTMLCanvasElement | null
	}
	isFrame?: boolean
}

const CustomizationImgUpload: FC<ICustomizationImgUpload> = ({
	imgSrc,
	img,
	setImg,
	isHasMiniature = false,
	miniatureProps,
	isFrame = false,
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

		if (miniatureProps?.canvas) {
			console.log('gsdfg')

			clearCanvas(miniatureProps?.canvas)
		}
	}, [imgSrc, img])

	return (
		<div
			className={
				'w-full h-full flex justify-center items-center transition-all relative'
			}
		>
			<input
				ref={inputRef}
				className='absolute z-10 bg-transparent w-full aspect-[104/83] opacity-0'
				accept='image/*'
				type='file'
				onChange={e => handleFileChange(e)}
			/>
			<div
				className={
					(isImgUploaded ? 'invisible opacity-0' : 'visible opacity-100') +
					' w-full aspect-[105/69] bg-primaryText transition-all'
				}
			/>
			<img
				ref={imgRef}
				className={cn(
					'absolute h-full',
					{
						'visible opacity-100': isImgUploaded,
						'invisible opacity-0': !isImgUploaded,
					},
					{
						'w-[104px] h-[83px]': isFrame,
						'object-contain': !isFrame,
					}
				)}
				src={
					!!imgSrc
						? imgSrc.includes('blob')
							? `${imgSrc}`
							: `${import.meta.env.VITE_SERVER_URL}/${imgSrc}`
						: '#'
				}
				alt='badge-img'
			/>

			{isHasMiniature && miniatureProps && (
				<CropModal
					aspect={236 / 200}
					img={imgRef.current?.src ?? ''}
					isVisible={miniatureProps.isVisible}
					setIsVisible={miniatureProps.setIsVisible}
					setMiniature={miniatureProps.setMiniature}
					canvas={miniatureProps.canvas}
				/>
			)}
		</div>
	)
}

export default CustomizationImgUpload
