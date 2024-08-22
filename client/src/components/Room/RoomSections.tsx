import { FC } from 'react'
import RoomMain from './Sections/RoomMain'
import RoomCustimization from './Sections/RoomCustimization'
import RoomBoutique from './Sections/RoomBoutique'
import RoomSettings from './Sections/RoomSettings'
import RoomEditor from './Sections/RoomEditor'

const RoomSections: FC = () => {
  return (
    <div className='mx-auto mt-[1.6rem] w-[73.85vw] pb-12'>
      <RoomMain />
      <RoomCustimization />
      <RoomBoutique />
      <RoomSettings />
      <RoomEditor />
    </div>
  )
}

export default RoomSections
