// 用户信息
export interface UserInfo {
  id: number
  account?: string
  username: string
  avatar: string
  email?: string | null
  created_at: string
  content: string | null
}
