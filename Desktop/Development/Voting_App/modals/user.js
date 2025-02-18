const mongoose =require('mongoose')

const userSchema = new MongooseSchema({
    name: {
    type: String,
    required:true
 },
 age :{
    type:String,
    required:true
 },
 email :{
    type: String
 },
 mobile :{
    type:Number,
    required: true 
 },
 aadharCardNumber :{
    type: Number,
    required: true,
    unique: true
 }
})

const User = mongoose.model('User', userSchema);
module.exports = User;