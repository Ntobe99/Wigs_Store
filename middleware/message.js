function message(req,res,next){
        console.log('This message comes from the middleware')
        next();
};
module.exports={message};