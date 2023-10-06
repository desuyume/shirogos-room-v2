import { useCreateChronicleEvent } from '@/api/useCreateChronicleEvent'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { FC, useEffect, useRef, useState } from 'react'

interface IAddChronicleEvent {
	chronicleId: number | null
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const AddChronicleEvent: FC<IAddChronicleEvent> = ({
	chronicleId,
	visible,
	setVisible,
}) => {
	const [day, setDay] = useState<string>('')
	const [text, setText] = useState<string>('')
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const [img, setImg] = useState<File | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const { mutate, isSuccess } = useCreateChronicleEvent(chronicleId ?? 0)

	const clickAdd = () => {
		if (!day) {
			console.log('day is required')
			return
		}

		if (!text && !img) {
			console.log('text or img is required')
			return
		}

		const eventData = new FormData()
		eventData.append('day', day)

		if (text) {
			eventData.append('text', text)
		}
		if (img) {
			eventData.append('img', img)
		}

		mutate(eventData)
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
		if (isSuccess) {
			setVisible(false)
			setDay('')
			setImg(null)
			setText('')
			setIsImgUploaded(false)
		}
	}, [isSuccess])

	return (
		<div
			className={
				'bg-secondary bg-opacity-70 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all ' +
				(visible ? 'visible opacity-100' : 'invisible opacity-0')
			}
			onClick={() => setVisible(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-secondary text-center pt-16 pb-12 px-[3.6rem] rounded-[37px] bg-opacity-90 flex flex-col items-center'
			>
				<div className='w-[30rem] h-[2.875rem] flex mb-10'>
					<div className='w-[10%] h-full flex justify-center items-center'>
						<input
							value={day}
							onChange={e => setDay(e.target.value)}
							className='text-[#FFF] text-[0.9375rem] w-full h-full outline-none bg-transparent border-[1px] border-primary text-center placeholder:text-primaryText'
						/>
					</div>
					<div className='flex-1 h-full mx-8 flex justify-center items-center'>
						<input
							value={text}
							onChange={e => setText(e.target.value)}
							className='text-[#FFF] text-[0.9375rem] w-full h-full outline-none bg-transparent border-[1px] border-primary text-center placeholder:text-primaryText'
						/>
					</div>
					<div className='w-[2.875rem] h-full border-[1px] border-[#FFF] bg-primaryText bg-opacity-10 relative'>
						<input
							ref={inputRef}
							className='absolute inset-0 z-10 bg-transparent w-full h-full opacity-0'
							accept='image/*'
							type='file'
							onChange={e => handleFileChange(e)}
						/>
						<img
							ref={imgRef}
							className={
								(isImgUploaded
									? 'visible opacity-100'
									: 'invisible opacity-0') + ' absolute w-full h-full inset-0'
							}
							src='#'
							alt='panopticon-img'
						/>
					</div>
				</div>
				<div className='w-full h-[2.5rem] flex justify-center items-center'>
					<button
						onClick={() => setVisible(false)}
						className='w-[12rem] h-full bg-tertiary hover:bg-opacity-80 transition-all text-[#FFf] text-xl mr-4'
					>
						Отмена
					</button>
					<button
						onClick={clickAdd}
						className='w-[12rem] h-full bg-primary hover:bg-primaryHover text-[#FFF] text-xl transition-all'
					>
						Добавить
					</button>
				</div>
			</div>
		</div>
	)
}

export default AddChronicleEvent
