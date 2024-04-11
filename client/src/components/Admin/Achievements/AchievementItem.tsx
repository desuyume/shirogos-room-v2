import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import { AwardType, IAchievementFetch } from '@/types/achievements.interface'
import AwardButtons from './AwardButtons'
import RoleAward from './Awards/RoleAward'
import AchieveBg from './Awards/AchieveBg'
import { useCreateAchievement } from '@/api/useCreateAchievement'
import Award from './Awards/Award'
import ExperienceAward from './ExperienceAward'
import { isNumber } from '@/utils/isNumber'

interface IAchievementItem {
	achieve?: IAchievementFetch
	isNew?: boolean
}

export interface IRoles {
	adjective: number | null
	noun: number | null
}

const AchievementItem: FC<IAchievementItem> = ({ achieve, isNew = false }) => {
	const [isChooseUserVisible, setIsChooseUserVisible] = useState<boolean>(false)
	const [selectedRooms, setSelectedRooms] = useState<number[]>(
		achieve?.AchievementsOnRooms.map(room => room.roomId) ?? []
	)
	const [title, setTitle] = useState<string>(achieve?.title ?? '')
	const [desc, setDesc] = useState<string>(achieve?.description ?? '')
	const [awardTypes, setAwardTypes] = useState<AwardType[]>(['achieve-bg'])
	const [selectedAwardType, setSelectedAwardType] = useState<AwardType | null>(
		null
	)
	const [badgeAward, setBadgeAward] = useState<number | null>(null)
	const [frameAward, setFrameAward] = useState<number | null>(null)
	const [bgAward, setBgAward] = useState<number | null>(null)
	const [panopticonAward, setPanopticonAward] = useState<number | null>(null)
	const [roles, setRoles] = useState<IRoles | null>(null)
	const [exp, setExp] = useState<string>('0')
	const [achieveBgImg, setAchieveBgImg] = useState<File | null>(null)

	const { mutate: createAchieve, isSuccess: isSuccessCreate } =
		useCreateAchievement()

	const handleClickAwardType = (type: AwardType) => {
		if (awardTypes.includes(type)) {
			setAwardTypes(awardTypes.filter(item => item !== type))
		} else {
			setAwardTypes([...awardTypes, type])
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

		if (awardTypes.includes('experience') && !isNumber(exp)) {
			console.log('exp must be a number')
			return
		}

		const awards = {
			badge: awardTypes.includes('badge') ? badgeAward : null,
			frame: awardTypes.includes('frame') ? frameAward : null,
			background: awardTypes.includes('background') ? bgAward : null,
			panopticon: awardTypes.includes('panopticon') ? panopticonAward : null,
			roles: awardTypes.includes('unique-role') ? { ...roles } : null,
			exp: awardTypes.includes('experience') ? Number(exp) : null,
		}

		data.append('awards', JSON.stringify(awards))

		if (!achieveBgImg) {
			console.log('achieveBgImg is required')
			return
		}
		data.append('bgImg', achieveBgImg)

		data.append('roomsId', JSON.stringify(selectedRooms))

		console.log(data)

		createAchieve(data)
	}

	const clearFields = () => {
		setTitle('')
		setDesc('')
		setAwardTypes([])
		setSelectedAwardType(null)
		setBadgeAward(null)
		setFrameAward(null)
		setPanopticonAward(null)
		setBgAward(null)
		setRoles(null)
		setExp('0')
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
					className='text-[#FFF] text-xl text-center bg-transparent outline-none w-full h-full'
				/>
			</div>
			<div className='w-[37.2%] h-full flex justify-center items-center bg-tertiary'>
				<input
					value={desc}
					onChange={e => setDesc(e.target.value)}
					className='text-[#FFF] text-[1.125rem] font-secondary font-normal text-center w-full h-full bg-transparent outline-none'
				/>
			</div>
			<div className='w-[14.27%] h-full flex flex-wrap justify-center items-center bg-tertiary py-1'>
				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('badge')}
						checked={awardTypes.includes('badge')}
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
							'text-base font-secondary font-normal transition-all'
						}
					>
						Значок
					</label>
				</div>

				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('frame')}
						checked={awardTypes.includes('frame')}
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
							'text-base font-secondary font-normal transition-all'
						}
					>
						Рамка
					</label>
				</div>

				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('background')}
						checked={awardTypes.includes('background')}
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
							'text-base font-secondary font-normal transition-all'
						}
					>
						Фон
					</label>
				</div>

				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('panopticon')}
						checked={awardTypes.includes('panopticon')}
						className='mr-2'
						type='checkbox'
						id={isNew ? 'new-panopticon' : 'panopticon' + achieve?.id}
					/>
					<label
						htmlFor={isNew ? 'new-panopticon' : 'panopticon' + achieve?.id}
						className={
							(selectedAwardType === 'panopticon'
								? 'text-primary '
								: 'text-primaryText ') +
							'text-base font-secondary font-normal transition-all'
						}
					>
						Паноптикум
					</label>
				</div>

				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('unique-role')}
						checked={awardTypes.includes('unique-role')}
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
							'text-base font-secondary font-normal transition-all'
						}
					>
						Роль
					</label>
				</div>

				<div className='w-1/2 flex justify-center items-center'>
					<input
						onClick={() => handleClickAwardType('experience')}
						checked={awardTypes.includes('experience')}
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
							'text-base font-secondary font-normal transition-all'
						}
					>
						Опыт
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
					awardType={awardTypes}
					selectedAwardType={selectedAwardType}
					setSelectedAwardType={setSelectedAwardType}
				/>
				<Award
					award={frameAward}
					setAward={setFrameAward}
					awardType='frame'
					selectedAwardType={selectedAwardType}
				/>
				<Award
					award={badgeAward}
					setAward={setBadgeAward}
					awardType='badge'
					selectedAwardType={selectedAwardType}
				/>
				<Award
					award={bgAward}
					setAward={setBgAward}
					awardType='background'
					selectedAwardType={selectedAwardType}
				/>
				<Award
					award={panopticonAward}
					setAward={setPanopticonAward}
					awardType='panopticon'
					selectedAwardType={selectedAwardType}
				/>
				<RoleAward
					selectedAwardType={selectedAwardType}
					roles={roles}
					setRoles={setRoles}
				/>
				<ExperienceAward
					selectedAwardType={selectedAwardType}
					exp={exp}
					setExp={setExp}
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
