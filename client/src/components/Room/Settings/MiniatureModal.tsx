import { useUpdateMiniatureImg } from '@/api/useUpdateMiniatureImg'
import { saveCrop } from '@/utils/cropUtils'
import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react'
import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	type Crop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface IMiniatureModal {
	profileImg: string | null
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const MiniatureModal: FC<IMiniatureModal> = ({
	profileImg,
	isVisible,
	setIsVisible,
}) => {
	const [crop, setCrop] = useState<Crop>()
	const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const { mutate: updateMiniature, isSuccess: isSuccessUpdate } =
		useUpdateMiniatureImg()

	const setCropInCenter = (e?: SyntheticEvent<HTMLImageElement, Event>) => {
		const image = e?.currentTarget ?? imgRef.current

		if (!image) {
			return
		}

		const { naturalWidth: width, naturalHeight: height } = image

		const crop = centerCrop(
			makeAspectCrop(
				{
					// You don't need to pass a complete crop into
					// makeAspectCrop or centerCrop.
					unit: '%',
					width: 90,
				},
				5 / 4,
				width,
				height
			),
			width,
			height
		)

		setCrop(crop)
	}

	const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		imgRef.current = e.currentTarget
		setCropInCenter(e)
	}

	const clickSave = async () => {
		const saveToServer = (file: File) => {
			const data = new FormData()
			data.append('img', file)
			updateMiniature(data)
		}

		if (imgRef.current && completedCrop) {
			saveCrop(imgRef.current, completedCrop, saveToServer)
		}
	}

	useEffect(() => {
		if (isSuccessUpdate) {
			setIsVisible(false)
		}
	}, [isSuccessUpdate])

	useEffect(() => {
		const observer = new ResizeObserver(() => {
			setCropInCenter()
		})
		observer.observe(document.documentElement)

		return () => {
			observer.unobserve(document.documentElement)
		}
	}, [])

	return (
		<div
			className={
				(isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				`bg-black bg-opacity-60 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all`
			}
		>
			<div className='bg-secondary text-center items-center rounded-[37px] p-8'>
				<div className='w-full mb-6'>
					<ReactCrop
						aspect={5 / 4}
						crop={crop}
						onChange={c => setCrop(c)}
						onComplete={c => setCompletedCrop(c)}
					>
						<img
							className='h-[70vh]'
							onLoad={onImageLoad}
							src={profileImg ?? ''}
							crossOrigin='anonymous'
						/>
					</ReactCrop>
				</div>
				<div className='w-full flex justify-center items-center'>
					<button
						onClick={() => setIsVisible(false)}
						className='bg-tertiary w-52 h-10 hover:bg-opacity-80 transition-all text-primaryText mr-6'
					>
						Отмена
					</button>
					<button
						onClick={clickSave}
						className='bg-primary w-52 h-10 text-primaryText hover:bg-primaryHover transition-all'
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}

export default MiniatureModal
