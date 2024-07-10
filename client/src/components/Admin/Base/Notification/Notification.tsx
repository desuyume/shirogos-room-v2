import { FC, useEffect, useRef, useState } from 'react'
import FindUser from '../../FindUser'
import previewUploadedImg from '@/utils/previewUploadedImg'
import { useCreateNotification } from '@/api/useCreateNotification'
import { toast } from 'react-toastify'

const Notification: FC = () => {
	const [text, setText] = useState<string>('')
	const [selectedUsers, setSelectedUsers] = useState<string[]>([])
	const [isImgUploaded, setIsImgUploaded] = useState<boolean>(false)
	const [img, setImg] = useState<File | null>(null)
	const inputRef = useRef<HTMLInputElement | null>(null)
	const imgRef = useRef<HTMLImageElement | null>(null)

	const { mutate: createNotification, isSuccess } = useCreateNotification()

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImg(e.target.files[0])
		}
	}

	const clickSend = () => {
		const data = new FormData()
		if (!text) {
			toast.warning('Текст оповещения обязателен !')
			return
		}
		data.append('text', text)
		if (img) {
			data.append('img', img)
		}
		data.append('usernames', JSON.stringify(selectedUsers))
		createNotification(data)
	}

	const clearFields = () => {
		setText('')
		setSelectedUsers([])
		setIsImgUploaded(false)
		setImg(null)
	}

	useEffect(() => {
		previewUploadedImg(inputRef, imgRef, setIsImgUploaded)
	}, [])

	useEffect(() => {
		if (isSuccess) {
			clearFields()
		}
	}, [isSuccess])

	return (
		<div className='w-[37.58%] h-full flex flex-col'>
			<div className='w-full flex justify-between relative mb-[0.12rem]'>
				<div className='w-[65.35%] h-[9.6875rem] flex flex-col'>
					<div className='w-full h-[3.375rem] bg-tertiary flex justify-center items-center'>
						<p className='text-[#FFF] text-xl text-center leading-none'>
							Окно отправки оповещения
						</p>
					</div>
					<div className='w-full flex-1 bg-secondary flex items-center px-[1.06rem]'>
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
									(isImgUploaded
										? 'visible opacity-100'
										: 'invisible opacity-0') +
									' absolute w-full h-full inset-0 rounded-[0.4375rem] object-cover'
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
				</div>
				<FindUser
					isVisible={true}
					selectType='users'
					selectedUsers={selectedUsers}
					setSelectedUsers={setSelectedUsers}
					multiple
					className='w-[34.27%]'
				/>
			</div>
			<button
				onClick={clickSend}
				className='w-full h-[2.0625rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[0.9375rem]'
			>
				Отправить
			</button>
		</div>
	)
}

export default Notification
