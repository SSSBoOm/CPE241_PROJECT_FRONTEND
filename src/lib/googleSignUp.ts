import { AxiosInstance } from './axios'

export const handleSignInWithGoogle = async () => {
  const result = await AxiosInstance.get('/api/auth/google')

  if (result.status === 200) {
    window.location.href = result.data.data.url
  }
}

export const handleLogout = async () => {
  const result = await AxiosInstance.get('/api/auth/logout')
  if (result.status === 200) {
    window.location.href = '/'
  }
}
