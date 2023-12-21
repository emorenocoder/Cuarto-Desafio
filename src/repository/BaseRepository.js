export default class BaseRepository {
    constructor(model){
        this.model = this.model;
    }

    async findAll(){
        return await this.model.find();
    }

    async findById(id){
        return await this.model.findById(id);
    }

    async create(data){
        return await this.model.create(data);
    }

    async update(id, data){
        return await this.model.findOneAndUpdate(id, data);
    }

    async delete(id){
        return await this.model.delete(id);
    }
}