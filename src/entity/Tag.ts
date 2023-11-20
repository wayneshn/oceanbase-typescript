import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
} from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity()
export class Tag {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => BlogPost, blogPost => blogPost.tags)
    blogPosts: BlogPost[];
}