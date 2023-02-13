const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome-contato');
const numeroInput = document.getElementById('numero-contato');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
});

function validarInput(input) {
  let regex = '';
  if (input.id === 'nome-contato') {
    regex = /^[A-Za-z\s]*$/;
  } else if (input.id === 'numero-contato') {
    regex = /^(\(?[0-9]{2}\)?)\s?([9]{1})\s?([0-9]{4})-?([0-9]{4})$/;
  } else return false;

  return regex.test(input.value);
}
