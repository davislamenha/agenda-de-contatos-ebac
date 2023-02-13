const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome-contato');
const numeroInput = document.getElementById('numero-contato');

formulario.addEventListener('submit', function (e) {
  e.preventDefault();
});

const regexConfig = {};
regexConfig.nome = {
  validar: /^[A-Za-z\s]*$/,
};
regexConfig.telefone = {
  validar: /^(\(?[0-9]{2}\)?)\s?([9]{1})\s?([0-9]{4})-?([0-9]{4})$/,
  formatar: /(\d{2})([9]{1})(\d{4})(\d{4})/g,
  formato: '($1) $2 $3-$4',
  digitos: 11,
};

function validarInput(input) {
  let regex = '';
  if (input.id === 'nome-contato') {
    regex = regexConfig.nome.validar;
  } else if (input.id === 'numero-contato') {
    regex = regexConfig.telefone.validar;
  } else return false;

  return regex.test(input.value);
}
