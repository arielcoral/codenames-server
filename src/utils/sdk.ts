import crypto from 'crypto'
import { User } from './types';

export const randomId = () => crypto.randomBytes(8).toString("hex");

export function getHeaders() {
    const headers = {
        'Content-Type': 'application/json',
    }
    return headers
}

export async function getAllUsers(){
    const fetchedUsersJson = await fetch('http://localhost:3001/user')
    const fetchedUsers: User []  = (await fetchedUsersJson.json()) as User [] 
    return fetchedUsers
}