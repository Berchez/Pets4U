var check = function() {
  if (document.getElementById('senha_cad').value ==
      document.getElementById('confirmaSenha').value) {
      document.getElementById('message').style.color = 'green';
      document.getElementById('message').innerHTML = 'matching';
  } else {
      document.getElementById('message').style.color = 'red';
      document.getElementById('message').innerHTML = 'not matching';
  }
}