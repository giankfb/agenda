let eventoEditando = null;

/* ============== RENDER DASH ============== */
async function carregarDashboard(){

  const eventos = await api('listarEventos');

  renderizarEventos(eventos);
}


/* ==============================================
                      MODAL 
 ============================================= */

function getModal(){
  return document.getElementById('modalEvento');
}

document
  .getElementById('btnNovoEvento')
  .addEventListener('click', abrirModal);

/* =================== ABRIR ================= */
function abrirModal(){
  getModal().classList.remove('hidden');
}

/* =================== FECHAR ================= */
function fecharModal(){
  getModal().classList.add('hidden');
}


/* ==============================================
                      EVENTO 
 ============================================= */

/* ============== RENDER EVENTOS ============== */
function renderizarEventos(eventos){

  const container = document.getElementById('eventos');

  container.innerHTML = '';

  eventos.forEach(evento => {

    container.innerHTML += `
      <div class="card-evento">

        <h3>${evento.CLIENTE}</h3>

        <p><strong>Data:</strong> ${evento.DATA}</p>

        <p><strong>Tipo:</strong> ${evento.TIPO}</p>

        <p><strong>Valor:</strong> R$ ${evento.VALOR}</p>

        <div class="acoes">

          <button onclick="editarEvento('${evento.ID}')">
            Editar
          </button>

          <button onclick="excluirEvento('${evento.ID}')">
            Excluir
          </button>

        </div>

      </div>
    `;
  });

}

/* =================== SALVAR ================= */
async function salvarEvento(){

  const dados = {

    action: eventoEditando
      ? 'editarEvento'
      : 'salvarEvento',

    id: eventoEditando,

    data:document.getElementById('data').value,

    tipo:document.getElementById('tipo').value,

    cliente:document.getElementById('cliente').value,

    telefone:document.getElementById('telefone').value,

    valor:document.getElementById('valor').value,

    sinal:document.getElementById('sinal').value

  };

  await post(dados);

  eventoEditando = null;

  fecharModal();

  carregarDashboard();

}

/* =================== EDITAR ================= */
async function editarEvento(id){

  const eventos = await api('listarEventos');

  const evento = eventos.find(e => e.ID == id);

  eventoEditando = id;

  document.getElementById('data').value = evento.DATA;

  document.getElementById('tipo').value = evento.TIPO;

  document.getElementById('cliente').value = evento.CLIENTE;

  document.getElementById('telefone').value = evento.TELEFONE;

  document.getElementById('valor').value = evento.VALOR;

  document.getElementById('sinal').value = evento.SINAL;

  abrirModal();
}

/* =================== EXCLUIR ================= */
async function excluirEvento(id){

  const confirmar = confirm(
    'Deseja excluir este evento?'
  );

  if(!confirmar) return;

  await post({
    action:'excluirEvento',
    id
  });

  carregarDashboard();

}