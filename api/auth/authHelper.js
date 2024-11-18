const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const appError = require("../error")

//function to hash the password
const hashPassword =  (password) => {
    return bcrypt.hashSync(password, salt);
}

//function to compare the password
const checkPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

//function to check if is authenticated
const isAuthenticated  = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return next(new appError("Unauthorized. Please log in.", 401)); // Use 401 for unauthorized access
    }

    req.user = req.session.user;

    next(new appError('Invalid or expired token.', 403))
}



module.exports = {
    checkPassword,
    hashPassword,
    isAuthenticated
}