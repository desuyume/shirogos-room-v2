import { months } from '@/consts/months'

export const getDayRuFormat = (day: string | number) => {
  const daySplit = String(day).split('')
  return daySplit[0] === '0' ? daySplit[1] : day
}

export const formatDate = (initialDate: Date): string => {
  const date = new Date(initialDate)

  const formatedDate = date.toLocaleDateString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hourCycle: 'h23',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return formatedDate
}

export const formatDateNews = (initialDate: Date): string => {
  const date = new Date(initialDate)
  const now = new Date()
  const prevDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  let day
  let time

  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    day = 'Сегодня'
  } else if (
    prevDate.getFullYear() === date.getFullYear() &&
    prevDate.getMonth() === date.getMonth() &&
    prevDate.getDate() === date.getDate()
  ) {
    day = 'Вчера'
  } else {
    day = date.toLocaleDateString('ru-RU', {
      timeZone: 'Europe/Moscow',
      hourCycle: 'h23',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    })
  }

  time = date.toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${day} в ${time}`
}

export const formatDateNotifications = (initialDate: Date): string => {
  const date = new Date(initialDate)
  const now = new Date()
  const prevDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
  let day
  let time

  if (
    now.getFullYear() === date.getFullYear() &&
    now.getMonth() === date.getMonth() &&
    now.getDate() === date.getDate()
  ) {
    day = 'Сегодня'
  } else if (
    prevDate.getFullYear() === date.getFullYear() &&
    prevDate.getMonth() === date.getMonth() &&
    prevDate.getDate() === date.getDate()
  ) {
    day = 'Вчера'
  } else {
    day = date.toLocaleDateString('ru-RU', {
      timeZone: 'Europe/Moscow',
      hourCycle: 'h23',
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    })

    day = day.split('.')
    const month = +getDayRuFormat(day[1])
    day = `${getDayRuFormat(day[0])} ${months[month - 1]}`
  }

  time = date.toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit'
  })

  return `${day} в ${time}`
}
