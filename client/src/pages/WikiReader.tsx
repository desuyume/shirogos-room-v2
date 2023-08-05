import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import characterImg from '@/assets/wiki-reader-img.png'
import Header from '@/layout/Header/Header'
import WikiSidebar from '@/components/Wiki/Reader/WikiSidebar'
import WikiCard from '@/components/Wiki/Reader/WikiCard'
import WikiInfoList from '@/components/Wiki/Reader/WikiInfoList'

const WikiReader: FC = () => {
	// TODO: fetch character info from db
	const params = useParams()
	console.log('character id -', params.id)

	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

	const info = {
		name: 'Сэм Аврорус',
		img: characterImg,
		subtitle: 'Заключенный [21-12]',
		subsubtitle: '',
		dossier:
			'Сэм Аврорус — загадочный мужчина в темной одежде. Шляпа соединена с верхним жилетом через подобия ремней. Сзади фигуру закрывает громосткий плащ.',
		abilities:
			'Неизвестны. Из информации Вандерленда обладает сильным магическим потенциалом.',
		relations:
			'Стал заключенным [21-12] тюрьмы Вандерленд. Обстоятельства неизвестны. Не составило труда покинуть место заключения.<br/><br/> Перед “Турниром Фракций 2” пересекается с Кристал Ширен на корабле в Хладберин и командой Бинкса в Ди-Тауне.<br/><br/> Перед “Турниром Фракций 3” помогает титанам напасть на тюрьму Вандерленд, в следствие чего часть заключенных сбегает. Перед “Турниром Фракций 4” пишет письмо принцессе Широго об этих событиях, однако письма уничтожает, во время чего к нему наведывается Максимилиан.',
		gender: 'Мужской',
		fraction: 'Титаны',
		age: '',
	}

	return (
		<>
			<Header withLine={true} isFixed={true} />
			<WikiSidebar
				age={info.age}
				fraction={info.fraction}
				gender={info.gender}
				isOpen={isSidebarOpen}
				setIsOpen={setIsSidebarOpen}
			/>
			<div
				style={{
					backgroundImage: `linear-gradient(to right, #323232 43.23%, #181818 100%),  url(${characterImg})`,
				}}
				className='min-h-screen bg-no-repeat bg-cover flex justify-center relative mt-[5.25rem] pt-[4.45rem] pb-[4.7rem]'
			>
				<WikiCard
					name={info.name}
					img={info.img}
					subsubtitle={info.subsubtitle}
					subtitle={info.subtitle}
					isSidebarOpen={isSidebarOpen}
				/>
				<WikiInfoList
					abilities={info.abilities}
					dossier={info.dossier}
					relations={info.relations}
				/>
				<div
					style={{
						backgroundImage: `url(${characterImg})`,
					}}
					className='w-full h-full absolute bg-no-repeat bg-cover bg-[3.8vw_35%] opacity-25 inset-0'
				/>
				<div
					className={
						(isSidebarOpen ? 'visible opacity-100' : 'invisible opacity-0') +
						' w-full h-full bg-tertiary bg-opacity-50 absolute inset-0 transition-all duration-1000 ease-out z-20'
					}
				/>
			</div>
		</>
	)
}

export default WikiReader
