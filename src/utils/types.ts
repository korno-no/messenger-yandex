export type User = {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password?: string,
    phone: string,
    display_name?: string,
    avatar?: File
}
export type SignIn = {
    login: string,
    password: string
}

export type PasswordUpdate = {
    oldPassword: string,
    newPassword: string
}

export type Chats = [{
    id: number,
    title: string,
    avatar: File,
    unread_count: number,
    created_by: number,
    last_message: {
        user: User,
        time: Date,
        content:string
    }
}]

