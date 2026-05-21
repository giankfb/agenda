let eventosGlobais = [];

let clientesGlobais = [];


/* ==========================================
   HELPERS
========================================== */
function getElemento(id){

  return document.getElementById(id);

}


/* ==========================================
   CARREGAR DASHBOARD
========================================== */
async function carregarDashboard(){

  try{

    const eventos =
      await api('listarEventos');

    eventosGlobais =
      Array.isArray(eventos)
        ? eventos
        : [];

    const clientes =
      await api('listarClientes');

    clientesGlobais =
      Array.isArray(clientes)
        ? clientes
        : [];

    popularClientes();

    aplicarFiltros();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao carregar dashboard',
      'erro'
    );

  }

}


/* ==========================================
   FILTROS
========================================== */
function aplicarFiltros(){

  const busca =

    normalizarTexto(

      getElemento('busca')
        ?.value || ''

    );

  const status =

    getElemento('filtroStatus')
      ?.value || 'Todos';

  /* ======================================
     filtrar
  ====================================== */
  let filtrados =

    eventosGlobais.filter(evento => {

      const cliente =

        normalizarTexto(
          evento.CLIENTE || ''
        );

      const telefone =

        String(
          evento.TELEFONE || ''
        );

      const tipo =

        normalizarTexto(
          evento.TIPO || ''
        );

      const matchBusca =

        cliente.includes(busca)

        ||

        telefone.includes(busca)

        ||

        tipo.includes(busca);

      const matchStatus =

        status === 'Todos'

        ||

        evento.STATUS === status;

      return (
        matchBusca &&
        matchStatus
      );

    });

  /* ======================================
     ordenar
  ====================================== */
  filtrados.sort((a,b) => {

    return (
      new Date(a.DATA)
      -
      new Date(b.DATA)
    );

  });

  /* ======================================
     render
  ====================================== */
  renderizarCards(filtrados);

  renderizarLista(filtrados);

  const calendarioVisivel =

    !getElemento(
      'calendarContainer'
    )
      ?.classList
      .contains('hidden');

  if(calendarioVisivel){

    renderizarCalendario(
      filtrados
    );

  }

}


/* ==========================================
   NORMALIZAR TEXTO
========================================== */
function normalizarTexto(texto){

  return String(texto || '')

    .normalize('NFD')

    .replace(
      /[\u0300-\u036f]/g,
      ''
    )

    .toLowerCase();

}


/* ==========================================
   POPULAR CLIENTES
========================================== */
function popularClientes(){

  const lista =
    getElemento(
      'listaClientes'
    );

  if(!lista) return;

  lista.innerHTML = '';

  clientesGlobais.forEach(cliente => {

    lista.innerHTML += `

      <option
        value="${cliente.NOME}">
      </option>

    `;

  });

}


/* ==========================================
   AUTO COMPLETAR TELEFONE
========================================== */
function preencherTelefoneCliente(){

  const nome =

    getElemento('cliente')
      ?.value
      ?.trim();

  if(!nome) return;

  const cliente =

    clientesGlobais.find(c => {

      return (

        normalizarTexto(c.NOME)

        ===

        normalizarTexto(nome)

      );

    });

  if(!cliente) return;

  getElemento('telefone').value =

    cliente.TELEFONE || '';

}


/* ==========================================
   TOGGLE CALENDÁRIO
========================================== */
function toggleCalendario(){

  const container =
    getElemento(
      'calendarContainer'
    );

  const btn =
    getElemento(
      'toggleCalendario'
    );

  if(!container || !btn){

    return;
  }

  const oculto =

    container.classList.toggle(
      'hidden'
    );

  btn.innerText =

    oculto

      ? 'Ver Calendário'

      : 'Ocultar Calendário';

  /* ======================================
     renderiza apenas quando abrir
  ====================================== */
  if(!oculto){

    renderizarCalendario(
      eventosGlobais
    );

    setTimeout(() => {

      if(calendar){

        calendar.updateSize();

      }

    },150);

  }

}


/* ==========================================
   EVENTOS
========================================== */
function iniciarEventosDashboard(){

  /* ======================================
     busca
  ====================================== */
  getElemento('busca')
    ?.addEventListener(
      'input',
      aplicarFiltros
    );

  /* ======================================
     status
  ====================================== */
  getElemento('filtroStatus')
    ?.addEventListener(
      'change',
      aplicarFiltros
    );

  /* ======================================
     toggle calendário
  ====================================== */
  getElemento('toggleCalendario')
    ?.addEventListener(
      'click',
      toggleCalendario
    );

  /* ======================================
     cliente
  ====================================== */
  getElemento('cliente')
    ?.addEventListener(
      'change',
      preencherTelefoneCliente
    );

}


/* ==========================================
   INIT
========================================== */
iniciarEventosDashboard();