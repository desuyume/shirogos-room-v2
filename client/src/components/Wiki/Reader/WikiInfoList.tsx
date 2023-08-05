import { FC } from 'react'
import WikiInfoItem from './WikiInfoItem'

interface IWikiInfoList { 
	dossier: string
	abilities: string
	relations: string
}

const WikiInfoList: FC<IWikiInfoList> = ({ dossier, abilities, relations }) => {
	return (
		<div className='ml-[2.69rem] mt-[4.5rem] transition-all duration-1000 ease-out z-10'>
			<WikiInfoItem type='Общее досье' value={dossier} />
			<WikiInfoItem type='Способности' value={abilities} />
			<WikiInfoItem type='Связи' value={relations}  />
		</div>
	)
}

export default WikiInfoList