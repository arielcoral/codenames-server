import crypto from 'crypto'
import { User, user } from './types';
import { REST_API_BASE_URL } from './constants';

export const randomId = () => crypto.randomBytes(8).toString("hex");

export function getHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    }
    return headers
}

export async function getUsersByChatRoomID(chatRoomID: number){
    const fetchedUsersJson = await fetch(`${REST_API_BASE_URL}/user/chatRoomID/${chatRoomID}`)
    const fetchedUsers: User []  = (await fetchedUsersJson.json()) as User [] 
    return fetchedUsers
}

export async function getChatRoomIDFromUser(userName: string): Promise<number> {
    const res = await fetch(`${REST_API_BASE_URL}/user/userName/${userName}`)
    const data = await res.json() as {user : user}
    return data.user.chatRoomID
}