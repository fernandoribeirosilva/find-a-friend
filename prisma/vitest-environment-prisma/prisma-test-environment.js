"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
require("dotenv/config");
const node_child_process_1 = require("node:child_process");
const node_crypto_1 = require("node:crypto");
const prisma = new client_1.PrismaClient();
// postgresql://docker:docker@localhost:5450/apisolid?schema=public
function generateDatabaseURL(schema) {
    if (!process.env.DATABASE_URL) {
        throw new Error('Please provide a DATABASE_URL environment variable.');
    }
    // URL: vai ler a url de conexão com o banco de dado, é vai devolver cada parte separada
    const url = new URL(process.env.DATABASE_URL);
    url.searchParams.set('schema', schema);
    return url.toString();
}
exports.default = {
    name: 'prisma',
    async setup() {
        const schema = (0, node_crypto_1.randomUUID)();
        const databaseURL = generateDatabaseURL(schema);
        process.env.DATABASE_URL = databaseURL;
        (0, node_child_process_1.execSync)('npx prisma migrate deploy');
        return {
            async teardown() {
                await prisma.$queryRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`);
                await prisma.$disconnect();
            },
        };
    },
};
