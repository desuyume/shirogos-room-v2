import { RoomAppearanceContext } from '@/Context'
import { TaskResponseStatus } from '@/types/manual-task.interface'
import { cn } from '@/utils/cn'
import { FC, useContext } from 'react'
import { Scrollbar } from 'react-scrollbars-custom'

interface ManualTaskPendingStatusProps {
  taskResponseStatus: TaskResponseStatus | null
  description: string | null
}

const ManualTaskPendingStatus: FC<ManualTaskPendingStatusProps> = ({
  taskResponseStatus,
  description
}) => {
  const roomAppearance = useContext(RoomAppearanceContext)

  return (
    <div
      className={cn(
        'manual-task-pending invisible mt-5 flex w-[80%] flex-col items-center justify-between self-start opacity-0 transition-all',
        {
          'visible opacity-100': taskResponseStatus === TaskResponseStatus.PENDING
        }
      )}
    >
      <Scrollbar
        className={`z-10 mb-2 cursor-default ${roomAppearance.active_room_color}-scrollbar`}
        onClick={(e) => e.stopPropagation()}
        noDefaultStyles
        style={{ width: '60%', height: '3rem' }}
      >
        <p className='break-words text-center text-[0.8125rem] leading-none text-primaryText'>
          {description}
        </p>
      </Scrollbar>

      <div className='z-10 flex h-[1.625rem] w-[9.5rem] max-w-full items-center justify-center rounded-r-[1.5625rem] bg-[#4B4B4B] text-center'>
        <p className='text-xs leading-none text-primaryText'>НА ПРОВЕРКЕ</p>
      </div>
    </div>
  )
}

export default ManualTaskPendingStatus
