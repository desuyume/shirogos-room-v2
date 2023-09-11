import { FC, useState } from 'react'
import OrderRulesModal from './OrderRulesModal'

interface IOrderPriceRules {
	type: string
}

const OrderPriceRules: FC<IOrderPriceRules> = ({ type }) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	return (
		<div className='w-full h-[2.9375rem] flex'>
			<p className='w-[70%] h-full bg-tertiary flex justify-center items-center text-center text-[#FFF] text-xl font-secondary font-bold'>
				Прайс заказа {type === 'game' ? 'игр' : 'просмотра'}
			</p>
			<button
				onClick={() => setIsModalVisible(true)}
				className='w-[30%] bg-primary hover:bg-primaryHover transition-all text-center text-xl text-[#FFF]'
			>
				Текст
			</button>
			<OrderRulesModal
				type={type}
				visible={isModalVisible}
				setVisible={setIsModalVisible}
			/>
		</div>
	)
}

export default OrderPriceRules
