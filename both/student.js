import { Mongo } from 'meteor/mongo';

export const Students = new Mongo.Collection('students');

let schema = {};

schema.student = new SimpleSchema({
    name: {
        type:Object,
        label:"Name"
        
    },
    'name.first':{
        type:String
    },
    'name.last':{
        type:String
    },
    gender: {
        type: String,
        label: "Gender"
    },
    dob: {
        type: String,
        label: "Date"
    },
    tel: {
        type: String,
        label: "Telephone",
        optional:true
    }

})

Students.attachSchema(schema.student);