const jwt = require('jsonwebtoken');

const generarJWT = (uid, email) => {
    const payload = { uid, email };
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

module.exports = generarJWT;