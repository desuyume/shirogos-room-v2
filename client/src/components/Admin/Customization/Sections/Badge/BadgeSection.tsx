import { FC } from 'react'
import BadgeItem from './BadgeItem'
import { useBadge } from '@/api/useBadge'
import { Scrollbar } from 'react-scrollbars-custom'

const BadgeSection: FC = () => {
  const { data: badges, isLoading, isError } = useBadge()

  return (
    <div className='badges-admin h-[50.25rem] w-[68.06rem] bg-secondary'>
      <div className='flex h-11 w-full items-center bg-tertiary pr-[7%]'>
        <div className='flex h-full w-[17.5%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Тип значка</p>
        </div>
        <div className='flex h-full w-[13%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Продаем?</p>
        </div>
        <div className='flex h-full w-[25%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Цена, до</p>
        </div>
        <div className='flex h-full flex-1 items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Название</p>
        </div>
        <div className='flex h-full w-[12%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Файл</p>
        </div>
      </div>
      <Scrollbar noDefaultStyles className='w-[75.8125rem]' style={{ height: '47.5rem' }}>
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
            {badges.map((badge) => (
              <BadgeItem key={badge.id} badge={badge} />
            ))}
            <BadgeItem isNew />
          </>
        )}
      </Scrollbar>
    </div>
  )
}

export default BadgeSection
