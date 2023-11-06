import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"

require('dotenv').config()


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.OB_HOST,
    port: 2881,
    username: process.env.OB_USER,
    password: process.env.OB_PASSWORD,
    database: process.env.OB_DB,
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})
