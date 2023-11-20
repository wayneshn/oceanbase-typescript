import { AppDataSource } from "../data-source";
import { BlogPost } from "../entity/BlogPost";
import { Tag } from "../entity/Tag";

export async function getPostsByTag(tagName: string) {
    const dataSource = await AppDataSource;
    const tagRepository = dataSource.manager.getRepository(Tag);
    const tag = await tagRepository.findOne({ where: { name: tagName } });


    if (!tag) {
        throw new Error(`No tag found with the name ${tagName}`);
    }

    return await dataSource.manager.getRepository(BlogPost).find({ where: { tags: tag } });
}