import { AppDataSource } from "../data-source";
import { BlogPost } from "../entity/BlogPost";

export async function getPostBySlug(slug: string) {
    const dataSource = await AppDataSource;
    return await dataSource.manager.getRepository(BlogPost).findOne({where: {slug}});
}