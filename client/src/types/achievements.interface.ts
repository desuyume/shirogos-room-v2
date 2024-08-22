export interface IAchievemnt {
  id: number
  title: string
  description: string
  awardType: AwardType[]
  bgImg: string | null
  rooms: number[]
}

export type AwardType =
  | 'badge'
  | 'frame'
  | 'background'
  | 'panopticon'
  | 'unique-role'
  | 'experience'
  | 'achieve-bg'

export interface IAchievementFetch {
  id: number
  title: string
  description: string | null
  background: string | null
}

export interface IAchievementFetchWithAward {
  id: number
  title: string
  description: string | null
  background: string | null
  AchievementAward: IAchievementAward | null
  AchievementsOnRooms: {
    roomId: number
  }[]
}

export interface IAchievementAward {
  achievementId: number
  badgeId: number | null
  frameId: number | null
  backgroundId: number | null
  panopticonId: number | null
  adjectiveId: number | null
  nounId: number | null
  exp: number | null
}
