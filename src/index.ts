import { AppDataSource } from './data-source';
import {addTag} from './modules/addTag'
import { createPost } from './modules/createPost';
import { getAllPosts } from './modules/getAllPosts';
import { getAllTags } from './modules/getAllTags';
import { getPostBySlug } from './modules/getPostBySlug';
import { getPostsByTag } from './modules/getPostsByTag';

(async () => {
    const tags = await getAllTags();
    console.log(tags)
    const conn = await AppDataSource;
    await conn.close();
    console.log('connection closed')

})().catch(error => console.log(error));