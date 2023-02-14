import mariadb from "mariadb"
export const conn = mariadb.createPool({
    host: process.env.DB_SERVER,
    user: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DB
})