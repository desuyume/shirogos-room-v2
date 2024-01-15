import { FC } from 'react'

const TopUsers: FC = () => {
	return (
		<div className='w-[31.875rem] h-[17.1875rem] bg-secondary bg-opacity-40 rounded-[2.3125rem] flex flex-col items-center pt-[0.38rem]'>
			<div className='bg-secondary w-[14.6875rem] h-[2.125rem] flex justify-center items-center rounded-[2.3125rem]'>
				<p className='text-center text-primary text-[1.875rem] leading-none'>
					ТОП
				</p>
			</div>
		</div>
	)
}

export default TopUsers
