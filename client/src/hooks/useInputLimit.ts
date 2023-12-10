import { useEffect, useState } from 'react'

export const useInputLimit = (
	setInput: React.Dispatch<React.SetStateAction<string>>
) => {
	const [limit, setLimit] = useState<number>(34)

	const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (limit > 0) {
			setInput(e.target.value)
			setLimit(34 - e.target.value.length)
		}
	}

	const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Backspace' && limit < 34) {
			setLimit(prev => prev + 1)
		}
	}

	useEffect(() => {
		if (limit < 0) {
			setInput(value => value.slice(0, 34))
			setLimit(0)
		}
	}, [limit])

	return {
		limit,
		setLimit,
		changeNameHandler,
		keyDownHandler,
	}
}
