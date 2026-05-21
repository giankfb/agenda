let clienteEditando = null;

/* =========================================
   RENDER CLIENTES
========================================= */
function renderizarClientes(){

  const container =
    document.getElementById(
      'listaClientesCards'
    );

  if(!container) return;

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


/* =========================================
   ABRIR MODAL
========================================= */
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


/* =========================================
   FECHAR MODAL
========================================= */
function fecharModalCliente(){

  document
    .getElementById('modalCliente')
    .classList.add('hidden');

}


/* =========================================
   EDITAR CLIENTE
========================================= */
function editarCliente(nome){

  const cliente =
    clientesGlobais.find(c => {

      return c.NOME === nome;

    });

  if(!cliente){

    mostrarToast(
      'Cliente não encontrado',
      'erro'
    );

    return;
  }

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


/* =========================================
   SALVAR CLIENTE
========================================= */
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

  /* ======================================
     validações
  ====================================== */
  if(!nome){

    mostrarToast(
      'Informe o nome',
      'erro'
    );

    return;
  }

  if(!telefone){

    mostrarToast(
      'Informe o telefone',
      'erro'
    );

    return;
  }

  try{

    const resposta = await post({

      action:'salvarClienteManual',

      nome,

      telefone,

      antigo:clienteEditando

    });

    /* ====================================
       erro backend
    ==================================== */
    if(!resposta.sucesso){

      mostrarToast(
        resposta.erro ||
        'Erro ao salvar cliente',
        'erro'
      );

      return;
    }

    /* ====================================
       sucesso
    ==================================== */
    mostrarToast(
      clienteEditando
        ? 'Cliente atualizado'
        : 'Cliente salvo'
    );

    fecharModalCliente();

    /* ====================================
       preenche modal evento
    ==================================== */
    const campoCliente =
      document.getElementById(
        'cliente'
      );

    const campoTelefone =
      document.getElementById(
        'telefone'
      );

    if(campoCliente){

      campoCliente.value = nome;

    }

    if(campoTelefone){

      campoTelefone.value = telefone;

    }

    await carregarDashboard();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao salvar cliente',
      'erro'
    );

  }

}


/* =========================================
   EXCLUIR CLIENTE
========================================= */
async function excluirClienteAtual(){

  if(!clienteEditando){

    return;
  }

  const confirmar = confirm(
    'Excluir cliente?'
  );

  if(!confirmar){

    return;
  }

  try{

    const resposta = await post({

      action:'excluirCliente',

      nome:clienteEditando

    });

    if(!resposta.sucesso){

      mostrarToast(
        resposta.erro ||
        'Erro ao excluir cliente',
        'erro'
      );

      return;
    }

    mostrarToast(
      'Cliente excluído',
      'aviso'
    );

    fecharModalCliente();

    await carregarDashboard();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao excluir cliente',
      'erro'
    );

  }

}


/* =========================================
   NOVO CLIENTE RÁPIDO
========================================= */
function abrirNovoClienteRapido(){

  clienteEditando = null;

  document
    .getElementById('clienteNome')
    .value = document
      .getElementById('cliente')
      .value;

  document
    .getElementById('clienteTelefone')
    .value = document
      .getElementById('telefone')
      .value || '';

  document
    .getElementById('btnExcluirCliente')
    .style.display = 'none';

  document
    .getElementById('modalCliente')
    .classList.remove('hidden');

}