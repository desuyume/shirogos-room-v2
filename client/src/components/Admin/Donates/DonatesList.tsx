import { FC } from 'react'
import DonateItem from './DonateItem'
import { useDonates } from '@/api/useDonates'
import { Scrollbar } from 'react-scrollbars-custom'

interface IDonatesList {
  searchQuery: string
}

const DonatesList: FC<IDonatesList> = ({ searchQuery }) => {
  const { data: donates, isLoading, isError } = useDonates()

  return (
    <div className='donates mb-[0.81rem] ml-4 mt-[0.63rem]'>
      <div className='flex'>
        <div className='mr-[0.8vw] flex h-[3.73rem] w-[11.40625vw] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Никнейм</p>
        </div>
        <div className='mr-[0.8vw] flex h-[3.73rem] w-[7.65625vw] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Сумма</p>
        </div>
        <div className='mr-[6.5vw] flex h-[3.73rem] w-[7.65625vw] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Добавить</p>
        </div>
        <div className='flex h-[3.73rem] w-[37.03125vw] items-center justify-center bg-tertiary'>
          <p className='text-center text-xl text-[#FFF]'>Комментарий</p>
        </div>
      </div>
      {isLoading ? (
        <div className='max-h-[51.5625rem] min-h-[51.5625rem]'>
          <p>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='max-h-[51.5625rem] min-h-[51.5625rem]'>
          <p>Произошла ошибка</p>
        </div>
      ) : donates.length ? (
        <Scrollbar noDefaultStyles style={{ width: '80vw', height: '51.5625rem' }}>
          <div>
            {donates
              .filter((donate) => donate.username.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((donate) => (
                <DonateItem
                  key={donate.id}
                  id={donate.id}
                  username={donate.username}
                  amount={donate.amount}
                  gifts={donate.gifts}
                />
              ))}
          </div>
        </Scrollbar>
      ) : (
        <div className='flex max-h-[51.5625rem] min-h-[51.5625rem] justify-center pt-6'>
          <p>Донатов нет :(</p>
        </div>
      )}
    </div>
  )
}

export default DonatesList
