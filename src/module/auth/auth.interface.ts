export type ILoginData = {
  id: string
  password: string
}
export type loginResponse = {
  accessToken: string
  refreshToken?: string
  needPasswordChange: boolean | undefined
}
export type IRefreshToken = {
  accessToken: string
}
