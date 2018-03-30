import { Mongo } from 'meteor/mongo';

export const Products = new Mongo.Collection('products');

let schema = {};

schema.Product = new SimpleSchema({
    item:{
        type:String,
        label:"Item",
        max:50
    },
    price:{
        type:Number,
        label:"Price"
    }
})

Products.attachSchema(schema.Product);