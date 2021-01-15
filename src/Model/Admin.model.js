const mongoose=require('mongoose')
const Schema=mongoose.Schema
const AuthorityScema=Schema({
    authorityId:{type:String,required:true},
    authoritypassword:{type:String,required:true},
    level:{type:String,required:true},
    designation:{type:String,required:true}
})
const Authority=mongoose.model('Authority',AuthorityScema)
module.exports=Authority