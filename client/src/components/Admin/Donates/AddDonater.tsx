import { FC, useState } from 'react'

const AddDonater: FC = () => {
	const [nickname, setNickname] = useState<string>('')
	const [donate, setDonate] = useState<string>('')
	const [comment, setComment] = useState<string>('')

	const addDonater = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		console.log(`nickname - ${nickname}`);
		console.log(`donate - ${donate}р`);
		console.log(`comment - ${comment}`);
	}

	return (
		<form className='h-[3.125rem] flex ml-4 pb-[0.87rem]'>
			<input
				value={nickname}
				onChange={e => setNickname(e.target.value)}
				placeholder='Ник'
				className='text-xl w-[11.40625vw] mr-[0.8vw] h-full bg-tertiary outline-none text-[#FFF] text-center'
				required
			/>
			<input
				value={donate}
				onChange={e => setDonate(e.target.value)}
				placeholder='Сумма'
				className='text-xl w-[16.1125vw] mr-[6.5vw] h-full bg-tertiary outline-none text-[#FFF] text-center'
				required
			/>
			<input
				value={comment}
				onChange={e => setComment(e.target.value)}
				placeholder='Комментарий'
				className='text-xl w-[37.03125vw] h-full bg-tertiary outline-none text-[#FFF] text-center mr-[0.78125vw]'
			/>
			<button onClick={e => addDonater(e)} className='w-[13.59375vw] h-full bg-primary hover:bg-primaryHover transition-all text-xl text-[#FFF]'>
				Добавить
			</button>
		</form>
	)
}

export default AddDonater
