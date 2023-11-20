import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable
} from "typeorm";
import { Tag } from "./Tag";

@Entity()
export class BlogPost {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    author: string;

    @Column()
    excerpt: string;

    @Column({
        unique: true
    })
    slug: string;

    @Column({
        type: 'date'
    })
    publishDate: Date;

    @Column({
        type: 'enum',
        enum: ['DRAFT', 'PUBLISHED', 'ARCHIVED'],
        default: 'DRAFT'
    })
    status: string;

    @ManyToMany(() => Tag, tag => tag.blogPosts, { 
        cascade: true
    })
    @JoinTable()
    tags: Tag[];
}