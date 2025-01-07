import { useCookies } from 'react-cookie'

const useLogout = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'authToken',
    'username',
  ])

  const handleLogout = () => {
    try {
      removeCookie('authToken', { path: '/' })
      removeCookie('username', { path: '/' })

      console.log('Cookies removed successfully')
    } catch (error) {
      console.error('Error during logout', error)
    }
  }

  return { handleLogout }
}

export default useLogout
