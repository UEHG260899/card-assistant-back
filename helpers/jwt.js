const jwt = require('jsonwebtoken');

const generarJWT = (uid, email, nombre) => {
    const payload = { uid, email, nombre };
    return new Promise(( resolve, reject ) => {
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn : '12h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject();
            }else{
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
};