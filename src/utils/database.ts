import { PrismaClient } from '@prisma/client'
import axios from 'axios'

export const prisma = new PrismaClient({
    log: ['error']
})
