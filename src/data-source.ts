import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import {Tag} from './entity/Tag'
import { BlogPost } from "./entity/BlogPost"

require('dotenv').config()


export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.OB_HOST,
    port: 3306,
    username: process.env.OB_USER,
    password: process.env.OB_PASSWORD,
    database: process.env.OB_DB,
    synchronize: true,
    logging: false,
    entities: [User, Tag, BlogPost],
    migrations: [],
    subscribers: [],
}).initialize()



