/* =========================================
   APP
========================================= */

const state = {

  eventos: [],
  clientes: [],
  financeiro: []

};


/* =========================================
   INIT
========================================= */
document.addEventListener(

  'DOMContentLoaded',

  async () => {

    await iniciarSistema();

  }

);


/* =========================================
   START
========================================= */
async function iniciarSistema(){

  try{

    await carregarTudo();

    iniciarEventosDashboard();

    iniciarEventosEventos();

    iniciarEventosFinanceiro();

    mostrarToast(
      'Sistema carregado',
      'sucesso'
    );

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao iniciar sistema',
      'erro'
    );

  }

}


/* =========================================
   LOAD
========================================= */
async function carregarTudo(){

  const [

    eventos,
    clientes,
    financeiro

  ] = await Promise.all([

    api('listarEventos'),

    api('listarClientes'),

    api('listarFinanceiro')

  ]);

  state.eventos =
    Array.isArray(eventos)
      ? eventos
      : [];

  state.clientes =
    Array.isArray(clientes)
      ? clientes
      : [];

  state.financeiro =
    Array.isArray(financeiro)
      ? financeiro
      : [];

  renderizarTudo();

}


/* =========================================
   RENDER
========================================= */
function renderizarTudo(){

  aplicarFiltros();

  carregarFinanceiro();

}