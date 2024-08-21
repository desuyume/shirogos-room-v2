import { useEffect, useLayoutEffect } from 'react'

export const useScreenObserver = (
	fn: () => void,
	deps: any[] | undefined,
	isLayoutEffect = false
) => {
	if (isLayoutEffect) {
		useLayoutEffect(() => {
			window.addEventListener('resize', fn)

			return () => {
				window.removeEventListener('resize', fn)
			}
		}, deps)
	} else {
		useEffect(() => {
			window.addEventListener('resize', fn)

			return () => {
				window.removeEventListener('resize', fn)
			}
		}, deps)
	}
}
