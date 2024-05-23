import { createContext } from 'react'
import { IAuthContext, IAuthContextType } from '../interfaces/AuthContext'
import { GenderType } from '../interfaces/enums/Gender'
import { PrefixType } from '../interfaces/enums/Prefix'

export const initialAuthContextValue: IAuthContext = {
  id: '',
  email: '',
  prefix: PrefixType.MR,
  firstName: '',
  lastName: '',
  profileUrl: '',
  phone: '',
  address: '',
  dob: new Date(),
  gender: GenderType.MALE,
  isAuthenticated: false
}

export const AuthContext = createContext<IAuthContextType | null>(null)
