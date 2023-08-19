import axios, { AxiosResponse } from 'axios'
import {
	FC,
	PropsWithChildren,
	createContext,
	useEffect,
	useState,
} from 'react'
import { IUser } from './types/user.interface'

interface IContext {
	user: IUser | null
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IContext | null>(null)

const Context: FC<PropsWithChildren> = ({ children }) => {
	const [user, setUser] = useState<IUser | null>(null)

	const getUser = async () => {
		await axios
			.get(`${import.meta.env.VITE_API_URL}/user`, { withCredentials: true })
			.then((res: AxiosResponse) => {
				if (res.data) {
					setUser(res.data)
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
