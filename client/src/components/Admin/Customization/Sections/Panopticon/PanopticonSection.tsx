import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import { usePanopticons } from '@/api/usePanopticons'
import PanopticonItem from './PanopticonItem'

const PanopticonSection: FC = () => {
  const { data: panopticons, isLoading, isError } = usePanopticons()

  return (
    <div className='panopticons-admin h-[50.25rem] w-[83.44rem] bg-secondary'>
      <div className='flex h-11 w-full items-center bg-tertiary pr-[6%]'>
        <div className='flex h-full w-[12.3%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Продаем?</p>
        </div>
        <div className='flex h-full w-[15%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Цена, до</p>
        </div>
        <div className='flex h-full w-[18%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Название</p>
        </div>
        <div className='flex h-full flex-1 items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Описание</p>
        </div>
        <div className='flex h-full w-[20%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Файл</p>
        </div>
      </div>
      <Scrollbar noDefaultStyles className='w-[91.1875rem]' style={{ height: '47.5rem' }}>
        {isLoading ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Загрузка...</p>
          </div>
        ) : isError ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p className='text-xl text-[#FFF]'>Ошибка</p>
          </div>
        ) : (
          <>
            {panopticons.map((panopticon) => (
              <PanopticonItem key={panopticon.id} panopticon={panopticon} />
            ))}
            <PanopticonItem isNew />
          </>
        )}
      </Scrollbar>
    </div>
  )
}

export default PanopticonSection
