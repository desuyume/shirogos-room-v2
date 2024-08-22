const loadImage = async (imageUrl: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = imageUrl

    img.onload = () => {
      // console.log(`Image loaded: ${imageUrl}`)
      resolve()
    }

    img.onerror = (error) => {
      console.error(`Error loading image: ${imageUrl}`)
      reject(error)
    }
  })
}

export default loadImage
