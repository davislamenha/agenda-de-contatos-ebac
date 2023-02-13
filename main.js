const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome-contato');
const telefoneInput = document.getElementById('telefone-contato');

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
  const id = input.id.replace('-contato', '');
  const regex = regexConfig[id].validar;

  return regex.test(input.value);
}
