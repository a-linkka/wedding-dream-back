import pg from 'pg';
const db = new pg.Pool({
    user: "postgres",
    password: "maximumEGE16",
    host: "localhost",
    port: 5432,
    database: "WeddingDream"
})

export default db;