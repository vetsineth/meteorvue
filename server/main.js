import { Meteor } from 'meteor/meteor';
import { Products } from '../both/collection.js';
import { Students } from '../both/student.js';

Meteor.startup(() => {
  Meteor.methods({
    //Product
    'insertData'(obj) {
      return Products.insert(obj);
    },
    'getAllData'() {
      return Products.find().fetch();
    },
    'removeItem'(id) {
      return Products.remove({ _id: id })
    },
    'updateData'(id, obj) {
      return Products.update({ _id: id }, { $set: obj });
    },
    'getOneItem'(item) {
      let q = new RegExp(item)
      return Products.find({ item: { $regex: q, $options: 'i' } }).fetch();
    },
    //Student
    'insertStudentData'(obj) {
      return Students.insert(obj)
    },
    'getAllStudentData'(num) {
      // //return Students.find().fetch();
      // console.log(num)
      // console.log({$limit:num})
     return Students.aggregate([
      {$sort:{_id:1}},
       {$limit:num}
     ])
    },
    'removeStudentData'(id) {
      return Students.remove({ _id: id })
    },
    'updateStudentData'(id, obj) {
      return Students.update({ _id: id }, { $set: obj })
    },
    'findOneStudentData'(obj,val) {
      let q = new RegExp(val)
      return Students.find({[obj.key]: { $regex: q, $options: 'i' } }).fetch()
    },
    'countStudentData'(){
      return Students.find().count()
    },
    'showLimitData'(){
        Students.aggregate([
          {$limit:2}
        ])
    }
  })
});
