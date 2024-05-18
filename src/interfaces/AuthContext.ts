import { GenderType } from './enums/Gender'
import { PrefixType } from './enums/Prefix'

export interface IAuthContext {
  id: string
  email: string
  prefix: PrefixType
  firstName: string
  lastName: string
  phone: string
  address: string
  dob: Date
  gender: GenderType
  profileUrl: string
  isAuthenticated: boolean
}

export interface IAuthContextType {
  authContext: IAuthContext
  setAuthContext: (value: IAuthContext) => void
}
