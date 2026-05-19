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

  document
  .getElementById('toggleCalendario')

  .addEventListener('click', () => {

    document
      .getElementById('calendarContainer')
      .classList
      .toggle('hidden');

  });

  function normalizarTexto(texto){

  return texto

    .normalize('NFD')

    .replace(/[\u0300-\u036f]/g,'')

    .toLowerCase();

}