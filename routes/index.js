var express = require('express');
var router = express.Router();
var passport = require('passport');
var Message = require('../models/Message');
var User = require('../models/User');






router.get('/',function(req,res){

      
      res.render('index')
        

});






router.post('/sendmessage',function(req,res){
  
  var msg = {
    Name:req.body.Name,
    Email:req.body.Email,
    Message:req.body.Message
  }
  
  Message.create(msg,function(err,message){
    if (err) {
      console.log(err)
    } else {
      
   
      
      res.render('confirm',{message:message})
    }
  }
    
  )
  
     
});




router.get('/messages',isLoggedIn,function(req,res){
 
      Message.find({}).exec(function(err,messages) {
        if (err) {
          console.log(err)
        } else {
             messages = messages.reverse()
                 res.render('messages',{messages:messages});
        }
        
      })

});
















//////////////////////////////////////////AUTH ROUTES////////////////////////////////////////
//register
router.get('/register',function(req,res){
  res.render('register');
});

//Sign Up logic
router.post('/register',function(req,res){
  
var newUser = new User({username: req.body.username});
  

  

User.register(newUser,req.body.password,function(err,user){
if (err) {
console.log(err);
return res.render('register');
} else {
passport.authenticate("local")(req,res,function(){
res.redirect('/');
})
}

})

});


/////////////////////Login route///////////////////////////
router.get('/login',function(req,res){
res.render('login');
});


router.post('/login',passport.authenticate("local",
{successRedirect: "/messages",
failureRedirect: "/"
}),function(req,res){

});


router.get('/logout',function(req,res){
req.logout();
res.redirect('/');
});


////////////////// #### Middleware ##### for checking if user is logged in or not//////////////////////////////////////
function isLoggedIn(req,res,next){
  if (req.isAuthenticated() && req.user.username == 'Admin') {
    return next();
  } else {
    
    res.render('login');
  }
}


 module.exports = router;    