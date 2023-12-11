import { ServiceCategory } from '../orm/entities/servicesCategory';
import db from '../orm/config/ormconfig';
import { ILike } from 'typeorm';

const serviceCategoryRepository = db.getRepository(ServiceCategory);

export const servicesCateogoryService = {
  post: async (req) => {
    const { name } = req.body;

    const serviceCategory = serviceCategoryRepository.findOne({ where: { name: ILike(name) } });

    if (serviceCategory) throw new Error(`Category ${name} already exists`);

    const category = new ServiceCategory();
    category.name = name;

    return await serviceCategoryRepository.save(category);
  },
};
