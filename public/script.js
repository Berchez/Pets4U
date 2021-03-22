const passC = document.querySelector("#confirmaSenha");
const pass = document.querySelector("#senha_cad");

passC.addEventListener("keyup", () => {
  check();
});

pass.addEventListener("keyup", () => {
  check();
});

let check = () => {
  if (
    document.getElementById("senha_cad").value ==
    document.getElementById("confirmaSenha").value
  ) {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML = "Senhas Iguais";
  } else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "As senhas diferem";
  }
};