const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.login = async (req,res) => {
    try {
        const {email, senha} = req.body;

        if(!email || !senha) {
            return res.status(400).render('login', {
                message: 'Coloque o email e senha'
            })
        }

        // db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
        //     console.log(results);
        //     console.log(error);
            /*if( !results || !(await bcrypt.compare(senha, results[0].senha)) ) {
                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                })
            } else {
                const id = results[0].id;

                const token = jwt.sign({id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                })

                console.log("The token is" + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }*/
        //})

    }catch(error) {
        console.log(error);
    }
}

exports.register = (req, res) => {
    console.log(req.body);

    const {nome, Gênero, Data, RG, CPF, Email, senha, confirmsenha, celular, End, Número, bairro, Comp, cidade, UF, CEP} = req.body;

    db.query('SELECT email FROM users WHERE email = ?', [Email], async (error, results) => {
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use.'
            })
        } else if( senha !== confirmsenha) {
            return res.render('register', {
                message: 'Password do not match.'
            })
        }

        let hashsenha = await bcrypt.hash(senha, 8);
        console.log(hashsenha);

        db.query('INSERT INTO users SET ?', {Email: Email, Senha:hashsenha, RG: RG, Nome_Completo: nome, CPF: CPF, Data_Nascimento: Data, Gênero: Gênero, Celular: celular, Endereço: End, CEP: CEP, UF: UF, Cidade: cidade, Bairro: bairro, Numero: Número, Complemento: Comp}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                })
            }
        })
    })
}