function fMasc(objeto, mascara) {
    obj = objeto
    masc = mascara
    setTimeout("fMascEx()", 1)
}

function fMascEx() {
    obj.value = masc(obj.value)
}

function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return cpf
}

//Mascara CEP
function mCEP(cep) {
    cep = cep.replace(/\D/g, "")
    cep = cep.replace(/(\d{5})(\d)/, "$1-$2")
    return cep
}

//Mascara data de nascimento
function mData(data) {
    data = data.replace(/\D/g, "")
    data = data.replace(/(\d{4})(\d)/, "$1$2")
    data = data.replace(/(\d{2})(\d)/, "$1/$2")
    data = data.replace(/(\d{2})(\d)/, "$1/$2")
    return data
}

//Mascara numero celular
function mCelular(Celular) {
    Celular = Celular.replace(/\D/g, "")
    Celular = Celular.replace(/(\d{2})(\d)/, "($1) $2")
    Celular = Celular.replace(/(\d{5})(\d)/, "$1-$2")
    Celular = Celular.replace(/(\d{4})(\d)/, "$1$2")

    return Celular
}

function mPreco(preco) {
    preco = preco.replace(/\D/g, "")
    preco = preco.replace(/(\d{2}(?!\d))/, ".$1")

    return preco
}