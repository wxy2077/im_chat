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


export interface ChatInfoItem {
    id: number
    msg_id?: string
    account?: string
    username: string
    avatar: string
    content: string
    content_type?: number  // 消息内容类型：1.文字 2.普通文件 3.图片 4.音频 5.视频 6.语音聊天 7.视频聊天
    message_type?: number  // 消息类型，1.单聊 2.群聊
    created_at: string
    unreadCount?: number
}
