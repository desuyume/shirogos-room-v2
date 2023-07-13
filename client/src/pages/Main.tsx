import { FC } from 'react'
import FirstScreen from '../components/FirstScreen'
import PagesLinks from '../components/PageLinks'
import DonatesMarquee from '../components/DonatesMarquee'

const Main: FC = () => {
	return (
		<>
			<FirstScreen />
			<PagesLinks />
			<DonatesMarquee />
		</>
	)
}

export default Main
