import { RoomAppearanceContext } from '@/Context'
import { colorVariants, colorVariantsHover } from '@/consts/roomColors'
import { saveCrop, setCanvasImage } from '@/utils/cropUtils'
import { FC, SyntheticEvent, useContext, useEffect, useRef, useState } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop, type Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ICropModal {
  aspect: number
  img: string | null
  isVisible: boolean
  setIsVisible: (value: boolean) => void
  saveToServerFn?: (file: File) => void
  canvas?: HTMLCanvasElement | null
  setMiniature?: (value: File | null) => void
  setInNew?: (value: boolean) => void
}

const CropModal: FC<ICropModal> = ({
  aspect,
  img,
  isVisible,
  setIsVisible,
  saveToServerFn,
  canvas,
  setMiniature,
  setInNew
}) => {
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const roomAppearance = useContext(RoomAppearanceContext)

  const setCropInCenter = (e?: SyntheticEvent<HTMLImageElement, Event>) => {
    const image = e?.currentTarget ?? imgRef.current

    if (!image) {
      return
    }

    const { naturalWidth: width, naturalHeight: height } = image

    const crop = centerCrop(
      makeAspectCrop(
        {
          // You don't need to pass a complete crop into
          // makeAspectCrop or centerCrop.
          unit: '%',
          width: 90
        },
        aspect,
        width,
        height
      ),
      width,
      height
    )

    setCrop(crop)
  }

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    imgRef.current = e.currentTarget
    setCropInCenter(e)
  }

  const clickSave = async () => {
    if (!imgRef.current || !completedCrop) return

    if (saveToServerFn) {
      await saveCrop(imgRef.current, completedCrop, saveToServerFn)
    }

    console.log(canvas)


    if (!!canvas) {
      setCanvasImage(imgRef.current, canvas, completedCrop)
    }

    if (setMiniature) {
      const file = await saveCrop(imgRef.current, completedCrop)
      setMiniature(file)
    }

    if (!!setInNew) setInNew(true)
    setIsVisible(false)
  }

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setCropInCenter()
    })
    observer.observe(document.documentElement)

    return () => {
      observer.unobserve(document.documentElement)
    }
  }, [])

  return (
    <div
      className={
        (isVisible ? 'visible opacity-100 ' : 'invisible opacity-0 ') +
        `fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-60 transition-all`
      }
    >
      <div className='items-center rounded-[37px] bg-secondary p-8 text-center'>
        <div className='mb-6 w-full'>
          <ReactCrop
            aspect={aspect}
            crop={crop}
            onChange={(c) => setCrop(c)}
            onComplete={(c) => setCompletedCrop(c)}
          >
            <img
              className='h-[70vh]'
              onLoad={onImageLoad}
              src={img ?? ''}
              crossOrigin='anonymous'
            />
          </ReactCrop>
        </div>
        <div className='flex w-full items-center justify-center'>
          <button
            onClick={() => setIsVisible(false)}
            className='mr-6 h-10 w-52 bg-tertiary text-primaryText transition-all hover:bg-opacity-80 hover:text-white'
          >
            Отмена
          </button>
          <button
            onClick={clickSave}
            className={`${colorVariants.bg[roomAppearance.active_room_color]} ${colorVariantsHover.bg[roomAppearance.active_room_color]
              } h-10 w-52 text-primaryText transition-all hover:text-white`}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CropModal
