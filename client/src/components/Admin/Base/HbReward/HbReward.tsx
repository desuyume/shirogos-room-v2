import { isNumber } from '@/utils/isNumber'
import { FC, useState } from 'react'

const HbReward: FC = () => {
	const [reward, setReward] = useState<string>('')

	const onBlurHandler = () => {
		if (isNumber(reward)) {
			console.log(`${reward} ДО`)
		} else {
			console.log('Награда должна быть числом');
		}
	}

	return (
		<div className='w-[33.6%] h-full flex flex-col'>
			<div className='w-full h-[3.8125rem] bg-tertiary flex justify-center items-center'>
				<p className='text-[#FFF] text-[1.5625rem]'>Награда за ДР</p>
			</div>
			<div className='w-full flex-1 bg-secondary flex justify-center items-center '>
				<input
					onBlur={onBlurHandler}
					value={reward}
					onChange={e => setReward(e.target.value)}
					className='bg-transparent outline-none text-xl text-center w-full text-[#FFF] placeholder:text-[#B7B7B7]'
					placeholder='(в до)'
				/>
			</div>
		</div>
	)
}

export default HbReward
