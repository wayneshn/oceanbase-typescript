import { AppDataSource } from "../data-source";
import { Tag } from "../entity/Tag";

export async function getAllTags() {
    const dataSource = await AppDataSource;
    return await dataSource.manager.getRepository(Tag).find();
}