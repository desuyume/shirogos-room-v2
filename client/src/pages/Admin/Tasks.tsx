import ManualTask from '@/components/Admin/Tasks/ManualTask'
import ManualTasksList from '@/components/Admin/Tasks/ManualTasksList'
import TaskQueue from '@/components/Admin/Tasks/TaskQueue'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'

const Tasks: FC = () => {
	const [currentQueue, setCurrentQueue] = useState<number | null>(null)

	return (
		<AdminWrapper>
			<div className='px-[0.8rem] pt-[0.8rem] flex justify-between'>
				<div>
					<ManualTask />
					<ManualTasksList
						currentQueue={currentQueue}
						setCurrentQueue={setCurrentQueue}
					/>
				</div>
				<TaskQueue currentQueue={currentQueue} />
			</div>
		</AdminWrapper>
	)
}

export default Tasks
