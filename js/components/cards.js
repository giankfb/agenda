function renderizarCards(eventos){

  const container =
    document.getElementById(
      'dashboard-cards'
    );

  const hoje = new Date();

  const mesAtual = hoje.getMonth();

  const anoAtual = hoje.getFullYear();

  const eventosMes = eventos.filter(evento => {

    const data = new Date(evento.DATA);

    return (
      data.getMonth() === mesAtual &&
      data.getFullYear() === anoAtual
    );

  });

  const faturamento = eventosMes.reduce(
    (total, evento) =>
      total + Number(evento.VALOR || 0),
    0
  );

  const pendente = eventosMes.reduce(
    (total, evento) =>
      total + Number(evento.RESTANTE || 0),
    0
  );

  const recebido =
    faturamento - pendente;

  container.innerHTML = `

    <div class="card-dashboard">
      <h3>Faturamento</h3>
      <h2>
        R$ ${faturamento.toFixed(2)}
      </h2>
    </div>

    <div class="card-dashboard">
      <h3>Recebido</h3>
      <h2>
        R$ ${recebido.toFixed(2)}
      </h2>
    </div>

    <div class="card-dashboard">
      <h3>Pendente</h3>
      <h2>
        R$ ${pendente.toFixed(2)}
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

function renderizarLista(eventos){

  const container =
    document.getElementById(
      'listaEventos'
    );

  container.innerHTML = '';

  eventos.forEach(evento => {

    const statusClass =
      evento.STATUS.toLowerCase();

    container.innerHTML += `

      <div
        class="card-evento"
        onclick="editarEvento('${evento.ID}')"
      >

        <div class="card-evento-topo">

          <h3>
            ${evento.CLIENTE}
          </h3>

          <span class="badge ${statusClass}">
            ${evento.STATUS}
          </span>

        </div>

        <p>
          📅 ${evento.DATA}
        </p>

        <p>
          💰 R$ ${evento.RESTANTE}
        </p>

        <p>
          📍 ${evento.LOCAL || '-'}
        </p>

      </div>

    `;
  });

}