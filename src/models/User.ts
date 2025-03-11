export default interface User{
    id: number
    name: string
    surname?: string
    email: string
    password: string
    active: boolean
    accepNotifications: boolean
    role: string
}