import { useOrderRulesByType } from '@/api/useOrderRulesByType'
import { FC } from 'react'

interface IRulesBlock {
  type: string
  isRulesOpened: boolean
}

const RulesBlock: FC<IRulesBlock> = ({ type, isRulesOpened }) => {
  const { isLoading, isError, data: rules } = useOrderRulesByType(type)
  return (
    <div
      className={
        (isRulesOpened ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        'absolute inset-0 z-10 flex h-full w-full items-center justify-end rounded-[1.5625rem] bg-tertiary transition-all'
      }
    >
      <div className='flex h-full w-[77%] items-center justify-center'>
        <p className='97.795% text-center text-xl text-[#FFF]'>
          {isLoading ? 'Загрузка...' : isError ? 'Ошибка' : rules.rules}
        </p>
      </div>
    </div>
  )
}

export default RulesBlock
