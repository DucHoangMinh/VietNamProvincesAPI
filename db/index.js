import pg from 'pg'
const pool = new pg.Pool({
    user: 'default',
    host: 'ep-odd-river-a1hws0kl-pooler.ap-southeast-1.postgres.vercel-storage.com',
    database: 'verceldb',
    password: 'tTBkXq7eOQS2',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    },
    sslmode: 'require'
})

export default pool