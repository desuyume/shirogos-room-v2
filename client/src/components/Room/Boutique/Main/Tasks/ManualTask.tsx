import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { IMyTaskWithResponse, TaskResponseStatus } from '@/types/manual-task.interface'
import { ITask } from '@/types/task.inerface'
import { cn } from '@/utils/cn'
import { FC, useContext, useEffect, useState } from 'react'
import { useSendTaskResponse } from '@/api/useSendTaskResponse'
import ManualTaskPendingStatus from './ManualTaskPendingStatus'
import ManualTaskNoStatus from './ManualTaskNoStatus'

interface IManualTask {
  task: IMyTaskWithResponse
  activeTasks: ITask[] | null
  setActiveTasks: (task: ITask[] | null) => void
}

const ManualTask: FC<IManualTask> = ({ task, activeTasks, setActiveTasks }) => {
  const roomAppearance = useContext(RoomAppearanceContext)
  const [isActive, setIsActive] = useState<boolean>(false)
  const [responseImg, setResponseImg] = useState<File | null>(null)
  const [taskResponseStatus, setTaskResponseStatus] = useState<TaskResponseStatus | null>(null)

  const { mutate: sendTaskResponse } = useSendTaskResponse(task.task.id)

  const clickTaskHandler = () => {
    if (taskResponseStatus === TaskResponseStatus.ACCEPTED) return

    const currentTask: ITask = {
      id: task.task.id,
      title: task.task.title,
      description: task.task.description ?? '',
      do: task.task.do,
      exp: task.task.exp,
      type: 'manual'
    }

    if (isActive) {
      !!activeTasks && activeTasks?.length > 1
        ? setActiveTasks(activeTasks?.filter((t) => t.id !== task.task.id))
        : setActiveTasks(null)
    } else {
      !!activeTasks ? setActiveTasks([...activeTasks, currentTask]) : setActiveTasks([currentTask])
    }
  }

  const clickApplyHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation()

    if (task.response && task.response.status === TaskResponseStatus.ACCEPTED) {
      console.log('task already accepted')
      return
    }

    const data = new FormData()
    if (responseImg) {
      data.append('responseImg', responseImg)
    }
    sendTaskResponse(data)
  }

  useEffect(() => {
    setIsActive(activeTasks?.some((t) => t.id === task.task.id) ?? false)
  }, [activeTasks])

  useEffect(() => {
    if (task.response) {
      setTaskResponseStatus(task.response.status)
    }
  }, [task])

  useEffect(() => {
    if (taskResponseStatus === TaskResponseStatus.ACCEPTED) {
      setActiveTasks(activeTasks?.filter((at) => at.id !== task.task.id) ?? null)
    }

    if (taskResponseStatus === TaskResponseStatus.REJECTED) {
      setResponseImg(null)
    }
  }, [taskResponseStatus])

  return (
    <div
      onClick={() => !isActive && clickTaskHandler()}
      className={cn(
        `group relative mx-auto mb-1 flex w-[94%] cursor-pointer items-center justify-between rounded-[1.5625rem] bg-tertiary bg-opacity-50 transition-all first-of-type:mt-1`,
        {
          'h-[2.9375rem]': !isActive,
          'h-[9.125rem] cursor-default': isActive,
          'cursor-default opacity-50': taskResponseStatus === TaskResponseStatus.ACCEPTED
        }
      )}
    >
      <p
        className={cn(
          'line-clamp-1 max-w-[80%] flex-1 break-words px-3 text-center text-[0.9375rem] text-primaryText transition-all',
          {
            'visible opacity-100': !isActive,
            'invisible opacity-0': isActive
          }
        )}
      >
        {task.task.title}
      </p>

      <div
        className={cn('absolute flex h-full w-full flex-col items-center pt-4 transition-all', {
          'visible opacity-100': isActive,
          'invisible opacity-0': !isActive
        })}
      >
        <p
          className={`text-[0.9375rem] ${
            colorVariants.text[roomAppearance.active_room_color]
          } z-10 line-clamp-1 w-[80%] self-start break-words px-2 text-center`}
        >
          {task.task.title}
        </p>

        {taskResponseStatus === TaskResponseStatus.REJECTED && (
          <p className='absolute top-10 z-10 w-[80%] self-start text-center text-xs leading-none text-[#827B7D]'>
            Отказано. Попробуй еще!
          </p>
        )}

        {isActive && task.response?.status === TaskResponseStatus.PENDING ? (
          <ManualTaskPendingStatus
            taskResponseStatus={taskResponseStatus}
            description={task.task.description}
          />
        ) : (
          isActive && (
            <ManualTaskNoStatus
              taskResponseStatus={taskResponseStatus}
              description={task.task.description}
              imgSrc={task.response?.img ?? null}
              responseImg={responseImg}
              setResponseImg={setResponseImg}
              clickApplyHandler={clickApplyHandler}
            />
          )
        )}
      </div>

      <div
        onClick={() => isActive && clickTaskHandler()}
        className={cn(
          `h-[2.9375rem] w-[20%] ${
            colorVariants.bg[roomAppearance.active_room_color]
          } peer z-10 flex items-center justify-center self-start rounded-[1.5625rem] transition-all`,
          {
            'h-full': taskResponseStatus === TaskResponseStatus.PENDING,
            'cursor-pointer': isActive
          }
        )}
      >
        {taskResponseStatus === TaskResponseStatus.ACCEPTED ? (
          <p className='text-center text-xs text-primaryText'>Гуд!</p>
        ) : (
          <p className='text-center text-xs text-primaryText'>+{task.task.do ?? 0} ДО</p>
        )}
      </div>

      <div
        className={cn(
          `absolute h-[calc(100%-2px)] w-[calc(100%-2px)] outline ${
            colorVariants.outline[roomAppearance.active_room_color]
          } invisible rounded-[1.5625rem] opacity-0 outline-[5px] transition-all`,
          {
            'group-hover:visible group-hover:opacity-100':
              taskResponseStatus !== TaskResponseStatus.ACCEPTED && !isActive,
            'peer-hover:visible peer-hover:opacity-100':
              taskResponseStatus !== TaskResponseStatus.ACCEPTED && isActive
          }
        )}
      />
    </div>
  )
}

export default ManualTask
