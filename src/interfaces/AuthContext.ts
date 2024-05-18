export interface IAuthContext {
  id: string
  email: string
  prefix: string
  firstName: string
  lastName: string
  profileUrl: string
  isAuthenticated: boolean
}

export interface IAuthContextType {
  authContext: IAuthContext
  setAuthContext: (value: IAuthContext) => void
}
