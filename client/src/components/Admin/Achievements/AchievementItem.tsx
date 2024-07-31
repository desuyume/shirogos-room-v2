import { FC, useEffect, useState } from 'react'
import FindUser from '../FindUser'
import {
	AwardType,
	IAchievementFetchWithAward,
} from '@/types/achievements.interface'
import AwardButtons from './AwardButtons'
import RoleAward from './Awards/RoleAward'
import AchieveBg from './Awards/AchieveBg'
import { useCreateAchievement } from '@/api/useCreateAchievement'
import Award from './Awards/Award'
import ExperienceAward from './Awards/ExperienceAward'
import { isNumber } from '@/utils/isNumber'
import { useUpdateAchievement } from '@/api/useUpdateAchievement'
import { useDeleteAchievement } from '@/api/useDeleteAchievement'
import { imgSrcToFile } from '@/utils/imageConvert'

interface IAchievementItem {
	achieve?: IAchievementFetchWithAward
}

export interface IRoles {
	adjective: number | null
	noun: number | null
}

const AchievementItem: FC<IAchievementItem> = ({ achieve }) => {
	const isNew = !achieve
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
	const [badgeAward, setBadgeAward] = useState<number | null>(
		achieve?.AchievementAward?.badgeId ?? null
	)
	const [frameAward, setFrameAward] = useState<number | null>(
		achieve?.AchievementAward?.frameId ?? null
	)
	const [bgAward, setBgAward] = useState<number | null>(
		achieve?.AchievementAward?.backgroundId ?? null
	)
	const [panopticonAward, setPanopticonAward] = useState<number | null>(
		achieve?.AchievementAward?.panopticonId ?? null
	)
	const [roles, setRoles] = useState<IRoles | null>(
		{
			adjective: achieve?.AchievementAward?.adjectiveId ?? null,
			noun: achieve?.AchievementAward?.nounId ?? null,
		} ?? null
	)
	const [exp, setExp] = useState<string>(
		!!achieve?.AchievementAward?.exp ? `${achieve.AchievementAward.exp}` : '0'
	)
	const [achieveBgImg, setAchieveBgImg] = useState<File | null>(null)

	const { mutate: createAchieve, isSuccess: isSuccessCreate } =
		useCreateAchievement()
	const { mutate: updateAchieve } = useUpdateAchievement(achieve?.id ?? null)
	const { mutate: deleteAchieve } = useDeleteAchievement(achieve?.id ?? null)

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

		createAchieve(data)
	}

	const handleUpdate = async () => {
		const data = new FormData()

		if (!title) {
			console.log('title is required')
			return
		}
		data.append('title', title)

		if (desc) {
			data.append('description', desc)
		}

		if (!achieveBgImg && !achieve?.background) {
			console.log('achieveBgImg is required')
			return
		}
		if (achieveBgImg) {
			data.append('bgImg', achieveBgImg)
		} else if (achieve?.background) {
			const bg = await imgSrcToFile(achieve.background)
			data.append('bgImg', bg)
		}

		data.append('roomsId', JSON.stringify(selectedRooms))

		updateAchieve(data)
	}

	const setCreatedAwardTypes = () => {
		if (!achieve) return
		const awards = achieve.AchievementAward
		if (!awards) return
		if (awards.badgeId) {
			setAwardTypes(prev => [...prev, 'badge'])
		}
		if (awards.frameId) {
			setAwardTypes(prev => [...prev, 'frame'])
		}
		if (awards.backgroundId) {
			setAwardTypes(prev => [...prev, 'background'])
		}
		if (awards.panopticonId) {
			setAwardTypes(prev => [...prev, 'panopticon'])
		}
		if (awards.adjectiveId || awards.nounId) {
			setAwardTypes(prev => [...prev, 'unique-role'])
		}
		if (awards.exp) {
			setAwardTypes(prev => [...prev, 'experience'])
		}
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

	useEffect(() => {
		if (!isNew) {
			setCreatedAwardTypes()
		}
	}, [])

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
						onChange={() => isNew && handleClickAwardType('badge')}
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
						onChange={() => isNew && handleClickAwardType('frame')}
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
						onChange={() => isNew && handleClickAwardType('background')}
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
						onChange={() => isNew && handleClickAwardType('panopticon')}
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
						onChange={() => isNew && handleClickAwardType('unique-role')}
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
						onChange={() => isNew && handleClickAwardType('experience')}
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
						readOnly
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
					isNew={isNew}
				/>
				<Award
					award={badgeAward}
					setAward={setBadgeAward}
					awardType='badge'
					selectedAwardType={selectedAwardType}
					isNew={isNew}
				/>
				<Award
					award={bgAward}
					setAward={setBgAward}
					awardType='background'
					selectedAwardType={selectedAwardType}
					isNew={isNew}
				/>
				<Award
					award={panopticonAward}
					setAward={setPanopticonAward}
					awardType='panopticon'
					selectedAwardType={selectedAwardType}
					isNew={isNew}
				/>
				<RoleAward
					selectedAwardType={selectedAwardType}
					roles={roles}
					setRoles={setRoles}
					isNew={isNew}
				/>
				<ExperienceAward
					selectedAwardType={selectedAwardType}
					exp={exp}
					setExp={setExp}
					isNew={isNew}
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
					className='w-full h-full hover:bg-secondary transition-all text-xl font-secondary font-normal text-primaryText hover:text-white'
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
					<button
						onClick={handleUpdate}
						className='w-full h-[3.125rem] text-[#FFF] text-xl bg-primary hover:bg-primaryHover transition-all mb-2'
					>
						Обновить
					</button>
					<button
						onClick={() => deleteAchieve()}
						className='w-full h-[3.125rem] text-[#FFF] text-xl bg-tertiary hover:bg-opacity-90 transition-all'
					>
						Удалить
					</button>
				</div>
			)}
		</div>
	)
}

export default AchievementItem
