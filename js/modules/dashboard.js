async function carregarDashboard() {

  const eventos = await api('listarEventos');

  renderizarEventos(eventos);
}

function renderizarEventos(eventos){

  const container = document.getElementById('eventos');

  container.innerHTML = '';

  eventos.forEach(evento => {

    container.innerHTML += `
      <div class="card-evento">

        <h3>${evento.CLIENTE}</h3>

        <p><strong>Data:</strong> ${evento.DATA}</p>

        <p><strong>Tipo:</strong> ${evento.TIPO}</p>

        <p><strong>Telefone:</strong> ${evento.TELEFONE}</p>

        <p><strong>Valor:</strong> R$ ${evento.VALOR}</p>

        <p><strong>Sinal:</strong> R$ ${evento.SINAL}</p>

        <p><strong>Restante:</strong> R$ ${evento.RESTANTE}</p>

        <p><strong>Status:</strong> ${evento.STATUS}</p>

      </div>
    `;
  });

}