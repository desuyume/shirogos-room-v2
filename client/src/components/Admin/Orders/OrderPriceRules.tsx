import { FC, useState } from 'react'
import OrderRulesModal from './OrderRulesModal'
import { useOrderRulesByType } from '@/api/useOrderRulesByType'

interface IOrderPriceRules {
	type: string
}

const OrderPriceRules: FC<IOrderPriceRules> = ({ type }) => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	const { data: rules, isLoading, isError } = useOrderRulesByType(type)

	return (
		<div className='w-full h-[2.9375rem] flex'>
			<p className='w-[70%] h-full bg-tertiary flex justify-center items-center text-center text-[#FFF] text-xl font-secondary font-bold'>
				Прайс заказа {type === 'game' ? 'игр' : 'просмотра'}
			</p>
			<button
				disabled={isLoading || isError}
				onClick={() => setIsModalVisible(true)}
				className='w-[30%] bg-primary hover:bg-primaryHover transition-all text-center text-xl text-[#FFF] disabled:bg-opacity-80'
			>
				Текст
			</button>
			{!isLoading && !isError && rules && (
				<OrderRulesModal
					type={type}
					rules={rules}
					visible={isModalVisible}
					setVisible={setIsModalVisible}
				/>
			)}
		</div>
	)
}

export default OrderPriceRules
