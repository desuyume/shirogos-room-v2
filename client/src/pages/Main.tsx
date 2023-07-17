import { FC } from 'react'
import FirstScreen from '../components/FirstScreen'
import PagesLinks from '../components/PageLinks'
import DonatesMarquee from '../components/DonatesMarquee'
import SecondScreen from '../components/SecondScreen'

const Main: FC = () => {
	return (
		<>
			<FirstScreen />
			<PagesLinks />
			<DonatesMarquee />
			<SecondScreen />
		</>
	)
}

export default Main
