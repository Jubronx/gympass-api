import 'dotenv/config'

import { PrismaClient } from '@prisma/client';
import { execSync } from 'node:child_process';
import { randomUUID } from "node:crypto";
import  {Environment}  from "vitest/environments";

//postgresql://docker:docker@localhost:5432/apigympass?schema=public
// ultima partde dps do ? eh chamada de searchParams
const prisma = new PrismaClient()

function generateDatabaseURL(schema:string) {
    if(!process.env.DATABASE_URL){
        throw new Error('Please provide a DATABASE_URL environment variable.')
    }

    const url = new URL(process.env.DATABASE_URL)

    url.searchParams.set('schema',schema) // substitui "schema" pela variavel schema que esta recebendo pelos parametros

    return url.toString()
}

export default <Environment> {
    name: 'prisma',
    transformMode: 'ssr',
    async setup() {
        const schema = randomUUID()
        const databaseURL = generateDatabaseURL(schema)

        process.env.DATABASE_URL = databaseURL

        execSync('npx prisma migrate deploy') // usa o deploy apenas para abrir as pastas migrations e criar o banco de dados
        
        return{
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`,)
            },
            await :prisma.$disconnect()
        }
    },
}
