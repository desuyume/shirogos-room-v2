import { ICharacteristic } from '@/types/wiki.interface'
import { FC, useEffect, useState } from 'react'

interface ICharacteristicEditor {
	selectedBlock: ICharacteristic | null
	isVisible: boolean
	setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
	setBlocks: React.Dispatch<React.SetStateAction<ICharacteristic[]>>
}

const CharacteristicEditor: FC<ICharacteristicEditor> = ({
	selectedBlock,
	isVisible,
	setIsVisible,
	setBlocks,
}) => {
	const [title, setTitle] = useState<string>('')
	const [characteristic, setCharacteristic] = useState<string>('')

	const addBlock = () => {
		if (!title || !characteristic) {
			console.log('fill all fields')
			return
		}

		setBlocks(prev => [...prev, { id: prev.length + 1, title, characteristic }])
		setIsVisible(false)
		setTitle('')
		setCharacteristic('')
	}

	const editBlock = () => {
		if (!title || !characteristic) {
			console.log('fill all fields')
			return
		}

		setBlocks(prev =>
			prev.map(block =>
				block.id === selectedBlock?.id
					? { ...block, title, characteristic }
					: block
			)
		)
		setIsVisible(false)
	}

	const removeBlock = () => {
		setBlocks(prev => prev.filter(block => block.id !== selectedBlock?.id))
		setIsVisible(false)
	}

	const goBack = () => {
		if (selectedBlock) {
			setTitle(selectedBlock.title)
			setCharacteristic(selectedBlock.characteristic)
		}

		setIsVisible(false)
	}

	useEffect(() => {
		if (selectedBlock) {
			setTitle(selectedBlock.title)
			setCharacteristic(selectedBlock.characteristic)
		} else {
			setTitle('')
			setCharacteristic('')
		}
	}, [selectedBlock])

	return (
		<div
			className={
				(isVisible ? 'opacity-100 visible ' : 'opacity-0 invisible ') +
				'bg-tertiary w-full h-[60.625rem] border-t-[1px] border-t-primary absolute inset-0 flex justify-center transition-all px-8 pt-[1.94rem]'
			}
		>
			<button
				onClick={goBack}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				Назад
			</button>

			<div className='flex-1 h-full mx-8'>
				<div className='w-full h-[57.3125rem] bg-secondary border-[5px] border-primary flex flex-col justify-center items-center relative'>
					<div className='w-[77.5%] h-[15.375rem] flex border-tertiary border-[5px] mb-5'>
						<div className='w-[35%] h-full bg-tertiary flex justify-center items-center'>
							<p className='text-center text-[#FFF] text-[1.5625rem]'>
								Название
							</p>
						</div>
						<div className='flex-1 h-full'>
							<input
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder='Описание'
								className='w-full h-full text-center placeholder:text-[#A3A3A3] text-[1.5625rem] bg-transparent outline-none text-[#A3A3A3] px-4'
							/>
						</div>
					</div>
					<div className='w-[77.5%] h-[15.375rem] flex border-tertiary border-[5px] mb-5'>
						<div className='w-[35%] h-full bg-tertiary flex justify-center items-center'>
							<p className='text-center text-[#FFF] text-[1.5625rem]'>
								Характеристика
							</p>
						</div>
						<div className='flex-1 h-full'>
							<input
								value={characteristic}
								onChange={e => setCharacteristic(e.target.value)}
								placeholder='Описание'
								className='w-full h-full text-center placeholder:text-[#A3A3A3] text-[1.5625rem] bg-transparent outline-none text-[#A3A3A3] px-4'
							/>
						</div>
					</div>

					<button
						onClick={removeBlock}
						className={
							(!!selectedBlock ? 'block ' : 'hidden ') +
							'w-[16.3125rem] h-[1.5625rem] bg-[#FF0000] text-[#FFF] text-[1.5625rem] leading-[1.5625rem] hover:bg-opacity-60 transition-all absolute bottom-8'
						}
					>
						Удалить
					</button>
				</div>
			</div>

			<button
				onClick={!!selectedBlock ? editBlock : addBlock}
				className='w-[16rem] h-[57.3125rem] bg-primary hover:bg-primaryHover transition-all flex justify-center items-center text-[#FFF] text-[2.5rem]'
			>
				{!!selectedBlock ? 'Изменить' : 'Добавить'}
			</button>
		</div>
	)
}

export default CharacteristicEditor
