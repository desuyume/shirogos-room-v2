import { FC } from 'react'

const Loader: FC = () => {
	return (
		<div className='w-screen h-screen flex justify-center items-center'>
			<p className='text-primary text-xl'>Загрузка...</p>
		</div>
	)
}

export default Loader