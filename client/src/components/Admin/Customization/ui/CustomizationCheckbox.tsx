import { FC } from 'react'

interface ICustomizationCheckbox extends React.InputHTMLAttributes<HTMLInputElement> {
}

const CustomizationCheckbox: FC<ICustomizationCheckbox> = ({
  ...props
}) => {
  return (
    <input
      className={
        'h-[1.875rem] w-[1.875rem] cursor-pointer appearance-none border-[3px] border-white bg-transparent transition-all checked:bg-white disabled:cursor-default'
      }
      type='checkbox'
      {...props}
    />
  )
}

export default CustomizationCheckbox
