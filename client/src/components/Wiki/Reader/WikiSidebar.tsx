import { FC } from 'react'
import WikiSidebarInfo from './WikiSidebarInfo'
import { ICharacteristic } from '@/types/wiki.interface'

interface IWikiSidebar {
  characteristics: ICharacteristic[]
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const WikiSidebar: FC<IWikiSidebar> = ({ characteristics, isOpen, setIsOpen }) => {
  return (
    <div
      onMouseOver={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={
        (isOpen ? 'w-[9.6vw]' : 'w-[3.8vw]') +
        ' fixed bottom-0 left-0 z-40 h-[calc(100%-5.25rem)] bg-tertiary transition-all duration-1000 ease-out'
      }
    >
      {characteristics.map((characteristic) => (
        <WikiSidebarInfo
          isSidebarOpen={isOpen}
          key={characteristic.id}
          type={characteristic.title}
          value={characteristic.characteristic}
        />
      ))}
      <p
        className={
          (isOpen ? 'left-[-50%]' : 'left-[50%]') +
          ' absolute top-[50%] translate-x-[-50%] translate-y-[-50%] select-none text-[2.1875rem] text-[#44B86B] transition-all duration-1000 ease-out'
        }
      >
        |
      </p>
    </div>
  )
}

export default WikiSidebar
