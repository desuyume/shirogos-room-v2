import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import { IAchievemnt } from '@/types/achievements.interface'
import AwardButtons from './AwardButtons'
import BadgeAward from './BadgeAward'
import BackgroundAward from './BackgroundAward'
import RoleAward from './RoleAward'
import ExperienceAward from './ExperienceAward'

interface IAchievementItem {
	achieve: IAchievemnt
}

const AchievementItem: FC<IAchievementItem> = ({ achieve }) => {
	const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
	const [selectedUsers, setSelectedUsers] = useState<string[]>(achieve.users)
	const [name, setName] = useState<string>(achieve.name)
	const [desc, setDesc] = useState<string>(achieve.description)
	const [awardType, setAwardType] = useState<string[]>(achieve.awardType)
	const [selectedAwardType, setSelectedAwardType] = useState<string | null>('')
	const [badgeImg, setBadgeImg] = useState<File | null>(null)
	const [bgImg, setBgImg] = useState<File | null>(null)
	const [roleType, setRoleType] = useState<string>('noun')
	const [role, setRole] = useState<string>('')
	const [exp, setExp] = useState<string>('0')

	const handleClickAwardType = (type: string) => {
		if (awardType.includes(type)) {
			setAwardType(awardType.filter(item => item !== type))
		} else {
			setAwardType([...awardType, type])
		}
		setSelectedAwardType(null)
	}

	useEffect(() => {
		console.log(badgeImg)
	}, [badgeImg])

	useEffect(() => {
		console.log(bgImg)
	}, [bgImg])

	useEffect(() => {
		console.log(`${roleType} - ${role}`)
	}, [roleType, role])

	return (
		<div className='w-full h-[7.75rem] flex justify-between items-center relative'>
			<div className='w-[18.72%] h-full flex justify-center items-center bg-tertiary'>
				<input
					value={name}
					onChange={e => setName(e.target.value)}
					className='text-[#FFF] text-xl text-center bg-transparent outline-none w-full'
				/>
			</div>
			<div className='w-[37.2%] h-full flex justify-center items-center bg-tertiary'>
				<input
					value={desc}
					onChange={e => setDesc(e.target.value)}
					className='text-[#FFF] text-[1.125rem] font-secondary font-normal text-center w-full bg-transparent outline-none'
				/>
			</div>
			<div className='w-[14.27%] h-full flex flex-wrap justify-center items-center bg-tertiary py-4'>
				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('badge')}
						checked={awardType.includes('badge')}
						className='mr-2'
						type='checkbox'
						id={'badge' + achieve.id}
					/>
					<label
						htmlFor={'badge' + achieve.id}
						className={
							(selectedAwardType === 'badge'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-xl font-secondary font-normal transition-all'
						}
					>
						Значок
					</label>
				</div>
				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('background')}
						checked={awardType.includes('background')}
						className='mr-2'
						type='checkbox'
						id={'background' + achieve.id}
					/>
					<label
						htmlFor={'background' + achieve.id}
						className={
							(selectedAwardType === 'background'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-xl font-secondary font-normal transition-all'
						}
					>
						Фон
					</label>
				</div>

				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('unique-role')}
						checked={awardType.includes('unique-role')}
						className='mr-2'
						type='checkbox'
						id={'unique-role' + achieve.id}
					/>
					<label
						htmlFor={'unique-role' + achieve.id}
						className={
							(selectedAwardType === 'unique-role'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-xl font-secondary font-normal transition-all'
						}
					>
						Роль
					</label>
				</div>
				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('experience')}
						checked={awardType.includes('experience')}
						className='mr-2'
						type='checkbox'
						id={'experience' + achieve.id}
					/>
					<label
						htmlFor={'experience' + achieve.id}
						className={
							(selectedAwardType === 'experience'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-xl font-secondary font-normal transition-all'
						}
					>
						Опыт
					</label>
				</div>
			</div>
			<div className='w-[14.27%] h-full flex flex-col bg-tertiary'>
				<AwardButtons
					awardType={awardType}
					selectedAwardType={selectedAwardType}
					setSelectedAwardType={setSelectedAwardType}
				/>
				<BadgeAward
					selectedAwardType={selectedAwardType}
					setBadgeImg={setBadgeImg}
				/>
				<BackgroundAward
					selectedAwardType={selectedAwardType}
					setBgImg={setBgImg}
				/>
				<RoleAward
					selectedAwardType={selectedAwardType}
					roleType={roleType}
					setRoleType={setRoleType}
					role={role}
					setRole={setRole}
				/>
				<ExperienceAward
					selectedAwardType={selectedAwardType}
					exp={exp}
					setExp={setExp}
				/>
			</div>
			<div className='w-[13.84%] h-full flex justify-center items-center bg-tertiary relative'>
				<button
					onClick={() => setIsChooseUserVisible(!isChooseUserVisible)}
					className='w-full h-full hover:bg-secondary transition-all text-xl font-secondary font-normal text-[#D9D9D9]'
				>
					тык
				</button>
				<FindUser
					isVisible={isChooseUserVisible}
					className='absolute translate-y-[100%] -bottom-[0.42rem]'
					selectedUsers={selectedUsers}
					setSelectedUsers={setSelectedUsers}
					multiple
				/>
			</div>
			<div className='w-[9.5%] absolute right-[-0.81rem] translate-x-[100%] flex flex-col'>
				<button className='w-full h-[3.125rem] text-[#FFF] text-xl bg-primary hover:bg-primaryHover transition-all mb-2'>
					Обновить
				</button>
				<button className='w-full h-[3.125rem] text-[#FFF] text-xl bg-tertiary hover:bg-opacity-90 transition-all'>
					Удалить
				</button>
			</div>
		</div>
	)
}

export default AchievementItem