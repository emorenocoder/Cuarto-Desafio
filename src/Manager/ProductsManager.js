import { ProductModel } from "../db/model/ProductModel.js"
export default class ProductsManager {
    
    async findAll({ limit = 12, page = 1, sort = {}, query = {} } = {}) {

        const sortOptions = {
            "asc": { price: 1 },
            "desc": { price: -1 },
            "default": { createdAt: -1 }
        }

        const sortOrder = sortOptions[sort] || sortOptions["default"];

        const options = {
            page,
            limit,
            sort: sortOrder
        }

        const products = await ProductModel.paginate(query, options);

        if (!products.docs.length) throw new Error('No hay productos.');

        return products;
      }
    
      async findById(id) {
        return await ProductModel.findById(id);
      }
    
      async createOne(obj) {
        return await ProductModel.create(obj);
      }
    
      async updateOne(id, obj) {
        return await ProductModel.updateOne({ _id: id }, obj);
      }
    
      async deleteOne(id) {
        return await ProductModel.deleteOne({ _id: id });
      }
}