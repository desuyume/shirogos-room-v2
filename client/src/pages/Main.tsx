import { FC, useState } from 'react'
import FirstScreen from '../components/FirstScreen'
import PagesLinks from '../components/PageLinks'
import DonatesMarquee from '../components/DonatesMarquee'
import SecondScreen from '../components/SecondScreen'
import AuthModal from '../components/AuthModal'

const Main: FC = () => {
	const [isModalVisible, setIsModalVisible] = useState<boolean>(false)

	return (
		<>
			<AuthModal visible={isModalVisible} setVisible={setIsModalVisible} />
			<FirstScreen setAuthVisible={setIsModalVisible} />
			<PagesLinks />
			<DonatesMarquee />
			<SecondScreen />
		</>
	)
}

export default Main
