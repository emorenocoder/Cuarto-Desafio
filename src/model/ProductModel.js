import { Schema, model } from "mongoose";

const productSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    price: {
        type: Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },
    thumbnail:{
        type:String,
    }
});

export const ProductModel = model('products', productSchema);