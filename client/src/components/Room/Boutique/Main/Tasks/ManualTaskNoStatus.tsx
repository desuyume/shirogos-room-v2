import { RoomAppearanceContext } from '@/Context'
import ImgUpload from '@/components/ImgUpload'
import { TaskResponseStatus } from '@/types/manual-task.interface'
import { cn } from '@/utils/cn'
import { FC, useContext } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface ManualTaskNoStatusProps {
  taskResponseStatus: TaskResponseStatus | null
  description: string | null
  imgSrc: string | null
  responseImg: File | null
  setResponseImg: React.Dispatch<React.SetStateAction<File | null>>
  clickApplyHandler: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const ManualTaskNoStatus: FC<ManualTaskNoStatusProps> = ({
  taskResponseStatus,
  description,
  imgSrc,
  responseImg,
  setResponseImg,
  clickApplyHandler
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <div
      className={cn(
        'manual-task-no-status visible mt-[1.6875rem] flex h-16 w-full items-center justify-between px-3 opacity-100 transition-all',
        {
          'invisible opacity-0': taskResponseStatus === TaskResponseStatus.PENDING
        }
      )}
    >
      <Scrollbar
        className={`z-10 cursor-default ${roomAppearance.active_room_color}-scrollbar mr-5 flex-1`}
        onClick={(e) => e.stopPropagation()}
        noDefaultStyles
        style={{ height: '4rem' }}
      >
        <p className='break-words text-center text-[0.8125rem] leading-none text-primaryText'>
          {description}
        </p>
      </Scrollbar>
      <ImgUpload
        imgSrc={imgSrc}
        img={responseImg}
        setImg={setResponseImg}
        className='z-10 mr-5 aspect-[106/69] max-w-[7.5rem]'
        containerSize={{ width: '25%', height: 'auto' }}
      />
      <button
        onClick={clickApplyHandler}
        className='z-10 aspect-[114/26] w-[27%] rounded-r-[1.5625rem] bg-[#4A9648] pl-[3%] text-left text-[0.6vw] text-primaryText transition-all hover:bg-opacity-80 hover:text-white'
      >
        ПРИНЯТЬ
      </button>
    </div>
  )
}

export default ManualTaskNoStatus
