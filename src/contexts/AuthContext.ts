import { createContext } from 'react'
import { IAuthContext, IAuthContextType } from '../interfaces/AuthContext'

export const initialContextValue: IAuthContext = {
  id: '',
  email: '',
  prefix: '',
  firstName: '',
  lastName: '',
  profileUrl: '',
  isAuthenticated: false
}

export const AuthContext = createContext<IAuthContextType | null>(null)
