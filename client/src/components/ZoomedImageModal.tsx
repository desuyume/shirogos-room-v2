import { FC } from 'react'

interface ZoomedImageModalProps {
	img: string | null
	isVisible: boolean
	onClose: () => void
}

const ZoomedImageModal: FC<ZoomedImageModalProps> = ({
	img,
	isVisible,
	onClose,
}) => {
	return (
		<div
			onClick={onClose}
			className={
				(isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
				`bg-black bg-opacity-60 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all cursor-zoom-out`
			}
		>
			<div className='w-[90%] h-[90%] flex justify-center items-center'>
				{img && (
					<img
						src={`${import.meta.env.VITE_SERVER_URL}/${img}`}
						alt='img'
						className='w-full h-full object-contain'
					/>
				)}
			</div>
		</div>
	)
}

export default ZoomedImageModal
