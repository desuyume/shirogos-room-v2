import CropModal from '@/components/CropModal'
import { clearCanvas } from '@/utils/cropUtils'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IEditorMainInfoAvatar {
	avatar: File | null
	setAvatar: React.Dispatch<React.SetStateAction<File | null>>
	setMiniature: React.Dispatch<React.SetStateAction<File | null>>
}

const EditorMainInfoAvatar: FC<IEditorMainInfoAvatar> = ({
	avatar,
	setAvatar,
	setMiniature,
}) => {
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)
	const miniatureRef = useRef<HTMLCanvasElement | null>(null)

	const [isMiniatureModalVisible, setIsMiniatureModalVisible] =
		useState<boolean>(false)

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setAvatar(e.target.files[0])
		}
	}

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	useEffect(() => {
		if (!avatar) {
			setIsImgUploaded(false)
			imgRef.current?.setAttribute('src', '')
			if (miniatureRef.current) {
				clearCanvas(miniatureRef.current)
			}
		}
	}, [avatar])

	return (
		<div className='flex mt-[1.8rem]'>
			<div className='w-[39.75rem] h-[25.8125rem] border-primary border-[5px] flex mr-[3.5rem]'>
				<div className='w-[16.375rem] h-full bg-tertiary flex justify-center items-center'>
					<p className='text-[#FFF] text-[1.5625rem] text-center'>Аватарка</p>
				</div>
				<div className='flex-1 h-full bg-primaryText bg-opacity-20 hover:bg-opacity-30 transition-all flex justify-center items-center relative'>
					<input
						ref={inputRef}
						type='file'
						accept='image/*'
						className='w-full h-full opacity-0 absolute inset-0 cursor-pointer'
						onChange={e => handleFileChange(e)}
					/>
					<p className='text-[#FFF] text-opacity-25 text-center text-[3.125rem]'>
						Загрузить аватарку
					</p>
				</div>
			</div>

			<div className='flex flex-col items-center'>
				<div className='flex flex-col items-center mb-[0.37rem]'>
					<p className='text-[1.5625rem] text-[#FFF] mb-[0.5rem] text-center leading-none'>
						Выбранная аватарка
					</p>
					<div className='w-[8.1875rem] h-[11rem] rounded-[1.25rem] bg-tertiary'>
						<img
							ref={imgRef}
							src='#'
							alt='avatar'
							className={
								(isImgUploaded
									? 'opacity-100 visible '
									: 'opacity-0 invisible ') + 'w-full h-full rounded-[1.25rem]'
							}
						/>
					</div>
				</div>
				<div className='flex flex-col items-center'>
					<p className='text-[1.5625rem] text-[#FFF] mb-[0.5rem] text-center leading-none'>
						Выбранная миниатюра
					</p>
					<button
						disabled={!isImgUploaded}
						onClick={() => isImgUploaded && setIsMiniatureModalVisible(true)}
						className='w-[8.1875rem] h-[11rem] rounded-[1.25rem] bg-tertiary hover:bg-opacity-90 transition-all disabled:hover:bg-tertiary'
					>
						<canvas
							className={
								(isImgUploaded
									? 'opacity-100 visible '
									: 'opacity-0 invisible ') + 'w-full h-full rounded-[1.25rem]'
							}
							ref={miniatureRef}
						></canvas>
					</button>
				</div>
			</div>

			<CropModal
				aspect={179 / 240}
				img={imgRef.current?.src ?? ''}
				isVisible={isMiniatureModalVisible}
				setIsVisible={setIsMiniatureModalVisible}
				canvas={miniatureRef.current}
				setMiniature={setMiniature}
			/>
		</div>
	)
}

export default EditorMainInfoAvatar
