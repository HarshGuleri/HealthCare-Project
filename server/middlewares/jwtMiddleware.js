var jwt = require('jsonwebtoken');
const generateToken=(userData)=>{
    // In this func we are creating a new/fresh JWT token to provide user. for Login/ Session management or for authorization purpose.
    return jwt.sign(userData,process.env.PRIVATE_KEY)
}
const validateJwtToken = (req,res,next)=>{
    // first we arer checking that JWT token is available or not.
    const authorization= req.headers.authorization;

    // Output 1. Bearer dstring
    // Output 2. dstring
    // Output 3. Bearer dstring
    // Output 1. Token Bna hi nhi hai LOCAL HO YA ENDPOINT TESTING SE BHEJA HO, WITHOUT TOKEN HEADER SEND KRRA HAI

    if(!authorization){
        return res.status(403).json
        ({err:'Token not available'})
    }

    // We are storing the token value from headers ND SPLITTING TO GET "Bearer xyz. abc.kjh" to "xyz.abc.kjh"
    const token = req.headers.authorization.split(' ')[1]

    // Token provided is wrong
    if(!token){
        return res.status(401).json
        ({err:'Unauthorized User'});
    }
    try{
        // In this Error Handler Try CAtch: We are Handeling, if token is validateed or verified,
        //  then move to next middlewaare or respond bCK TO CLIENT
        const validateToken = jwt.verify(token,process.env.PRIVATE_KEY);
        req.user = validateToken;
        next();
    }
    catch(err){
        console.error("Error Occured: ",err.message);
    }
}
 module.exports = {generateToken, validateJwtToken}