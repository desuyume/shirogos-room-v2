import { FC } from 'react'
import Main from './Sections/Main'
import Orders from './Sections/Orders'
import Panopticons from './Sections/Panopticons'
import Store from './Sections/Store'

const BoutiqueSections: FC = () => {
	return (
		<div>
			<Main />
			<Orders />
			<Panopticons />
			<Store />
		</div>
	)
}

export default BoutiqueSections