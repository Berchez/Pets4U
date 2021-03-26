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
        console.log(`Email: ${email}\nSenha: ${senha}`)
        if(!email || !senha) {
            return res.status(400).render('login')
        }

        db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
            if(error) {
                console.log(error);
            }
            console.log(results);
            if(!results || !(await bcrypt.compare(senha, results[0].Senha))) {
                res.status(401).render('login');
            }
            else {
                const id = results[0].id;

                const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                     expiresIn: process.env.JWT_EXPIRES_IN
                })

                console.log("O token é: " + token);

                const cookieOptions = {
                    expires: new Date(
                       Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000 //horas do dia * horas * minutos * milissegundos
                    ),
                    httpOnly: true
                }

                //setando o coockie
                res.cookie('jwt', token, cookieOptions);
                res.redirect("/home");
            }
        })

    }catch(error) {
        console.log(error);
    }
}

exports.register = (req, res) => {
    console.log(req.body);

    const {nome_cad, email_cad, senha_cad, confirmsenha, Data, RG, CPF, Gênero, celular, cidade, CEP, UF, End, Número, bairro, Comp} = req.body;

    db.query('SELECT email FROM usuarios WHERE email = ?', [email_cad], async (error, results) => {
        if(error) {
            console.log(error);
        }

        if(results.length > 0) {
            console.log('Esse email ja foi cadastrado');
            return res.render('register', {
                message: 'Esse email já foi cadastrado.'
            })
        } else if( senha_cad !== confirmsenha) {
            console.log('senhas diferem');

            return res.render('register', {
                message: 'As senhas são diferentes.'
            })
        }

        let hashsenha = await bcrypt.hash(senha_cad, 8);
        console.log(hashsenha);

        db.query('INSERT INTO usuarios SET ?', {Email: email_cad, Senha:hashsenha, RG: RG, Nome_Completo: nome_cad, CPF: CPF, Data_Nascimento: Data, Genero: Gênero, Celular: celular, Endereco: End, CEP: CEP, UF: UF, Cidade: cidade, Bairro: bairro, Numero: Número, Complemento: Comp}, (error, results) => {
            if(error) {
                console.log(error);
            } else {
                console.log('Logado');
                console.log(results);
                return res.redirect('/login');
            }
        })
    })
}

exports.cadastroProduto = (req, res) => {
    console.log(req.body);

    const {name, descrição, Cod, Marca, fornecedor, qtd, price, data} = req.body;

    db.query('SELECT id_produto FROM produto WHERE id_produto = ?', [Cod], async (error, results) => {
        if(error) {
            console.log(error);
            return res.redirect('/');
        }

        if(results.length > 0) {
            db.query('INSERT INTO validade SET ?', {Id_Produto: Cod, Data_Validade: data, Quantidade: qtd}, (error, results) => {
                if(error) {
                    console.log(error);
                    return res.redirect('/');
                } else {
                    db.query('SELECT quantidade_total FROM produto WHERE id_produto = ?', [Cod], async (error, results) => {
                        if(error) {
                            console.log(error);
                        }
                        for(var i in results) {
                            var quantidade_produto = results[i].quantidade_total;
                        }
                        var quantidade_insercao = qtd;
                        var quantidade_nova = parseInt(quantidade_produto) + parseInt(quantidade_insercao);
                        db.query('UPDATE produto SET quantidade_total = ? WHERE id_produto = ?', [quantidade_nova, Cod], async (error, results) => {
                            if(error) {
                                console.log(error);
                                return res.redirect('/');
                            }
                            console.log('Produto Cadastrado com Sucesso');
                            console.log(results);
                            return res.redirect('/cadastroProduto');
                        })
                    })
                }
            })
        } else{
            db.query('INSERT INTO produto SET ?', {Id_Produto: Cod, Nome: name, Marca: Marca, Fornecedor: fornecedor, Preco_Unidade: price, Quantidade_Total: qtd, Descricao: descrição}, (error, results) => {
                if(error) {
                    console.log(error);
                    return res.redirect('/');
                } else {
                    db.query('INSERT INTO validade SET ?', {Id_Produto: Cod, Data_Validade: data, Quantidade: qtd}, (error, results) => {
                        if(error) {
                            console.log(error);
                            return res.redirect('/');
                        }
                        console.log('Produto Cadastrado com Sucesso');
                        console.log(results);
                        return res.redirect('/cadastroProduto');
                    })
                }
            })
        }
        
    })
}