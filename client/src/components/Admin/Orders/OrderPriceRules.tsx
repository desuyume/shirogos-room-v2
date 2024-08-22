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
    <div className='flex h-[2.9375rem] w-full'>
      <p className='flex h-full w-[70%] items-center justify-center bg-tertiary text-center font-secondary text-xl font-bold text-[#FFF]'>
        Прайс заказа {type === 'game' ? 'игр' : 'просмотра'}
      </p>
      <button
        disabled={isLoading || isError}
        onClick={() => setIsModalVisible(true)}
        className='w-[30%] bg-primary text-center text-xl text-[#FFF] transition-all hover:bg-primaryHover disabled:bg-opacity-80'
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
