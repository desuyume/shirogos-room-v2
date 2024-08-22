import { AwardType } from '@/types/achievements.interface'
import { FC } from 'react'

interface IExperienceAward {
  selectedAwardType: AwardType | null
  exp: string
  setExp: React.Dispatch<React.SetStateAction<string>>
  isNew: boolean
}

const ExperienceAward: FC<IExperienceAward> = ({ selectedAwardType, exp, setExp, isNew }) => {
  return (
    <div
      className={
        (selectedAwardType === 'experience' ? 'block ' : 'hidden ') +
        'relative flex w-full flex-1 flex-col items-center justify-center px-5 transition-all'
      }
    >
      {isNew ? (
        <input
          value={exp}
          onChange={(e) => setExp(e.target.value)}
          className='h-8 w-full border-b-[1px] border-b-primary bg-transparent text-center font-secondary text-xl text-[#FFF] outline-none'
        />
      ) : (
        <p className='h-8 w-full border-b-[1px] border-b-primary bg-transparent text-center font-secondary text-xl text-[#FFF] outline-none'>
          {exp}
        </p>
      )}
    </div>
  )
}

export default ExperienceAward
