import { FC, useState } from 'react'

interface IOrderRulesModal {
	type: string
	visible: boolean
	setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderRulesModal: FC<IOrderRulesModal> = ({ type, visible, setVisible }) => {
	const [rulesText, setRulesText] = useState<string>('')

	return (
		<div
			className={
				'bg-secondary bg-opacity-50 w-screen h-screen fixed inset-0 flex justify-center items-center z-50 transition-all ' +
				(visible ? 'visible opacity-100' : 'invisible opacity-0')
			}
			onClick={() => setVisible(false)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className='bg-secondary text-center pt-16 pb-12 px-[3.6rem] rounded-[37px] bg-opacity-90'
			>
				<p className='mb-10 text-[#FFF] text-4xl'>Правила заказа {type === 'game' ? 'игр' : 'просмотра'}</p>
				<textarea
					value={rulesText}
					onChange={e => setRulesText(e.target.value)}
					className='border-primary border-2 outline-none rounded-[37px] bg-transparent w-[60vw] h-[40vh] mb-10 text-[#FFF] text-xl px-5 py-3'
				/>
				<div>
					<button
						onClick={() => setVisible(false)}
						className='bg-tertiary hover:bg-opacity-80 transition-all text-[#FFF] text-xl text-center w-[20%] h-10 mr-6'
					>
						Отмена
					</button>
					<button
						onClick={() => setVisible(false)}
						className='bg-primary hover:bg-primaryHover transition-all text-[#FFF] text-xl text-center w-[20%] h-10'
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
}

export default OrderRulesModal
