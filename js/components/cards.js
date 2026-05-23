/* ==========================================
   HELPERS
========================================== */
function escaparHtml(texto){

  return String(texto || '')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');

}


/* ==========================================
   ABRIR WHATSAPP
========================================== */
function abrirWhatsappLista(telefone){

  telefone = String(telefone || '')
    .replace(/\D/g,'');

  if(telefone.length < 10){

    mostrarToast(
      'Cliente sem telefone válido',
      'erro'
    );

    return;
  }

  window.open(
    `https://wa.me/55${telefone}`,
    '_blank'
  );

}


/* ==========================================
   DASHBOARD
========================================== */
function renderizarCards(eventos){

  const container =

    document.getElementById(
      'dashboard-cards'
    );

  if(!container){

    return;

  }

  const hoje =
    new Date();

  const mesAtual =
    hoje.getMonth();

  const anoAtual =
    hoje.getFullYear();


  /* ======================================
     EVENTOS DO MÊS
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
     CÁLCULOS
  ====================================== */
  const faturamento =

  eventosMes.reduce(

    (total, evento) => {

      return (

        total +

        moedaParaNumero(
          evento.VALOR
        )

      );

    },

    0

  );


const pendente =

  eventosMes.reduce(

    (total, evento) => {

      return (

        total +

        moedaParaNumero(
          evento.RESTANTE
        )

      );

    },

    0

  );


const recebido =

  eventosMes.reduce(

    (total, evento) => {

      return (

        total +

        moedaParaNumero(
          evento.SINAL
        )

      );

    },

    0

  );


  /* ======================================
     RENDER
  ====================================== */
  container.innerHTML = `

  <div class="card-dashboard resumo-financeiro">

    <h3>
      Total
    </h3>

    <h2>
      ${formatarMoeda(faturamento)}
    </h2>

  </div>

  <div class="card-dashboard resumo-financeiro oculto-mobile">

    <h3>
      Confirmado
    </h3>

    <h2>
      ${formatarMoeda(recebido)}
    </h2>

  </div>

  <div class="card-dashboard resumo-financeiro oculto-mobile">

    <h3>
      Em aberto
    </h3>

    <h2>
      ${formatarMoeda(pendente)}
    </h2>

  </div>

  <div class="card-dashboard">

    <h3>
      Eventos
    </h3>

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

  if(!container){

    return;

  }


  /* ======================================
     VAZIO
  ====================================== */
  if(!eventos.length){

    container.innerHTML = `

      <div class="card-evento">

        <h3>
          Nenhum evento encontrado
        </h3>

      </div>

    `;

    return;

  }


  /* ======================================
     HTML
  ====================================== */
  let html = '';


  eventos.forEach(evento => {

    const statusClass =

      String(
        evento.STATUS || ''
      )

      .toLowerCase();


    const telefone =

      String(
        evento.TELEFONE || ''
      )

      .replace(/\D/g,'');


    const whatsappBtn =

      telefone.length >= 10

        ? `

          <button
            class="btn-small"
            onclick="
              event.stopPropagation();

              abrirWhatsappLista(
                '${telefone}'
              );
            "
          >
            Whats
          </button>

        `

        : '';


    html += `

      <div
        class="card-evento"
        onclick="editarEvento('${evento.ID}')"
      >

        <div class="card-evento-topo">

          <h3>
            ${escaparHtml(
              evento.CLIENTE
            )}
          </h3>

          <span
            class="badge ${statusClass}"
          >
            ${escaparHtml(
              evento.STATUS
            )}
          </span>

        </div>

        <p>
          📅
          ${formatarData(
            evento.DATA
          )}
        </p>

        <p>
          📷
          ${escaparHtml(
            evento.TIPO || '-'
          )}
        </p>

        <p>
          📍
          ${escaparHtml(
            evento.LOCAL || '-'
          )}
        </p>

        <div class="card-acoes">

          <button
            class="btn-small"
            onclick="
              event.stopPropagation();

              editarEvento(
                '${evento.ID}'
              );
            "
          >
            Editar
          </button>

          ${whatsappBtn}

        </div>

      </div>

    `;

  });


  container.innerHTML = html;

}