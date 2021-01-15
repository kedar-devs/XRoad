const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ComplainBox=Schema({
    priority:{type:Number,required:true},
    status:{type:Number, required:true},
    level:{type:Number, required:true},
    upvotes:{type:Number, required:true},
    discription:{type:String, required:true},
    lat:{type:String, required:true},
    long:{type:String, required:true},
    img:{type:String,required:true},
    comemail:{type:[String],required:true},
    compname:{type:[String],required:true},
    regDate:{type:Date,required:true},
    ActionDate:{type:Date}
})
const complain=mongoose.model('Complain',ComplainBox)
module.exports=complain