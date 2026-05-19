let eventoEditando = null;

/* ============== RENDER DASH ============== */
async function carregarDashboard(){

  const eventos = await api('listarEventos');

  renderizarEventos(eventos);
}

/* ==============================================
                      EVENTO 
 ============================================= */

/* ============== RENDER EVENTOS ============== */
function renderizarEventos(eventos){

  const calendarEl =
    document.getElementById('calendar');

  calendarEl.innerHTML = '';

  const calendar = new FullCalendar.Calendar(
    calendarEl,
    {

      initialView:'dayGridMonth',

      locale:'pt-br',

      height:'auto',

      events: eventos.map(evento => ({

        id:evento.ID,

        title:evento.CLIENTE,

        start:evento.DATA,

        extendedProps:{
          ...evento
        }

      })),

      eventClick:function(info){

        editarEvento(info.event.id);

      },

      dateClick:function(info){

        abrirModal();

        document
          .getElementById('data')
          .value = info.dateStr;

      }

    }
  );

  calendar.render();

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