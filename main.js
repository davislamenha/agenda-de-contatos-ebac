const formulario = document.getElementById('formulario');
const nomeInput = document.getElementById('nome-contato');
const telefoneInput = document.getElementById('telefone-contato');

const regexConfig = {};
regexConfig.nome = {
  validar: /^[A-Za-z\s]*$/,
  digitos: 30,
};
regexConfig.telefone = {
  validar: /^(\(?[0-9]{2}\)?)\s?([9]{1})\s?([0-9]{4})-?([0-9]{4})$/,
  formatar: /(\d{2})([9]{1})(\d{4})(\d{4})/g,
  formato: '($1) $2 $3-$4',
  digitos: 11,
};

let linhaId = 0;

formulario.addEventListener('submit', function (e) {
  e.preventDefault();

  if (
    validarInput(nomeInput) &&
    validarInput(telefoneInput) &&
    !verificarDuplicacao(nomeInput) &&
    !verificarDuplicacao(telefoneInput)
  ) {
    adicionarLinha();
    ativarBotaoDel();
  }
});

function validarInput(input) {
  const id = input.id.replace('-contato', '');
  const regex = regexConfig[id].validar;

  return regex.test(input.value);
}

function formatarInput(input) {
  const id = input.id.replace('-contato', '');
  const inputLimpo = input.value
    .replace(/\D/g, '')
    .slice(0, regexConfig[id].digitos);
  const inputFormatado = inputLimpo.replace(
    regexConfig[id].formatar,
    regexConfig[id].formato,
  );

  return inputFormatado;
}

function adicionarLinha() {
  const corpoDaTabela = document.querySelector('tbody');

  const linha = `
  <tr id="${linhaId}">
      <td class="nome">${nomeInput.value}</td>
      <td class="telefone">${formatarInput(telefoneInput)}</td>
      <td><button class="deletar" id="del-${linhaId}"><img src="./img/deletar.svg" alt="Apagar contato"></button></td>
  </tr>
  `;
  corpoDaTabela.innerHTML += linha;
  linhaId++;
  nomeInput.value = '';
  telefoneInput.value = '';
}

function ativarBotaoDel() {
  const botaoDel = document.querySelectorAll('.deletar');

  botaoDel.forEach((botao) => {
    botao.addEventListener('click', (e) => {
      e.preventDefault();
      const id = e.currentTarget.id.replace('del-', '');
      const linha = document.getElementById(id);
      linha.remove();
    });
  });
}

function verificarDuplicacao(input) {
  const listaClasse = input.id.replace('-contato', '');
  const linhas = Array.from(
    document.querySelectorAll(`tbody tr .${listaClasse}`),
  );
  const listaArray = linhas.map((item) => item.innerText);
  const inputValue =
    listaClasse === 'telefone' ? formatarInput(input) : input.value;

  if (listaArray.includes(inputValue)) {
    alert(`Este ${listaClasse} já existe na agenda!`);
    return true;
  } else return false;
}
