import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { abbrMonths, months } from '@/consts/months.ts'
import cakeImg from '@/assets/cake.png'
import noBirthdayCakeImg from '@/assets/black-gray-cake.png'
import AlmanacSwitchBttn from './AlmanacSwitchBttn.tsx'
import { useCurrentBirthdays } from '@/api/useCurrentBirthdays.ts'
import useDate from '@/hooks/useDate.ts'
import { Scrollbar } from 'react-scrollbars-custom'

const Almanac: FC = () => {
  const { currentDate, setCurrentDate, prevDate, setPrevDate, nextDate, setNextDate } = useDate(
    new Date()
  )
  const { data: birthdays, isFetching, isError } = useCurrentBirthdays(currentDate)
  const [usernames, setUsernames] = useState<string[]>([])
  const [isTwoRowNicknames, setIsTwoRowNicknames] = useState<boolean>(false)
  const usernamesRef = useRef<HTMLParagraphElement | null>(null)

  const clickPrevBttn = () => {
    setNextDate(currentDate)
    setCurrentDate(prevDate)
    setPrevDate(new Date(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate() - 1))
  }

  const clickNextBttn = () => {
    setPrevDate(currentDate)
    setCurrentDate(nextDate)
    setNextDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), nextDate.getDate() + 1))
  }

  useEffect(() => {
    if (!isFetching && !isError && !!birthdays) {
      setUsernames(birthdays.map((birthday) => birthday.username))
    }
  }, [isFetching])

  useLayoutEffect(() => {
    if (usernamesRef.current) {
      if (usernamesRef.current.clientHeight > 26) {
        setIsTwoRowNicknames(true)
      } else {
        setIsTwoRowNicknames(false)
      }
    }
  }, [usernamesRef.current, usernames])

  return (
    <div
      className='almanac flex h-[17.1875rem] w-[31.875rem] items-center justify-between rounded-[2.3125rem] px-3 py-3.5'
      style={{
        background:
          'linear-gradient(137deg, rgba(23, 23, 23, 0.20) 0%, rgba(36, 36, 36, 0.20) 46.88%), rgba(24, 24, 24, 0.40)'
      }}
    >
      <AlmanacSwitchBttn
        onClick={clickPrevBttn}
        date={prevDate.getDate()}
        month={abbrMonths[prevDate.getMonth() as keyof typeof months]}
      />
      <div className='mt-[1.875rem] flex h-full w-full flex-col items-center'>
        <div className='mb-6 text-center'>
          <p className='mb-1 text-2xl leading-none text-[#EBE984]'>
            {currentDate.getDate()} {months[currentDate.getMonth() as keyof typeof months]}
          </p>
          <p className='text-[2.5rem] leading-none text-primaryText'>Альманах</p>
        </div>
        {
          <div className='relative h-[6.625rem] w-full'>
            <div
              className={
                (usernames.length ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
                'absolute inset-0 flex h-full w-full items-center justify-center'
              }
            >
              <img src={cakeImg} alt='cake-img' className='mr-[1.375rem]' />
              <div className='flex w-[11.8125rem] max-w-[11.8125rem] flex-col items-center pt-2.5'>
                <p className='text-center font-secondary text-[1.0625rem] font-bold text-[#EBE984]'>
                  С Днем Рождения<span className='text-primaryText'>,</span>
                </p>
                {isTwoRowNicknames ? (
                  <Scrollbar
                    noDefaultStyles
                    style={{
                      height: isTwoRowNicknames ? '3.1875rem' : '1.59375rem'
                    }}
                    className='w-full'
                  >
                    <p
                      ref={usernamesRef}
                      className={
                        'break-words text-center font-secondary text-[1.0625rem] font-bold text-primaryText'
                      }
                    >
                      {usernames.join(', ')}
                    </p>
                  </Scrollbar>
                ) : (
                  <p
                    ref={usernamesRef}
                    className={
                      'w-full break-words text-center font-secondary text-[1.0625rem] font-bold text-primaryText'
                    }
                  >
                    {usernames.join(', ')}
                  </p>
                )}
              </div>
            </div>
            <div
              className={
                (!usernames.length ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
                'absolute inset-0 flex h-full w-full items-center justify-center'
              }
            >
              <img src={noBirthdayCakeImg} alt='cake-img' className='mr-[1.375rem]' />
              <p className='w-[11.8125rem] pt-2.5 text-center text-[1.0625rem] leading-none text-primaryText'>
                Сегодня нет
                <span className='mb-1 inline-block text-[#EBE984]'>Дней Рождений</span>!
                <span className='inline-block text-[0.625rem] leading-none'>
                  (или его не указали в настройках)
                </span>
              </p>
            </div>
          </div>
        }
      </div>
      <AlmanacSwitchBttn
        onClick={clickNextBttn}
        date={nextDate.getDate()}
        month={abbrMonths[nextDate.getMonth() as keyof typeof months]}
      />
    </div>
  )
}

export default Almanac
