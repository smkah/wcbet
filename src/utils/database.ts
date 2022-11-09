import { PrismaClient } from '@prisma/client'
import axios from 'axios'

export const prisma = new PrismaClient({
    log: ['error']
})

export const api = axios.create({
    baseURL: 'https://localhost:3000/api',
    headers: {
        Authorization: '',
        Accepts: 'application/json'
    }
})