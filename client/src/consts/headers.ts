export const getAuthorizationHeaders = () => {
	const token = localStorage.getItem('token');

	if (!token) {
		return null
	}

	return { Authorization: `Bearer ${localStorage.getItem('token')}` }
}