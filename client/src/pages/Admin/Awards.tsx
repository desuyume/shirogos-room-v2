import AwardsList from '@/components/Admin/Awards/AwardsList'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'

const Awards: FC = () => {
	const [isBoutiqueActive, setIsBoutiqueActive] = useState<boolean>(true)
	const [isSpecialsActive, setIsSpecialsActive] = useState<boolean>(false)

	return (
		<AdminWrapper>
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
			<AwardsList isActive={isBoutiqueActive} type='boutique' />
			<AwardsList isActive={isSpecialsActive} type='special' />
		</AdminWrapper>
	)
}

export default Awards
