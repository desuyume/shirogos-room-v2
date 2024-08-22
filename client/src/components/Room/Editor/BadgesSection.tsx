import { useBuyedBadges } from '@/api/useBuyedBadges'
import { FC, useState } from 'react'
import BadgesNav from './BadgesNav'
import type { BadgeType } from '@/types/badge.interface'
import BadgesList from './BadgesList'
import { IEditorBadge } from '../Sections/RoomEditor'

interface IBadgesSection {
  editorBadges: IEditorBadge[]
  setEditorBadges: React.Dispatch<React.SetStateAction<IEditorBadge[]>>
  zIndexCount: number
  setZIndexCount: React.Dispatch<React.SetStateAction<number>>
}

const BadgesSection: FC<IBadgesSection> = ({
  editorBadges,
  setEditorBadges,
  zIndexCount,
  setZIndexCount
}) => {
  const [activeBadgesSection, setActiveBadgesSection] = useState<BadgeType>('unique')

  const { data: badges, isLoading, isError } = useBuyedBadges()

  return (
    <div className='h-[13.125rem] w-full rounded-[2.3125rem] bg-secondaryHover'>
      {isLoading ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-xl'>Загрузка...</p>
        </div>
      ) : isError ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-xl'>Ошибка</p>
        </div>
      ) : !badges.length ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p className='text-xl'>Нет купленных значков</p>
        </div>
      ) : (
        <div className='editor-badges flex h-full w-full flex-col items-center pl-[1.0625rem] pr-5 pt-[1.1875rem]'>
          <BadgesNav
            activeBadgesSection={activeBadgesSection}
            setActiveBadgesSection={setActiveBadgesSection}
          />
          <BadgesList
            activeBadgesSection={activeBadgesSection}
            badges={badges}
            editorBadges={editorBadges}
            setEditorBadges={setEditorBadges}
            zIndexCount={zIndexCount}
            setZIndexCount={setZIndexCount}
          />
        </div>
      )}
    </div>
  )
}

export default BadgesSection
