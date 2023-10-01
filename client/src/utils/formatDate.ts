export const formatDate = (initialDate: Date): string => {
	const date = new Date(initialDate)
	const now = new Date()
	const prevDate = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate() - 1
	)
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
			day: '2-digit',
		})
	}

	time = date.toLocaleTimeString('ru-RU', {
		timeZone: 'Europe/Moscow',
		hourCycle: 'h23',
		hour: '2-digit',
		minute: '2-digit',
	})

	return `${day} в ${time}`
}
