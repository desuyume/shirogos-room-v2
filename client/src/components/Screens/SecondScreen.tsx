import { FC, useEffect, useState } from 'react'
import bgVideo from '@/assets/shirogo.mp4'
import Almanac from '@/components/Almanac/Almanac'
import News from '@/components/News/News'
import Rating from '../Rating/Rating'
import RoomGuidePreview from '../RoomGuide/RoomGuidePreview'
import RoomGuideScreen from '../RoomGuide/RoomGuideScreen'
import { useSearchParams } from 'react-router-dom'

const SecondScreen: FC = () => {
  const [isRoomGuideScreenVisible, setIsRoomGuideScreenVisible] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useSearchParams()

  const moveToGuide = (section: 'screen' | 'preview') => {
    if (section === 'preview') {
      setIsRoomGuideScreenVisible(false)
    } else {
      setIsRoomGuideScreenVisible(true)
    }

    window.scrollTo({
      top: 908,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    if (searchParams.get('to') === 'guideScreen') {
      searchParams.delete('to')
      setSearchParams(searchParams)
      moveToGuide('screen')
    }

    if (searchParams.get('to') === 'guidePreview') {
      searchParams.delete('to')
      setSearchParams(searchParams)
      moveToGuide('preview')
    }
  }, [])

  return (
    <div className='relative h-[65.0625rem] overflow-hidden'>
      <video
        className='absolute -z-10 h-full w-full object-cover'
        src={bgVideo}
        autoPlay
        loop
        muted
      />

      <div className='ml-auto mr-6 flex h-full w-[66rem] flex-col items-center justify-center'>
        <News className='mb-[0.9375rem]' />
        <RoomGuidePreview
          setIsRoomGuideScreenVisible={setIsRoomGuideScreenVisible}
          className='mb-[3.875rem]'
        />
        <div className='flex w-full items-center pl-[3.5rem]'>
          <Rating className='mr-[0.9375rem]' />
          <Almanac />
        </div>
      </div>

      <RoomGuideScreen
        isVisible={isRoomGuideScreenVisible}
        setIsVisible={setIsRoomGuideScreenVisible}
      />
    </div>
  )
}

export default SecondScreen
