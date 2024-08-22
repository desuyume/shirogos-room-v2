import { RoomColor, roomColors } from '@/consts/roomColors'

export const getHexRoomColorByName = (name: RoomColor) => {
  return roomColors.find((roomColor) => roomColor.name === name)?.hex
}
