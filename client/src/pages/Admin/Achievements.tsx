import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'
import searchIcon from '@/assets/search-icon.png'
import AchievementsList from '@/components/Admin/Achievements/AchievementsList'

const Achievements: FC = () => {
	const [searchQuery, setSearchQuery] = useState<string>('')

	return (
		<AdminWrapper>
			<div className='w-full h-full mt-[0.69rem] ml-4'>
				<div className='w-[85.4%] h-[2.9375rem] relative flex items-center mb-[0.63rem]'>
					<img
						className='absolute h-[2.1875rem] left-3'
						src={searchIcon}
						alt='search-icon'
					/>
					<input
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='w-full h-full bg-tertiary outline-none pl-[4.55rem] pr-2 font-secondary font-normal text-[1.5625rem] text-[#FFF]'
					/>
				</div>
				<AchievementsList />
			</div>
		</AdminWrapper>
	)
}

export default Achievements
