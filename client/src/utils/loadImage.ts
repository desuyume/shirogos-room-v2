function loadImage(imageUrl: string): boolean {
	const img = new Image()
	img.src = imageUrl
	img.onload = () => {
		return true
	}
	img.onerror = () => {
		return false
	}
	return true
}

export default loadImage
