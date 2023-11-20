import { AppDataSource } from "../data-source";
import { BlogPost } from "../entity/BlogPost";

export async function getAllPosts() {
    const dataSource = await AppDataSource;
    return await dataSource.manager.getRepository(BlogPost).find();
}