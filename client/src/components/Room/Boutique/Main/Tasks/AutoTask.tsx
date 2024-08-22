import { RoomAppearanceContext } from '@/Context'
import { colorVariants } from '@/consts/roomColors'
import { ITask } from '@/types/task.inerface'
import { FC, useContext } from 'react'

interface IAutoTask {
  task: ITask
  activeTasks: ITask[] | null
  setActiveTasks: (task: ITask[] | null) => void
}

const AutoTask: FC<IAutoTask> = ({ task, activeTasks, setActiveTasks }) => {
  const roomAppearance = useContext(RoomAppearanceContext)
  const isActive: boolean = activeTasks?.some((t) => t.id === task.id) ?? false

  const clickHandler = () => {
    if (isActive) {
      !!activeTasks && activeTasks?.length > 1
        ? setActiveTasks(activeTasks?.filter((t) => t.id !== task.id))
        : setActiveTasks(null)
    } else {
      !!activeTasks ? setActiveTasks([...activeTasks, task]) : setActiveTasks([task])
    }
  }

  return (
    <button
      onClick={clickHandler}
      className={`group relative mx-auto mb-1 flex h-[2.9375rem] w-[94%] items-center justify-between rounded-[1.5625rem] bg-tertiary bg-opacity-50 last-of-type:mb-0`}
    >
      <p className='line-clamp-2 flex-1 break-words px-3 text-center text-[0.9375rem] leading-[97.795%] text-primaryText'>
        {task.title}
      </p>
      <div
        className={`h-full w-[20%] ${
          colorVariants.bg[roomAppearance.active_room_color]
        } flex items-center justify-center rounded-[1.5625rem]`}
      >
        <p className='text-center text-xs text-primaryText'>+{task.do ?? 0} ДО</p>
      </div>

      <div
        className={`absolute h-full w-full outline ${
          colorVariants.outline[roomAppearance.active_room_color]
        } invisible rounded-[1.5625rem] opacity-0 outline-[5px] group-hover:visible group-hover:opacity-100`}
      />
    </button>
  )
}

export default AutoTask
