import { AppDataSource } from "../data-source";
import { BlogPost } from "../entity/BlogPost";
import { Tag } from "../entity/Tag";

export async function createPost(title: string, content: string, author: string, slug: string, publishDate: Date, status: string, tagNames: string[]) {
    const dataSource = await AppDataSource;
    const postRepository = dataSource.manager.getRepository(BlogPost);
    const tagRepository = dataSource.manager.getRepository(Tag);

    const tags = [];
    for (const tagName of tagNames) {
        let tag = await tagRepository.findOne({ where: { name: tagName } });
        if (!tag) {
            tag = new Tag();
            tag.name = tagName;
            tag = await tagRepository.save(tag);
        }
        tags.push(tag);
    }

    const newPost = new BlogPost();
    newPost.title = title;
    newPost.content = content;
    newPost.author = author;
    newPost.slug = slug;
    newPost.publishDate = publishDate;
    newPost.status = status;
    newPost.tags = tags;

    return await postRepository.save(newPost);
}