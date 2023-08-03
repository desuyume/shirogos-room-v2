import { FC } from 'react'
import characterImg from '@/assets/wiki-test-img.png'
import NoCategoryItem from './NoCategoryItem'

const NoCategorySection: FC = () => {
	// TODO: fetch items from db
	const noCategoryItems = [
		{ id: 1, name: 'Сэм Аврорус', img: characterImg },
		{ id: 2, name: 'Сэм Аврорус', img: characterImg },
		{ id: 3, name: 'Сэм Аврорус', img: characterImg },
		{ id: 4, name: 'Сэм Аврорус', img: characterImg },
		{ id: 5, name: 'Сэм Аврорус', img: characterImg },
		{ id: 6, name: 'Сэм Аврорус', img: characterImg },
		{ id: 7, name: 'Сэм Аврорус', img: characterImg },
		{ id: 8, name: 'Сэм Аврорус', img: characterImg },
		{ id: 9, name: 'Сэм Аврорус', img: characterImg },
		{ id: 10, name: 'Сэм Аврорус', img: characterImg },
		{ id: 11, name: 'Сэм Аврорус', img: characterImg },
		{ id: 12, name: 'Сэм Аврорус', img: characterImg },
	]

	return (
		<div className='mt-[4.69rem] relative z-10'>
			<div className='absolute bg-tertiary w-full h-[77.7%] top-[50%] translate-y-[-50%] -z-10' />
			<div className='flex flex-col items-center tablet:items-start tablet:grid tablet:grid-cols-2 medium-tablet:grid-cols-3 laptop:grid-cols-4 min-desktop:grid-cols-5 medium-desktop:grid-cols-6 fullhd:grid-cols-8 2k:grid-cols-9 4k:grid-cols-12 gap-y-[3.37rem] px-[5.44rem] z-20'>
				{noCategoryItems.map(item =>
					<NoCategoryItem key={item.id} name={item.name} img={item.img} />	
				)}
			</div>
		</div>
	)
}

export default NoCategorySection