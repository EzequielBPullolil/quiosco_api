const PasswordEncripter = require('src/apiServices/user/password_encripter')
module.exports = async(userFields)=>{
    /**
     * Get user fields, validate, encrit password and persist 
     * User in database 
     * 
     * @param userFields object
     * 
     * @return User object
     */
    const newPassowrd = await PasswordEncripter(userFields.password);
    const User = {
        name: userFields.name,
        password: newPassowrd
    }
    return User
}