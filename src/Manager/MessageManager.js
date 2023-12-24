import { MessageModel } from "../db/model/MessageModel.js";

export default class MessageService {

    async addMessage(user, message){
        const newMessage = new MessageModel({ user, message });
        await newMessage.save();
        return newMessage;
    }

    async getRecentMessages(limit = 20){
        return await MessageModel.find()
        .sort('-timestamp')
        .limit(limit)
    }
}