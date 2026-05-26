/* ==========================================
   EVENTOS SERVICE
========================================== */

async function listarEventosService(){

  const eventos =
    await api('listarEventos');

  state.eventos =
    eventos || [];

  return state.eventos;

}


/* ==========================================
   SALVAR
========================================== */
async function salvarEventoService(dados){

  await post(dados);

  await listarEventosService();

  renderizarCards(
    state.eventos
  );

  renderizarLista(
    state.eventos
  );

  renderizarCalendario(
    state.eventos
  );

}


/* ==========================================
   EXCLUIR
========================================== */
async function excluirEventoService(id){

  await post({

    action:'excluirEvento',

    id

  });

  await listarEventosService();

  renderizarCards(
    state.eventos
  );

  renderizarLista(
    state.eventos
  );

  renderizarCalendario(
    state.eventos
  );

}