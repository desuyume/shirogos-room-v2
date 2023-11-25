import { useAward } from '@/api/useAward'
import { useAwardType } from '@/api/useAwardType'
import AwardsList from '@/components/Admin/Awards/AwardsList'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { AwardType } from '@/types/award.interface'
import { FC, useState } from 'react'

const Awards: FC = () => {
	const [isBoutiqueActive, setIsBoutiqueActive] = useState<boolean>(true)
	const [isSpecialsActive, setIsSpecialsActive] = useState<boolean>(false)

	const { isLoading, isError, data: awards } = useAward()
	const {
		isLoading: isTypesLoading,
		isError: isTypesError,
		data: awardTypes,
	} = useAwardType()

	return (
		<AdminWrapper>
			{isLoading || isTypesLoading ? (
				<div className='w-full h-[20rem] flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Загрузка...</p>
				</div>
			) : isError || isTypesError ? (
				<div className='w-full h-[20rem] flex justify-center items-center'>
					<p className='text-[#FFF] text-xl'>Произошла ошибка</p>
				</div>
			) : (
				<>
					<div className='flex justify-center mt-5'>
						<button
							onClick={() => {
								setIsBoutiqueActive(true)
								setIsSpecialsActive(false)
							}}
							className={
								(isBoutiqueActive
									? 'text-primary bg-transparent'
									: 'text-[#FFF] bg-tertiary hover:bg-opacity-90') +
								' w-[11.73rem] h-[3.6rem] flex justify-center items-center rounded-[3rem] text-xl mr-6 transition-all'
							}
						>
							Бутик
						</button>
						<button
							onClick={() => {
								setIsSpecialsActive(true)
								setIsBoutiqueActive(false)
							}}
							className={
								(isSpecialsActive
									? 'text-primary bg-transparent'
									: 'text-[#FFF] bg-tertiary hover:bg-opacity-90') +
								' w-[11.73rem] h-[3.6rem] flex justify-center items-center rounded-[3rem] text-xl transition-all'
							}
						>
							Особые
						</button>
					</div>
					<AwardsList
						isActive={isBoutiqueActive}
						awards={awards.filter(
							award => award.category === AwardType.BOUTIQUE
						)}
						type={AwardType.BOUTIQUE}
						awardTypes={awardTypes}
					/>
					<AwardsList
						isActive={isSpecialsActive}
						awards={awards.filter(award => award.category === AwardType.SPECIAL)}
						type={AwardType.SPECIAL}
						awardTypes={awardTypes}
					/>
				</>
			)}
		</AdminWrapper>
	)
}

export default Awards
