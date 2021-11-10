const { response } = require('express');

//Encrypter
const bcrypt = require('bcrypt');

//Models
const User = require('../models/User');

//Generator JWT
const { generateJWT } = require('../helpers/jwt');


/*------------------------ POST ---------------------------------------*/
const createUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        let user_query = await User.findOne({ email: email });

        if (user_query) {
            return res.status(400).json({
                ok: 'false',
                msg: 'The email is already register'
            });
        } else {
            let user = new User(req.body);

            //Encriptar contraseña
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(password, salt);

            await user.save();

            //Generar Json Web Token
            const token = await generateJWT(user.id, user.name);

            // console.log(token);

            res.status(201).json({
                ok: 'true',
                uid: user.id,
                name: user.name,
                token
            })
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Ask your Administrator',
        })
    }
}

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        let user_query = await User.findOne({ email: email });

        if (!user_query) {
            return res.status(400).json({
                ok: 'false',
                msg: 'The email doesnt exists'
            });
        } else {

            //Comparar contraseña
            const validarPassword = bcrypt.compareSync(password, user_query.password);

            if (!validarPassword) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Password incorrect'
                })
            } else {

                //Generar Json Web Token
                const token = await generateJWT(user_query.id, user_query.name);

                return res.status(400).json({
                    ok: true,
                    msg: 'Login Succesfull',
                    token
                })
            }
        }

    } catch (error) {

        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Ask your Administrator',
        })
    }
}

/*------------------------ GET ---------------------------------------*/

const revalidateToken = async(req, res = response) => {

    const {uid,name} = req;
    const token = await generateJWT(uid, name);

    return res.json({
        ok: 'true',
        msg: 'Token renew',
        token,
        uid,
        name
    })
}

module.exports = { createUser, loginUser, revalidateToken };