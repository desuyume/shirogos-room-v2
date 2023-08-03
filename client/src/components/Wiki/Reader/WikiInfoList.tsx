import { FC } from 'react'
import WikiInfoItem from './WikiInfoItem'

interface IWikiInfoList { 
	dossier: string
	abilities: string
	relations: string
	isSidebarOpen: boolean
}

const WikiInfoList: FC<IWikiInfoList> = ({ dossier, abilities, relations, isSidebarOpen }) => {
	return (
		<div className={(isSidebarOpen ? 'opacity-50 ' : '') + 'ml-[2.69rem] mt-[4.5rem] transition-all duration-1000 ease-out'}>
			<WikiInfoItem type='Общее досье' value={dossier} />
			<WikiInfoItem type='Способности' value={abilities} />
			<WikiInfoItem type='Связи' value={relations}  />
		</div>
	)
}

export default WikiInfoList