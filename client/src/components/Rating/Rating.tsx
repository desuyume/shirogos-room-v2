import { FC } from 'react'
import RatingList from './RatingList'

interface IRating {
	className?: string
}

const Rating: FC<IRating> = ({ className }) => {
	return (
		<div
			className={
				'w-[26.625rem] h-[17.1875rem] bg-secondary bg-opacity-40 rounded-[2.3125rem] flex flex-col items-center pt-[0.38rem] ' +
				className
			}
			style={{
				background:
					'linear-gradient(137deg, rgba(23, 23, 23, 0.20) 0%, rgba(36, 36, 36, 0.20) 46.88%), rgba(24, 24, 24, 0.40)',
			}}
		>
			<div className='bg-secondary w-[14.6875rem] h-[2.125rem] flex justify-center items-center rounded-[2.3125rem] mb-[0.9375rem]'>
				<p className='text-center text-primary text-[1.875rem] leading-none'>
					ТОП
				</p>
			</div>
			<RatingList />
		</div>
	)
}

export default Rating
