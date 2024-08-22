import { useUpdateOrderRules } from '@/api/useUpdateOrderRules'
import { IOrderRules } from '@/types/order.interface'
import { FC, useState } from 'react'

interface IOrderRulesModal {
  type: string
  rules: IOrderRules
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const OrderRulesModal: FC<IOrderRulesModal> = ({ type, rules, visible, setVisible }) => {
  const [rulesText, setRulesText] = useState<string>(rules.rules ?? '')

  const { mutate: updateRules } = useUpdateOrderRules(type)

  const save = () => {
    updateRules({ rules: rulesText })
    setVisible(false)
  }

  const cancel = () => {
    setVisible(false)
    setRulesText(rules.rules ?? '')
  }

  return (
    <div
      className={
        'fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-secondary bg-opacity-50 transition-all ' +
        (visible ? 'visible opacity-100' : 'invisible opacity-0')
      }
      onClick={() => setVisible(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='rounded-[37px] bg-secondary bg-opacity-90 px-[3.6rem] pb-12 pt-16 text-center'
      >
        <p className='mb-10 text-4xl text-[#FFF]'>
          Правила заказа {type === 'game' ? 'игр' : 'просмотра'}
        </p>
        <textarea
          value={rulesText}
          onChange={(e) => setRulesText(e.target.value)}
          className='mb-10 h-[40vh] w-[60vw] rounded-[37px] border-2 border-primary bg-transparent px-5 py-3 text-xl text-[#FFF] outline-none'
        />
        <div>
          <button
            onClick={cancel}
            className='mr-6 h-10 w-[20%] bg-tertiary text-center text-xl text-[#FFF] transition-all hover:bg-opacity-80'
          >
            Отмена
          </button>
          <button
            onClick={save}
            className='h-10 w-[20%] bg-primary text-center text-xl text-[#FFF] transition-all hover:bg-primaryHover'
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderRulesModal
