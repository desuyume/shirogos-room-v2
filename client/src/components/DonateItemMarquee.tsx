import { FC } from 'react'
import heartIcon from '../assets/heart-icon.svg'

interface IDonateItemMarquee {
	nickname: string
	amount?: string
	gifts?: string
}

const DonateItemMarquee: FC<IDonateItemMarquee> = ({
	nickname,
	amount,
	gifts,
}) => {
	return (
		<div className='flex items-center mr-3'>
			<img className='mr-3' src={heartIcon} alt='heart-icon' />
			<p>
				<span className='text-[#EBE984] text-xl'>{nickname}</span>
				<span className='text-xl text-[#D9D9D9]'> - {amount && <>{amount}р</>}
				{!amount && gifts && <>{gifts}</>} {gifts && amount && <> + {gifts}</>}
				</span>
			</p>
		</div>
	)
}

export default DonateItemMarquee
