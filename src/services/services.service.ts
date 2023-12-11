import { ILike } from 'typeorm';
import db from '../orm/config/ormconfig';
import { Services } from '../orm/entities/services';

const serviceRepository = db.getRepository(Services);

export const servicesService = {
  post: async (req) => {
    const { name, category, thumbnail, material, type, image, price, additionalPrice, discountPrice } = req.body;

    const service = serviceRepository.findOne({ where: { name: ILike(name) } });

    if (service) throw new Error(`Service with name ${name} already exists`);

    const newService = new Services();
    newService.name = name;
    newService.type = type;
    newService.material = material;
    newService.images = image;
    newService.thumbnail = thumbnail;
    newService.category = category;
    newService.price = price;
    newService.discountPrice = discountPrice;
    newService.additionalPrice = additionalPrice;

    return await serviceRepository.save(newService);
  },
};
