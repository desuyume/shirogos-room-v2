import { useDeleteManualTask } from '@/api/useDeleteManualTask'
import { IManualTask, ITaskQueue } from '@/types/manual-task.interface'
import { cn } from '@/utils/cn'
import { FC, useEffect, useState } from 'react'

interface IManualTaskItem {
  index: number
  task: IManualTask
  currentTaskQueue: ITaskQueue | null
  setCurrentTaskQueue: React.Dispatch<React.SetStateAction<ITaskQueue | null>>
}

const ManualTaskItem: FC<IManualTaskItem> = ({
  index,
  task,
  currentTaskQueue,
  setCurrentTaskQueue
}) => {
  const [isActive, setIsActive] = useState<boolean>(false)

  const { mutate: deleteManualTask, isSuccess: isSuccessDelete } = useDeleteManualTask(task.id)

  const clickQueue = () => {
    if (isActive) {
      setCurrentTaskQueue(null)
      setIsActive(false)
    } else {
      setCurrentTaskQueue({ index, taskId: task.id })
      setIsActive(true)
    }
  }

  useEffect(() => {
    if (currentTaskQueue?.index !== index) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
  }, [currentTaskQueue])

  useEffect(() => {
    if (currentTaskQueue?.taskId === task.id) {
      if (isSuccessDelete) {
        setCurrentTaskQueue(null)
      }
    }
  }, [isSuccessDelete])

  return (
    <div className='flex h-[3.25rem] items-center'>
      <p className='flex h-full w-[5%] items-center justify-center bg-secondary text-center text-xl text-[#B7B7B7]'>
        #{index}
      </p>
      <p className='line-clamp-1 flex h-full w-[50%] items-center justify-center break-words bg-secondary px-4 text-center text-xl text-[#B7B7B7]'>
        {task.title}
      </p>
      <div className='flex h-full w-[20%] items-center bg-secondary'>
        <button
          onClick={clickQueue}
          className={cn(
            'h-[2.5625rem] w-full bg-primary text-[#FFF] transition-all hover:bg-primaryHover',
            {
              'bg-primaryHover': isActive
            }
          )}
        >
          Очередь
        </button>
      </div>
      <button
        onClick={() => deleteManualTask()}
        className='ml-[1%] h-[2.5625rem] w-[24%] bg-tertiary text-[#FFF] transition-all hover:bg-[#FFF] hover:text-tertiary'
      >
        Удалить
      </button>
    </div>
  )
}

export default ManualTaskItem
