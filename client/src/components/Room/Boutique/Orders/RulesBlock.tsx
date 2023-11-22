import { FC } from 'react'

interface IRulesBlock { 
	rules: string
	isRulesOpened: boolean
}

const RulesBlock: FC<IRulesBlock> = ({ rules, isRulesOpened }) => {
	return (
		<div className={(isRulesOpened ? 'opacity-100 visible ' : 'opacity-0 invisible ') + 'w-full h-full rounded-[1.5625rem] bg-tertiary absolute inset-0 transition-all flex justify-end items-center z-10'}>
			<div className='w-[77%] h-full flex justify-center items-center'>
				<p className='text-center text-[#FFF] text-xl 97.795%'>{rules}</p>
			</div>
		</div>
	)
}

export default RulesBlock