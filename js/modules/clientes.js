let clienteEditando = null;

/* ========================================= */
function renderizarClientes(){

  const container =
    document.getElementById(
      'listaClientesCards'
    );

  container.innerHTML = '';

  clientesGlobais.forEach(cliente => {

    container.innerHTML += `

      <div class="card-cliente">

        <div class="card-cliente-info">

          <strong>
            ${cliente.NOME}
          </strong>

          <span>
            ${cliente.TELEFONE || '-'}
          </span>

        </div>

        <div class="card-acoes">

          <button
            class="btn-small"
            onclick="
              editarCliente(
                '${cliente.NOME}'
              )
            "
          >
            Editar
          </button>

        </div>

      </div>

    `;

  });

}

/* ========================================= */
function abrirModalCliente(){

  clienteEditando = null;

  document.getElementById(
    'clienteNome'
  ).value = '';

  document.getElementById(
    'clienteTelefone'
  ).value = '';

  document.getElementById(
    'btnExcluirCliente'
  ).style.display = 'none';

  document
    .getElementById('modalCliente')
    .classList.remove('hidden');

}

/* ========================================= */
function fecharModalCliente(){

  document
    .getElementById('modalCliente')
    .classList.add('hidden');

}

/* ========================================= */
function editarCliente(nome){

  const cliente =
    clientesGlobais.find(c =>
      c.NOME === nome
    );

  if(!cliente) return;

  clienteEditando = nome;

  document.getElementById(
    'clienteNome'
  ).value = cliente.NOME;

  document.getElementById(
    'clienteTelefone'
  ).value = cliente.TELEFONE || '';

  document.getElementById(
    'btnExcluirCliente'
  ).style.display = 'block';

  document
    .getElementById('modalCliente')
    .classList.remove('hidden');

}

/* ========================================= */
async function salvarCliente(){

  const nome =
    document
      .getElementById('clienteNome')
      .value
      .trim();

  const telefone =
    document
      .getElementById('clienteTelefone')
      .value
      .trim();

  if(!nome){

    mostrarToast(
      'Informe o nome',
      'erro'
    );

    return;
  }

  await post({

    action:'salvarClienteManual',

    nome,

    telefone,

    antigo:clienteEditando

  });

  mostrarToast(
    'Cliente salvo'
  );

  fecharModalCliente();

  document
    .getElementById('cliente')
    .value = nome;

  document
    .getElementById('telefone')
    .value = telefone;

  carregarDashboard();

}

/* ========================================= */
async function excluirClienteAtual(){

  if(!clienteEditando) return;

  const confirmar = confirm(
    'Excluir cliente?'
  );

  if(!confirmar) return;

  await post({

    action:'excluirCliente',

    nome:clienteEditando

  });

  mostrarToast(
    'Cliente excluído',
    'aviso'
  );

  fecharModalCliente();

  carregarDashboard();

}

/* ========================================= */
function abrirNovoClienteRapido(){

  clienteEditando = null;

  document
    .getElementById('clienteNome')
    .value = document
      .getElementById('cliente')
      .value;

  document
    .getElementById('clienteTelefone')
    .value = '';

  document
    .getElementById('btnExcluirCliente')
    .style.display = 'none';

  document
    .getElementById('modalCliente')
    .classList.remove('hidden');

}