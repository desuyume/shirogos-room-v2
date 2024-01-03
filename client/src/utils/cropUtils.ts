import { Crop } from 'react-image-crop'

export const setCanvasImage = (
	image: HTMLImageElement,
	canvas: HTMLCanvasElement,
	crop: Crop
) => {
	if (!crop || !canvas || !image) {
		return null
	}

	const scaleX = image.naturalWidth / image.width
	const scaleY = image.naturalHeight / image.height
	const ctx = canvas.getContext('2d')
	const pixelRatio = window.devicePixelRatio

	canvas.width = crop.width * pixelRatio * scaleX
	canvas.height = crop.height * pixelRatio * scaleY

	if (!ctx) {
		return null
	}

	ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
	ctx.imageSmoothingQuality = 'high'

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY
	)
}

export const saveCrop = async (image: HTMLImageElement, crop: Crop, fn: (file: File) => void) => {
	const canvas = document.createElement('canvas')
	const scaleX = image.naturalWidth / image.width
	const scaleY = image.naturalHeight / image.height

	canvas.width = crop.width
	canvas.height = crop.height

	const ctx = canvas.getContext('2d')

	if (!ctx) {
		return null
	}

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width,
		crop.height
	)

	const dataUrl = canvas.toDataURL('image/jpeg')
	const file = dataURLtoFile(dataUrl, 'image.jpeg')

	fn(file)
}

const dataURLtoFile = (dataURL: string, filename: string) => {
	const arr = dataURL.split(',')
	const mime = arr[0]?.match(/:(.*?);/)?.[1]
	const bstr = atob(arr[1])
	let n = bstr.length
	const u8arr = new Uint8Array(n)

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}

	return new File([u8arr], filename, { type: mime })
}
