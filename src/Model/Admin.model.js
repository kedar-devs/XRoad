const mongoose=require('mongoose')
const Schema=mongoose.Schema
const AuthorityScema=Schema({
    Id:{type:String,required:true},
    email:{type:String, required:true},
    password:{type:String,required:true},
    level:{type:String,required:true},
    designation:{type:String,required:true},
    ward:{type:String,required:true},
    requestHandled:{type:Number,required:true},
    unhandled:{type:Number,required:true},
    resetToken:{type:String,required:true}
})
const Authority=mongoose.model('Authority',AuthorityScema)
module.exports=Authority
