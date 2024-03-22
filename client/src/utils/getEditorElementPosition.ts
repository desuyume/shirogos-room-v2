export const getEditorElementPosition = (element: HTMLElement) => {
	const elementPos = element.getBoundingClientRect()

	const style = window.getComputedStyle(element)
	const matrix = new DOMMatrixReadOnly(style.transform)

	return {
		translateX: (matrix.m41 / elementPos.width) * 100,
		translateY: (matrix.m42 / elementPos.height) * 100,
	}
}

export const getEditorElementPositionInPx = (
	width: number,
	height: number,
	posXInPercent: number,
	posYInPercent: number
) => {
	return {
		translateX: (posXInPercent / 100) * width,
		translateY: (posYInPercent / 100) * height,
	}
}

export const getEditorBadgePercentSize = (
	container: HTMLElement,
	elementWidth: number,
	elementHeight: number
) => {
	const containerPos = container.getBoundingClientRect()
	return {
		width: (elementWidth / containerPos.width) * 100,
		height: (elementHeight / containerPos.height) * 100,
	}
}

export const getEditorBadgePxSize = (
	container: HTMLElement,
	widthPercent: number,
	heightPercent: number
) => {
	const containerPos = container.getBoundingClientRect()
	return {
		width: (widthPercent / 100) * containerPos.width,
		height: (heightPercent / 100) * containerPos.height,
	}
}
