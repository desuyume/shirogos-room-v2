import CustomizationNav from '@/components/Admin/Customization/CustomizationNav'
import BackgroundSection from '@/components/Admin/Customization/Sections/Background/BackgroundSection'
import BadgeSection from '@/components/Admin/Customization/Sections/Badge/BadgeSection'
import FrameSection from '@/components/Admin/Customization/Sections/Frame/FrameSection'
import PanopticonSection from '@/components/Admin/Customization/Sections/Panopticon/PanopticonSection'
import RoleSection from '@/components/Admin/Customization/Sections/Role/RoleSection'
import AdminWrapper from '@/layout/Admin/AdminWrapper'
import { FC, useState } from 'react'

export type CustomizationSection = 'badges' | 'frames' | 'backgrounds' | 'panopticons' | 'roles'

const Customization: FC = () => {
  const [activeSection, setActiveSection] = useState<CustomizationSection>('badges')

  return (
    <AdminWrapper>
      <div className='flex h-full w-full pl-11 pt-7'>
        <CustomizationNav activeSection={activeSection} setActiveSection={setActiveSection} />
        {activeSection === 'badges' && <BadgeSection />}
        {activeSection === 'frames' && <FrameSection />}
        {activeSection === 'backgrounds' && <BackgroundSection />}
        {activeSection === 'panopticons' && <PanopticonSection />}
        {activeSection === 'roles' && <RoleSection />}
      </div>
    </AdminWrapper>
  )
}

export default Customization
