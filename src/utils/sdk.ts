import crypto from 'crypto'
import { User, user } from './types';

export const randomId = () => crypto.randomBytes(8).toString("hex");

export function getHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    }
    return headers
}

export async function getUsersByChatRoomID(chatRoomID: number){
    const fetchedUsersJson = await fetch(`http://localhost:3001/user/chatRoomID/${chatRoomID}`)
    const fetchedUsers: User []  = (await fetchedUsersJson.json()) as User [] 
    return fetchedUsers
}

export async function getChatRoomIDFromUser(userName: string): Promise<number> {
    const res = await fetch(`http://localhost:3001/user/userName/${userName}`)
    const data = await res.json() as {user : user}
    return data.user.chatRoomID
}