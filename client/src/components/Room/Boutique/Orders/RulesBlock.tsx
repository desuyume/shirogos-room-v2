import { useOrderRulesByType } from '@/api/useOrderRulesByType'
import Linkify from 'linkify-react'
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
      <div className='flex w-[77%] h-full items-center justify-center px-6 overflow-hidden'>
        <Linkify options={{ target: '_blank' }}>
          <p className='text-xl text-[#FFF] whitespace-pre-wrap [&>a]:text-[#8684EB] [&>a:hover]:text-opacity-75 [&>a]:transition-colors'>
            {isLoading ? 'Загрузка...' : isError ? 'Ошибка' : rules.rules}
          </p>
        </Linkify>
      </div>
    </div>
  )
}

export default RulesBlock
