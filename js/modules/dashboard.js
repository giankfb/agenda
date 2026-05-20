
let eventosGlobais = [];

let clientesGlobais = [];

/* ============================================*/
async function carregarDashboard(){

  const eventos =
    await api('listarEventos');

  eventosGlobais = eventos;

  clientesGlobais =
    await api('listarClientes');

  popularClientes();

  aplicarFiltros();

}

/* ============================================*/
function aplicarFiltros(){

  const busca =
    normalizarTexto(
      document
        .getElementById('busca')
        .value
    );

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

document
  .getElementById('cliente')

  .addEventListener('change', () => {

    const nome =
      document
        .getElementById('cliente')
        .value;

    const cliente =
      clientesGlobais.find(c => {

        return (
          String(c.NOME)
            .toLowerCase()

          ===

          nome.toLowerCase()
        );

      });

    if(cliente){

      document
        .getElementById('telefone')
        .value =
          cliente.TELEFONE || '';

    }

  });

/* ============================================*/
  function normalizarTexto(texto){

  return texto

    .normalize('NFD')

    .replace(/[\u0300-\u036f]/g,'')

    .toLowerCase();

}

/* ============================================*/
function popularClientes(){

  const lista =
    document.getElementById(
      'listaClientes'
    );

  lista.innerHTML = '';

  clientesGlobais.forEach(cliente => {

    lista.innerHTML += `

      <option
        value="${cliente.NOME}">
      </option>

    `;

  });

}