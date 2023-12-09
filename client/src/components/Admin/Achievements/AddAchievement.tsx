import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import AwardButtons from './AwardButtons'
import BadgeAward from './BadgeAward'
import BackgroundAward from './BackgroundAward'
import RoleAward from './RoleAward'
import ExperienceAward from './ExperienceAward'
import FrameAward from "@/components/Admin/Achievements/FrameAward.tsx";

const AddAchievement: FC = () => {
	const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
	const [selectedUsers, setSelectedUsers] = useState<string[]>([])
	const [name, setName] = useState<string>("")
	const [desc, setDesc] = useState<string>("")
	const [awardType, setAwardType] = useState<string[]>([])
	const [selectedAwardType, setSelectedAwardType] = useState<string | null>('')
	const [badgeImg, setBadgeImg] = useState<File | null>(null)
	const [bgImg, setBgImg] = useState<File | null>(null)
	const [roleType, setRoleType] = useState<string>('noun')
	const [role, setRole] = useState<string>('')
	const [exp, setExp] = useState<string>('0')
	const [frameImg, setFrameImg] = useState<File | null>(null)

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
		console.log(frameImg)
	}, [frameImg])

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
						id={'badge'}
					/>
					<label
						htmlFor={'badge'}
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
						id={'background'}
					/>
					<label
						htmlFor={'background'}
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
						id={'unique-role'}
					/>
					<label
						htmlFor={'unique-role'}
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
						id={'experience'}
					/>
					<label
						htmlFor={'experience'}
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
				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('frame')}
						checked={awardType.includes('frame')}
						className='mr-2'
						type='checkbox'
						id={'frame'}
					/>
					<label
						htmlFor={'frame'}
						className={
							(selectedAwardType === 'frame'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-xl font-secondary font-normal transition-all'
						}
					>
						Рамка
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
				<FrameAward selectedAwardType={selectedAwardType} setFrameImg={setFrameImg} />
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
					className='absolute translate-y-[100%] bottom-8'
					selectedUsers={selectedUsers}
					setSelectedUsers={setSelectedUsers}
					multiple
				/>
			</div>
			<button className='w-[9.5%] h-[3.125rem] text-[#FFF] text-xl bg-primary hover:bg-primaryHover transition-all absolute right-[-0.81rem] translate-x-[100%]'>
				Добавить
			</button>
		</div>
	)
}

export default AddAchievement
