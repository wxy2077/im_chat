// 消息数据
export interface Message {
  avatar?: string
  sender_username?: string
  sender_user_id: number
  receiver_target_id: number
  content: string
  content_type: number
  message_type: number
  url?: string
  file_suffix?: string
  file?: Blob
  created_at: string
}
