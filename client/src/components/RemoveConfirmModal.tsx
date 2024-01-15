import { FC } from 'react'

interface IRemoveConfirmModal {
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	elementText?: string
	removeFn?: () => void
}

const RemoveConfirmModal: FC<IRemoveConfirmModal> = ({
	isVisible,
	setIsVisible,
	elementText,
	removeFn,
}) => {
	const handleRemove = () => {
		removeFn && removeFn()
		setIsVisible(false)
	}

	return (
		<div
			onClick={() => setIsVisible(false)}
			className={
				(isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				`bg-black bg-opacity-60 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all`
			}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-secondary text-center items-center rounded-[37px] p-10'
			>
				<p className='text-[#FFF] text-[1.5625rem] text-center mb-8'>
					Вы уверены, что хотите удалить этот элемент?
				</p>
				{elementText && (
					<p className='text-[#FFF] text-[1.5625rem] text-center mb-8'>
						{elementText}
					</p>
				)}
				<div className='flex justify-center'>
					<button
						onClick={() => setIsVisible(false)}
						className='w-[10rem] h-[3.125rem] bg-tertiary hover:bg-opacity-80 transition-all text-[#FFF] text-[1.5625rem] mr-4'
					>
						Отмена
					</button>
					<button
						onClick={handleRemove}
						className='w-[10rem] h-[3.125rem] bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-[1.5625rem]'
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	)
}

export default RemoveConfirmModal
