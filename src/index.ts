import express, { Request, Response , NextFunction} from 'express';
import { AppDataSource } from './data-source';
import { addTag } from './modules/addTag';
import { createPost } from './modules/createPost';
import { getAllPosts } from './modules/getAllPosts';
import { getAllTags } from './modules/getAllTags';
import { getPostBySlug } from './modules/getPostBySlug';
import { getPostsByTag } from './modules/getPostsByTag';

const app = express();
const port = 3000;

app.use(express.json());


// Get all posts
app.get('/posts', async (req: Request, res: Response) => {
    const posts = await getAllPosts();
    res.json(posts);
});


// Creat post
app.post('/posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, content, author, slug, publishDate, status, tagNames } = req.body;
        // console.log(tagNames)
        // console.log(typeof tagNames)
        await createPost(title, content, author, slug, publishDate, status, tagNames);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});



// Create one tag
app.post('/tags', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name } = req.body;
        await addTag(name);
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});


// Get all tags
app.get('/tags', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tags = await getAllTags();
        res.json(tags);
    } catch (error) {
        next(error);
    }
});


// Get post by slug
app.get('/posts/:slug', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.params;
        const post = await getPostBySlug(slug);
        if (post) {
            res.json(post);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        next(error);
    }
});

// Get posts by tag
app.get('/posts/tag/:tagName', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { tagName } = req.params;
        const posts = await getPostsByTag(tagName);
        res.json(posts);
    } catch (error) {
        next(error);
    }
});
// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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