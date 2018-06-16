var  mongoose = require('mongoose');


var MessageSchema = new mongoose.Schema({


Name:String,
Email:String,
Message:String,
RecievedOn:{type:Date,default:Date.now}


},{ usePushEach: true });
  


module.exports = mongoose.model("Message",MessageSchema);