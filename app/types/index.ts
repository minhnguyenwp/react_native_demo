export interface User {
  id: string
  email: string
  name: string
  facebookId: string
  googleId: string
  appleId: string
}

export interface SignUpResponse {
  signUpWithEmail: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export interface LogInResponse {
  loginWithEmail: {
    user: User
    accessToken: string
    refreshToken: string
  }
}

export interface UpdateResponse {
  updateUser: User
}

export type FormState = {
  name?: string
  email: string
  password?: string
}

export interface RootState {
  user?: {
    user: User
    isSignedIn: boolean
  }
}
