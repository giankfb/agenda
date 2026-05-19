let eventosGlobais = [];

async function carregarDashboard(){

  const eventos =
    await api('listarEventos');

  eventosGlobais = eventos;

  aplicarFiltros();

}

function aplicarFiltros(){

  const busca =
    normalizarTexto(
      document
        .getElementById('busca')
        .value
    )

  const status =
    document
      .getElementById('filtroStatus')
      .value;

  let filtrados =
    eventosGlobais.filter(evento => {

      const matchBusca =

        normalizarTexto(
          String(evento.CLIENTE || '')
        )
          
          .includes(busca)

        ||

        String(evento.TELEFONE || '')
          .includes(busca)

        ||

        String(evento.TIPO || '')
          .toLowerCase()
          .includes(busca);

      const matchStatus =

        status === 'Todos'

        ||

        evento.STATUS === status;

      return (
        matchBusca &&
        matchStatus
      );

    });

    filtrados.sort((a,b) => {

      return new Date(a.DATA)
        - new Date(b.DATA);

    });

  renderizarCards(filtrados);

  renderizarCalendario(filtrados);

  renderizarLista(filtrados);

}

document
  .getElementById('busca')
  .addEventListener(
    'input',
    aplicarFiltros
  );

document
  .getElementById('filtroStatus')
  .addEventListener(
    'change',
    aplicarFiltros
  );

  const btn =
  document.getElementById(
    'toggleCalendario'
  );

btn.addEventListener('click', () => {

  const container =
    document.getElementById(
      'calendarContainer'
    );

  const aberto =
    container.classList.toggle(
      'hidden'
    );

  btn.innerText =
    aberto
      ? 'Ver Calendário'
      : 'Ocultar Calendário';

  setTimeout(() => {

    if(calendar){

      calendar.render();

      calendar.updateSize();

    }

  },200);

});

  function normalizarTexto(texto){

  return texto

    .normalize('NFD')

    .replace(/[\u0300-\u036f]/g,'')

    .toLowerCase();

}