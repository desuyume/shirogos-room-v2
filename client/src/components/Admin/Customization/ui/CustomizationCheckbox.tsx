import { FC } from 'react'

interface ICustomizationCheckbox {
  isActive: boolean
  isChecked: boolean
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomizationCheckbox: FC<ICustomizationCheckbox> = ({
  isActive,
  isChecked,
  setIsChecked
}) => {
  return (
    <input
      disabled={!isActive}
      checked={isChecked}
      onChange={() => setIsChecked(!isChecked)}
      className={
        'h-[1.875rem] w-[1.875rem] cursor-pointer appearance-none border-[3px] border-white bg-transparent transition-all checked:bg-white disabled:cursor-default'
      }
      type='checkbox'
    />
  )
}

export default CustomizationCheckbox
