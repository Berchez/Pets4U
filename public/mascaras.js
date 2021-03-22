
function fMasc(objeto,mascara) {
    obj=objeto
    masc=mascara
    setTimeout("fMascEx()",1)
}

function fMascEx() {
    obj.value=masc(obj.value)
}

function mCPF(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d)/,"$1.$2")
    cpf=cpf.replace(/(\d{3})(\d{1,2})$/,"$1-$2")
    return cpf
}

//Mascara CEP
function mCEP(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{5})(\d)/,"$1-$2")
    return cpf
}

//Mascara data de nascimento
function mNasc(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{4})(\d)/,"$1$2")
    cpf=cpf.replace(/(\d{2})(\d)/,"$1/$2")
    cpf=cpf.replace(/(\d{2})(\d)/,"$1/$2")
    return cpf
}

//Mascara numero celular
function mCelular(cpf){
    cpf=cpf.replace(/\D/g,"")
    cpf=cpf.replace(/(\d{2})(\d)/,"($1) $2")
    cpf=cpf.replace(/(\d{5})(\d)/,"$1-$2")
    cpf=cpf.replace(/(\d{4})(\d)/,"$1$2")

    return cpf
}

