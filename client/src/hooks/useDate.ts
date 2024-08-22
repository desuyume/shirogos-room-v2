import { useState } from 'react'

const useDate = (date: Date) => {
  const [currentDate, setCurrentDate] = useState<Date>(date)
  const [prevDate, setPrevDate] = useState<Date>(
    new Date(currentDate?.getFullYear(), currentDate?.getMonth(), currentDate?.getDate() - 1)
  )
  const [nextDate, setNextDate] = useState<Date>(
    new Date(currentDate?.getFullYear(), currentDate?.getMonth(), currentDate?.getDate() + 1)
  )

  return {
    currentDate,
    setCurrentDate,
    prevDate,
    setPrevDate,
    nextDate,
    setNextDate
  }
}

export default useDate
