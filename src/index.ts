import express, { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { addTag } from './modules/addTag';
import { createPost } from './modules/createPost';
import { getAllPosts } from './modules/getAllPosts';
import { getAllTags } from './modules/getAllTags';
import { getPostBySlug } from './modules/getPostBySlug';
import { getPostsByTag } from './modules/getPostsByTag';

const app = express();
const port = 3000;

app.get('/posts', async (req: Request, res: Response) => {
    const posts = await getAllPosts();
    res.json(posts);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on('SIGINT', async () => {
    const conn = await AppDataSource;
    await conn.close();
    console.log('Database connection closed');
    process.exit(0);
});

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});