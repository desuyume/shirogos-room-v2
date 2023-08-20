import axios from 'axios'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { IUser, IUserTokens } from './types/user.interface'

interface IContext {
	user: IUser | null
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IContext | null>(null)

const Context: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)

	const getUser = async () => {
		await axios
			.get<IUserTokens | undefined>(`${import.meta.env.VITE_API_URL}/user`, {
				withCredentials: true,
			})
			.then(res => res.data)
			.then(data => {
				if (data && data.isAuth) {
					localStorage.setItem('token', data.accessToken);
					setUser({ id: data.user.id, email: data.user.email, role: data.user.role })
				}
			})
	}

	useEffect(() => {
		getUser()
	}, [])

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export default Context
