import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import { AwardType, IAchievementFetch } from '@/types/achievements.interface'
import AwardButtons from './AwardButtons'
import BadgeAward from './BadgeAward'
import BackgroundAward from './BackgroundAward'
import RoleAward from './RoleAward'
import ExperienceAward from './ExperienceAward'
import FrameAward from '@/components/Admin/Achievements/FrameAward.tsx'
import AchieveBg from './AchieveBg'
import { useCreateAchievement } from '@/api/useCreateAchievement'

interface IAchievementItem {
	achieve?: IAchievementFetch
	isNew?: boolean
}

const AchievementItem: FC<IAchievementItem> = ({ achieve, isNew = false }) => {
	const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
	const [selectedRooms, setSelectedRooms] = useState<number[]>(
		achieve?.AchievementsOnRooms.map(room => room.roomId) ?? []
	)
	const [title, setTitle] = useState<string>(achieve?.title ?? '')
	const [desc, setDesc] = useState<string>(achieve?.description ?? '')
	const [awardType, setAwardType] = useState<AwardType[]>(['achieve-bg'])
	const [selectedAwardType, setSelectedAwardType] = useState<AwardType | null>(
		null
	)
	const [_, setBadgeImg] = useState<File | null>(null)
	const [__, setBgImg] = useState<File | null>(null)
	const [roleType, setRoleType] = useState<string>('noun')
	const [role, setRole] = useState<string>('')
	const [exp, setExp] = useState<string>('0')
	const [___, setFrameImg] = useState<File | null>(null)
	const [achieveBgImg, setAchieveBgImg] = useState<File | null>(null)

	const { mutate: createAchieve, isSuccess: isSuccessCreate } =
		useCreateAchievement()

	const handleClickAwardType = (type: AwardType) => {
		if (awardType.includes(type)) {
			setAwardType(awardType.filter(item => item !== type))
		} else {
			setAwardType([...awardType, type])
		}
		setSelectedAwardType(null)
	}

	const handleCreate = () => {
		const data = new FormData()

		if (!title) {
			console.log('title is required')
			return
		}
		data.append('title', title)

		if (desc) {
			data.append('description', desc)
		}

		if (!achieveBgImg) {
			console.log('achieveBgImg is required')
			return
		}
		data.append('bgImg', achieveBgImg)

		data.append('roomsId', JSON.stringify(selectedRooms))

		createAchieve(data)
	}

	const clearFields = () => {
		setTitle('')
		setDesc('')
		setAwardType([])
		setSelectedAwardType(null)
		setBadgeImg(null)
		setBgImg(null)
		setRoleType('noun')
		setRole('')
		setExp('0')
		setFrameImg(null)
		setAchieveBgImg(null)
		setSelectedRooms([])
		setIsChooseUserVisible(false)
	}

	useEffect(() => {
		if (isSuccessCreate) {
			clearFields()
		}
	}, [isSuccessCreate])

	return (
		<div className='w-full h-[7.75rem] flex justify-between items-center relative'>
			<div className='w-[18.72%] h-full flex justify-center items-center bg-tertiary'>
				<input
					value={title}
					onChange={e => setTitle(e.target.value)}
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
						id={isNew ? 'new-badge' : 'badge' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-badge' : 'badge' + achieve?.id}
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
						id={isNew ? 'new-background' : 'background' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-background' : 'background' + achieve?.id}
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
						id={isNew ? 'new-unique-role' : 'unique-role' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-unique-role' : 'unique-role' + achieve?.id}
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
						id={isNew ? 'new-experience' : 'experience' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-experience' : 'experience' + achieve?.id}
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
						id={isNew ? 'new-frame' : 'frame' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-frame' : 'frame' + achieve?.id}
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
				<div className='w-1/2 flex justify-center items-center'>
					<input
						checked
						className='mr-2'
						type='checkbox'
						id={isNew ? 'new-achieve-bg' : 'achieve-bg' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-achieve-bg' : 'achieve-bg' + achieve?.id}
						className={
							(selectedAwardType === 'achieve-bg'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-xl font-secondary font-normal transition-all'
						}
					>
						XXX
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
				<FrameAward
					selectedAwardType={selectedAwardType}
					setFrameImg={setFrameImg}
				/>
				<AchieveBg
					selectedAwardType={selectedAwardType}
					imgSrc={achieve?.background ?? null}
					img={achieveBgImg}
					setImg={setAchieveBgImg}
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
					className='absolute translate-y-[100%] bottom-8'
					selectType='rooms'
					selectedRooms={selectedRooms}
					setSelectedRooms={setSelectedRooms}
					multiple
				/>
			</div>
			{isNew ? (
				<button
					onClick={handleCreate}
					className='w-[9.5%] h-[3.125rem] text-[#FFF] text-xl bg-primary hover:bg-primaryHover transition-all absolute right-[-0.81rem] translate-x-[100%]'
				>
					Добавить
				</button>
			) : (
				<div className='w-[9.5%] absolute right-[-0.81rem] translate-x-[100%] flex flex-col'>
					<button className='w-full h-[3.125rem] text-[#FFF] text-xl bg-primary hover:bg-primaryHover transition-all mb-2'>
						Обновить
					</button>
					<button className='w-full h-[3.125rem] text-[#FFF] text-xl bg-tertiary hover:bg-opacity-90 transition-all'>
						Удалить
					</button>
				</div>
			)}
		</div>
	)
}

export default AchievementItem
