import { FC } from 'react'
import CustomizationNavBttn from './CustomizationNavBttn'
import { CustomizationSection } from '@/pages/Admin/Customization'

interface ICustomizationNav {
  activeSection: CustomizationSection
  setActiveSection: (section: CustomizationSection) => void
}

const CustomizationNav: FC<ICustomizationNav> = ({ activeSection, setActiveSection }) => {
  return (
    <div className='mr-12 flex flex-col items-center pt-4'>
      <CustomizationNavBttn
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        section={'badges'}
        title={'Значки'}
      />
      <CustomizationNavBttn
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        section={'frames'}
        title={'Рамки'}
      />
      <CustomizationNavBttn
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        section={'backgrounds'}
        title={'Фоны'}
      />
      <CustomizationNavBttn
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        section={'panopticons'}
        title={'Паноптикум'}
      />
      <CustomizationNavBttn
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        section={'roles'}
        title={'Роли'}
      />
    </div>
  )
}

export default CustomizationNav
