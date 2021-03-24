const passC = document.querySelector("#confirmaSenha");
const pass = document.querySelector("#senha_cad");
const mesage = document.querySelector("#message");

passC.addEventListener("keyup", () => {
    check();
});

pass.addEventListener("keyup", () => {
    check();
});

let check = () => {
    if (pass.value == passC.value) {
        mesage.innerHTML = "Senhas Iguais";
        mesage.style.backgroundColor = "rgba(11, 156, 49, 0.6)";
        mesage.style.width = "12ch";
    } else {
        mesage.innerHTML = "As senhas diferem";
        mesage.style.width = "15ch";
        mesage.style.backgroundColor = "rgba(250, 0, 0, 0.6)";
    }
    mesage.classList.remove("hide");
};

window.addEventListener("scroll", function() {
    var header = document.querySelector("nav");
    header.classList.toggle("sticky", window.scrollY > 0);
})