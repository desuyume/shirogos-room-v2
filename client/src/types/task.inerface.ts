export interface ITask {
	id: number
	title: string
	description: string | null
	do: number | null
	exp: number | null
	type: TaskType
}

export type TaskType = 'manual' | 'auto'
