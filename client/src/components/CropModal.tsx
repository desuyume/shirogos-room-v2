import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { saveCrop, setCanvasImage } from '@/utils/cropUtils'
import {
	FC,
	SyntheticEvent,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'
import ReactCrop, {
	centerCrop,
	makeAspectCrop,
	type Crop,
} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ICropModal {
	aspect: number
	img: string | null
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	saveToServerFn?: (file: File) => void
	canvas?: HTMLCanvasElement | null
	setMiniature?: React.Dispatch<React.SetStateAction<File | null>>
}

const CropModal: FC<ICropModal> = ({
	aspect,
	img,
	isVisible,
	setIsVisible,
	saveToServerFn,
	canvas,
	setMiniature,
}) => {
	const [crop, setCrop] = useState<Crop>()
	const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const roomAppearance = useContext(RoomAppearanceContext)

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
				aspect,
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
		if (imgRef.current && completedCrop && saveToServerFn) {
			saveCrop(imgRef.current, completedCrop, saveToServerFn)
		}

		if (!!canvas && imgRef.current && completedCrop) {
			setCanvasImage(imgRef.current, canvas, completedCrop)
			setIsVisible(false)

			if (setMiniature) {
				const file = await saveCrop(imgRef.current, completedCrop)
				setMiniature(file)
			}
		}
	}

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
						aspect={aspect}
						crop={crop}
						onChange={c => setCrop(c)}
						onComplete={c => setCompletedCrop(c)}
					>
						<img
							className='h-[70vh]'
							onLoad={onImageLoad}
							src={img ?? ''}
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
						className={`${colorVariants.bg[roomAppearance.active_room_color]} ${
							colorVariantsHover.bg[roomAppearance.active_room_color]
						} w-52 h-10 text-primaryText transition-all`}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}

export default CropModal
