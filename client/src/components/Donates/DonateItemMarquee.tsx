import { FC } from 'react'
import heartIcon from '@/assets/heart-icon.svg'
import { formatMoney } from '@/utils/formatMoney'

interface IDonateItemMarquee {
  username: string
  amount?: number
  gifts?: string
}

const DonateItemMarquee: FC<IDonateItemMarquee> = ({ username, amount, gifts }) => {
  return (
    <div className='mr-3 flex items-center'>
      <img className='mr-3' src={heartIcon} alt='heart-icon' />
      <p>
        <span className='text-xl text-[#EBE984]'>{username}</span>
        <span className='text-xl text-primaryText'>
          {' '}
          - {!!amount && <>{formatMoney(amount)}р</>}
          {!amount && !!gifts && <>{gifts}</>} {!!gifts && !!amount && <> + {gifts}</>}
        </span>
      </p>
    </div>
  )
}

export default DonateItemMarquee
