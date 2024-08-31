import { useRoomsByLevel } from '@/api/useRoomsByLevel'
import { FC, useEffect, useState } from 'react'
import RoomGuideScreenRoomItem from './RoomGuideScreenRoomItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { IRoomGuideByLevel } from '@/types/room-guide.interface'
import { useInView } from 'react-intersection-observer'

const RoomGuideScreenRoomList: FC = () => {
  const [rooms, setRooms] = useState<IRoomGuideByLevel[]>([])
  const [limit, _] = useState<number>(10)
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.5
  })

  const { data: roomsData, isLoading, isError, isSuccess, isFetched } = useRoomsByLevel(limit, page)

  useEffect(() => {
    if (isSuccess) {
      setRooms([...rooms, ...roomsData.rooms])
      setTotalPages(roomsData.totalPages)
    }
  }, [isSuccess])

  useEffect(() => {
    if (isLoading) return

    if (inView && totalPages && page < totalPages) {
      setPage(page + 1)
    }
  }, [inView, isLoading])

  return (
    <Scrollbar className='relative flex h-full w-full flex-col' noDefaultStyles>
      <div className='relative my-[1.9375rem] flex h-full w-full flex-col items-center pr-[5.5rem]'>
        {rooms.map((room, index) => (
          <div key={room.id} className='w-full h-[14.75rem] mb-[1.9375rem] last-of-type:mb-0'>
            <RoomGuideScreenRoomItem index={index + 1} room={room} />

            {index % 8 === 0 && index !== 0 && <span
              ref={ref}
              className={'absolute bottom-0 h-[14.75rem] w-full ' + (isFetched ? 'block' : 'hidden')}
            />}
          </div>
        ))}

      </div>
      {isLoading ? (
        <div
          className={
            'flex w-full items-center justify-center ' +
            (!rooms.length ? 'absolute top-[50%]' : 'my-8')
          }
        >
          <p className='text-xl text-primaryText'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div
          className={
            'flex w-full items-center justify-center ' +
            (!rooms.length ? 'absolute top-[50%]' : 'my-8')
          }
        >
          <p className='text-xl text-primaryText'>Произошла ошибка</p>
        </div>
      ) : (
        <></>
      )}
    </Scrollbar>
  )
}

export default RoomGuideScreenRoomList
