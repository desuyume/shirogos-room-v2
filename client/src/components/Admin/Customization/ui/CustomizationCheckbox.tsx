import { FC } from 'react'

interface ICustomizationCheckbox {
	isActive: boolean
	isChecked: boolean
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>
}

const CustomizationCheckbox: FC<ICustomizationCheckbox> = ({
	isActive,
	isChecked,
	setIsChecked,
}) => {
	return (
		<input
			disabled={!isActive}
			checked={isChecked}
			onChange={() => setIsChecked(!isChecked)}
			className={
				'w-[1.875rem] h-[1.875rem] bg-transparent border-[3px] border-white checked:bg-white transition-all appearance-none cursor-pointer disabled:cursor-default'
			}
			type='checkbox'
		/>
	)
}

export default CustomizationCheckbox
