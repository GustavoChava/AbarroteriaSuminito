import {createPool} from 'mysql2'

export const pool = createPool({
    host:"localhost",
    user: "root",
    password: "admin",
    database: "suminito"
}).promise();