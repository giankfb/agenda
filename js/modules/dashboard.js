/* ==========================================
    DASHBOARD
========================================== */

let tiposEventoGlobais = [];

/* ==========================================
   CARREGAR DASHBOARD
========================================== */
async function carregarDashboard(){

  try{

    state.eventos =
      await api('listarEventos');

    state.clientes =
      await api('listarClientes');

    try{

      state.tiposEvento =
        await api('listarTiposEvento');

    }catch{

      state.tiposEvento = [];

    }

    preencherListaClientes();

    popularTiposEvento();

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
     FILTRAR
  ====================================== */
  let filtrados =

    state.eventos.filter(evento => {

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
     ORDENAR
  ====================================== */
  filtrados.sort((a,b) => {

    return (
      new Date(a.DATA)
      -
      new Date(b.DATA)
    );

  });


  /* ======================================
     RENDER
  ====================================== */
  renderizarCards(filtrados);

  renderizarLista(filtrados);


  /* ======================================
     CALENDÁRIO
  ====================================== */
  const calendarioContainer =

    getElemento(
      'calendarContainer'
    );

  const calendarioVisivel =

    calendarioContainer &&

    !calendarioContainer
      .classList
      .contains('hidden');

  if(calendarioVisivel){

    renderizarCalendario(
      filtrados
    );

  }

}


/* ==========================================
   POPULAR TIPOS EVENTO
========================================== */
function popularTiposEvento(){

  const select =
    getElemento('tipo');

  if(!select) return;

  select.innerHTML = '';


  /* ======================================
     fallback padrão
  ====================================== */
  if(
    !state.tiposEvento.length
  ){

    select.innerHTML = `

      <option>Casamento</option>
      <option>Aniversário</option>
      <option>15 Anos</option>
      <option>Ensaio</option>
      <option>Formatura</option>

    `;

    return;
  }


  state.tiposEvento.forEach(tipo => {

    select.innerHTML += `

      <option>
        ${tipo.NOME}
      </option>

    `;

  });

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
      state.eventos
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
     evita duplicação
  ====================================== */
  if(window.dashboardEventosIniciados){

    return;

  }

  window.dashboardEventosIniciados = true;


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
/*iniciarEventosDashboard();*/