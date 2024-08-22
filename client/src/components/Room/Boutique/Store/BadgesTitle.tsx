import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { FC, useContext, useEffect, useRef, useState } from 'react'

const BadgesTitle: FC = () => {
  const [isDescOpen, setIsDescOpen] = useState<boolean>(false)
  const [descHeight, setDescHeight] = useState<number>(0)
  const descRef = useRef<HTMLDivElement | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setDescHeight(descRef.current?.scrollHeight ?? 0)
    })
    observer.observe(document.documentElement)

    return () => {
      observer.unobserve(document.documentElement)
    }
  }, [])

  return (
    <>
      <button
        onClick={() => setIsDescOpen(!isDescOpen)}
        style={{ marginBottom: isDescOpen ? '8px' : `-${descHeight - 10}px` }}
        className='relative flex h-[3.6875rem] w-[63%] flex-col items-center justify-center rounded-[1.5625rem] bg-tertiary text-xl text-primaryText transition-all hover:bg-opacity-80 hover:text-white'
      >
        Значки
        <span
          className={
            (isDescOpen
              ? 'bottom-[0.50rem] scale-y-[-1] border-t-[#EBE984] '
              : `${colorVariants.border[roomAppearance.active_room_color]} -bottom-[0.20rem] `) +
            'absolute border-[0.625rem] border-t-[0.5rem] border-b-transparent border-l-transparent border-r-transparent transition-all'
          }
        />
      </button>
      <div
        ref={descRef}
        className={
          (isDescOpen
            ? 'visible mb-3 opacity-100 duration-500 ease-in-out '
            : 'invisible opacity-0 ') + 'px-[0.62rem]'
        }
      >
        <p className='mb-2 text-center text-xs leading-[97.795%] text-primaryText text-opacity-80'>
          Играет роль украшения для своей комнаты через Редактор.
        </p>
        <p className='text-center text-[0.625rem] leading-[97.795%] text-primaryText text-opacity-80'>
          Делятся на 3 категории: Уникальные, Копирайтные и Обычные.
        </p>
      </div>
    </>
  )
}

export default BadgesTitle
