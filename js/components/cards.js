/* ==========================================
   FORMATADORES
========================================== */
function formatarMoeda(valor){

  return Number(valor || 0)
    .toLocaleString(
      'pt-BR',
      {
        style:'currency',
        currency:'BRL'
      }
    );

}

/* ==========================================
   FORMATAR DATA
========================================== */
function formatarData(data){

  if(!data) return '-';

  return new Date(data)
    .toLocaleDateString('pt-BR');

}


/* ==========================================
   DASHBOARD
========================================== */
function renderizarCards(eventos){

  const container =
    document.getElementById(
      'dashboard-cards'
    );

  if(!container) return;

  const hoje = new Date();

  const mesAtual =
    hoje.getMonth();

  const anoAtual =
    hoje.getFullYear();

  /* ======================================
     eventos do mês
  ====================================== */
  const eventosMes =
    eventos.filter(evento => {

      const data =
        new Date(evento.DATA);

      return (

        data.getMonth()
          === mesAtual

        &&

        data.getFullYear()
          === anoAtual

      );

    });

  /* ======================================
     cálculos
  ====================================== */
  const faturamento =
    eventosMes.reduce(

      (total, evento) =>

        total +
        Number(evento.VALOR || 0),

      0
    );

  const pendente =
    eventosMes.reduce(

      (total, evento) =>

        total +
        Number(evento.RESTANTE || 0),

      0
    );

  const recebido =
    faturamento - pendente;

  /* ======================================
     render
  ====================================== */
  container.innerHTML = `

    <div class="card-dashboard">
      <h3>Faturamento</h3>

      <h2>
        ${formatarMoeda(faturamento)}
      </h2>
    </div>

    <div class="card-dashboard">
      <h3>Recebido</h3>

      <h2>
        ${formatarMoeda(recebido)}
      </h2>
    </div>

    <div class="card-dashboard">
      <h3>Pendente</h3>

      <h2>
        ${formatarMoeda(pendente)}
      </h2>
    </div>

    <div class="card-dashboard">
      <h3>Eventos</h3>

      <h2>
        ${eventosMes.length}
      </h2>
    </div>

  `;

}


/* ==========================================
   LISTA EVENTOS
========================================== */
function renderizarLista(eventos){

  const container =
    document.getElementById(
      'listaEventos'
    );

  if(!container) return;

  container.innerHTML = '';

  /* ======================================
     vazio
  ====================================== */
  if(eventos.length === 0){

    container.innerHTML = `

      <div class="card-evento">

        <p>
          Nenhum evento encontrado
        </p>

      </div>

    `;

    return;
  }

  /* ======================================
     render
  ====================================== */
  eventos.forEach(evento => {

    const statusClass =

      String(evento.STATUS || '')
        .toLowerCase();

    const telefone =

      String(evento.TELEFONE || '')
        .replace(/\D/g,'');

    const whatsappBtn =

      telefone.length >= 10

        ? `

          <button
            class="btn-small"
            onclick="
              event.stopPropagation();

              window.location.href =
                'https://wa.me/55${telefone}'
            "
          >
            Whats
          </button>

        `

        : '';

    container.innerHTML += `

      <div
        class="card-evento"
        onclick="editarEvento('${evento.ID}')"
      >

        <div class="card-evento-topo">

          <h3>
            ${evento.CLIENTE || '-'}
          </h3>

          <span
            class="badge ${statusClass}"
          >
            ${evento.STATUS || '-'}
          </span>

        </div>

        <p>
          📅
          ${formatarData(evento.DATA)}
        </p>

        <p>
          💰
          ${formatarMoeda(evento.RESTANTE)}
        </p>

        <p>
          📍
          ${evento.LOCAL || '-'}
        </p>

        <div class="card-acoes">

          <button
            class="btn-small"
            onclick="
              event.stopPropagation();

              editarEvento('${evento.ID}')
            "
          >
            Editar
          </button>

          ${whatsappBtn}

        </div>

      </div>

    `;

  });

}