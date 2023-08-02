import { FC } from 'react'
import FirstScreen from '@/components/Screens/FirstScreen'
import PagesLinks from '@/components/MainPage/PageLinks'
import DonatesMarquee from '@/components/Donates/DonatesMarquee'
import SecondScreen from '@/components/Screens/SecondScreen'

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
