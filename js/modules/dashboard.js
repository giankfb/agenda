const modal = document.getElementById('modalEvento');

document
  .getElementById('btnNovoEvento')
  .addEventListener('click', abrirModal);

async function carregarDashboard(){

  const eventos = await api('listarEventos');

  renderizarEventos(eventos);
}

function renderizarEventos(eventos){

  const container = document.getElementById('eventos');

  container.innerHTML = '';

  eventos.forEach(evento => {

    container.innerHTML += `
      <div class="card-evento">

        <h3>${evento.CLIENTE}</h3>

        <p>${evento.DATA}</p>

        <p>${evento.TIPO}</p>

        <p>R$ ${evento.VALOR}</p>

      </div>
    `;
  });
}

function abrirModal(){
  modal.classList.remove('hidden');
}

function fecharModal(){
  modal.classList.add('hidden');
}

async function salvarEvento(){

  const dados = {

    action:'salvarEvento',

    data:document.getElementById('data').value,

    tipo:document.getElementById('tipo').value,

    cliente:document.getElementById('cliente').value,

    telefone:document.getElementById('telefone').value,

    valor:document.getElementById('valor').value,

    sinal:document.getElementById('sinal').value

  };

  await post(dados);

  fecharModal();

  carregarDashboard();

}