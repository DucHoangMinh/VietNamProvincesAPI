import pg from 'pg'
const pool = new pg.Pool({
    user: 'user',
    host: '127.0.0.1',
    database: 'default',
    password: 'password',
    port: 5432,
    ssl: false,
    sslmode: 'require'
})

export default pool