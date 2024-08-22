import { FC } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'
import FrameItem from './FrameItem'
import { useFrames } from '@/api/useFrames'

const FrameSection: FC = () => {
  const { data: frames, isLoading, isError } = useFrames()

  return (
    <div className='frames-admin h-[50.25rem] w-[56.81rem] bg-secondary'>
      <div className='flex h-11 w-full items-center bg-tertiary pr-[6%]'>
        <div className='flex h-full w-[18%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Продаем?</p>
        </div>
        <div className='flex h-full w-[21.7%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Цена, до</p>
        </div>
        <div className='flex h-full flex-1 items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Название</p>
        </div>
        <div className='flex h-full w-[12%] items-center justify-center'>
          <p className='text-xl text-[#FFF]'>Файл</p>
        </div>
      </div>
      <Scrollbar noDefaultStyles className='w-[64.5625rem]' style={{ height: '47.5rem' }}>
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
            {frames.map((frame) => (
              <FrameItem key={frame.id} frame={frame} />
            ))}
            <FrameItem isNew />
          </>
        )}
      </Scrollbar>
    </div>
  )
}

export default FrameSection
