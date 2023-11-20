import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";



export async function addTag(name: string) {
    const dataSource = await AppDataSource;
    const tagRepository = dataSource.manager.getRepository(Tag);
    
    const newTag = new Tag();
    newTag.name = name;
    
    const result = await tagRepository.save(newTag);

    return result;
}