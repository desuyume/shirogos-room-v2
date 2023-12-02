import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { IUser } from './types/user.interface'
import { useUser } from './api/useUser'

interface IContext {
	user: IUser | null
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
	isFetched: boolean
	setIsFetched: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContext = createContext<IContext | null>(null)

const Context: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)
	const [isFetched, setIsFetched] = useState<boolean>(false)

	const { data: userData, isLoading } = useUser()

	const setUserData = () => {
		if (userData && userData?.isAuth) {
			localStorage.setItem('token', userData.accessToken)

			setUser({
				id: userData.user.id,
				username: userData.user.username,
				role: userData.user.role,
			})
		}

		setIsFetched(true)
	}

	useEffect(() => {
		if (!isLoading) {
			setUserData()
		}
	}, [isLoading])

	return (
		<UserContext.Provider value={{ user, setUser, isFetched, setIsFetched }}>
			{children}
		</UserContext.Provider>
	)
}

export default Context
