import { FC } from 'react'
import MangaItem from './MangaItem'
import { Scrollbar } from 'react-scrollbars-custom'
import { IManga } from '@/types/manga.interface'

interface IMangaList {
	mangas: IManga[]
	setSelectedManga: React.Dispatch<React.SetStateAction<IManga | null>>
	setIsRemoveModalVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditorVisible: React.Dispatch<React.SetStateAction<boolean>>
	setIsEditManga: React.Dispatch<React.SetStateAction<boolean>>
}

const MangaList: FC<IMangaList> = ({
	mangas,
	setSelectedManga,
	setIsEditorVisible,
	setIsRemoveModalVisible,
	setIsEditManga,
}) => {
	return (
		<div className='w-full h-[52.6875rem] flex flex-col mb-[0.69rem]'>
			<div className='w-[86.9%] h-[3.375rem] flex'>
				<div className='w-[67%] h-full bg-tertiary mr-2 flex justify-center items-center'>
					<p className='text-[#FFF] text-[1.5625rem]'>Манга</p>
				</div>
				<div className='flex-1 h-full bg-tertiary flex justify-center items-center'>
					<p className='text-[#FFF] text-[1.5625rem]'>Глава</p>
				</div>
			</div>

			<Scrollbar noDefaultStyles style={{ width: '100%', height: '100%' }}>
				{mangas.map(manga => (
					<MangaItem
						key={manga.id + manga.chapter}
						manga={manga}
						setIsEditorVisible={setIsEditorVisible}
						setSelectedManga={setSelectedManga}
						setIsRemoveModalVisible={setIsRemoveModalVisible}
						setIsEditManga={setIsEditManga}
					/>
				))}
			</Scrollbar>
		</div>
	)
}

export default MangaList
