let financeiroEditando = null;

let financeiroGlobal = [];


/* ==========================================
   MODAL
========================================== */
function abrirModalFinanceiro(){

  document
    .getElementById('modalFinanceiro')
    .classList
    .remove('hidden');

}


function fecharModalFinanceiro(){

  financeiroEditando = null;

  document.getElementById(
    'modalFinanceiro'
  ).classList
  .add('hidden');

  document.getElementById(
    'finData'
  ).value = '';

  document.getElementById(
    'finTipo'
  ).value = 'Entrada';

  document.getElementById(
    'finDescricao'
  ).value = '';

  document.getElementById(
    'finCliente'
  ).value = '';

  document.getElementById(
    'finValor'
  ).value = '';

  document.getElementById(
    'finObservacoes'
  ).value = '';

}


/* ==========================================
   LISTAR
========================================== */
async function carregarFinanceiro(){

  try{

    financeiroGlobal =
      await api(
        'listarFinanceiro'
      );

    renderizarFinanceiro(
      financeiroGlobal
    );

  }catch(error){

    console.error(error);

  }

}


/* ==========================================
   RENDER
========================================== */
function renderizarFinanceiro(lista){

  const container =
    document.getElementById(
      'listaFinanceiro'
    );

  if(!container){

    return;
  }

  let html = '';

  lista.forEach(item => {

    html += `

  <div
    class="card-evento"
    onclick="editarFinanceiro('${item.ID}')"
  >

    <div class="card-evento-topo">

      <h3>
        ${item.DESCRICAO}
      </h3>

      <span class="
        badge
        ${item.TIPO === 'Entrada'
          ? 'pago'
          : 'cancelado'
        }
      ">
        ${item.TIPO}
      </span>

    </div>

    <p>
      📅 ${formatarData(item.DATA)}
    </p>

    <p>
      👤 ${item.CLIENTE || '-'}
    </p>

    <p>
      💰 ${formatarMoeda(item.VALOR)}
    </p>

  </div>

`;

  });

  container.innerHTML = html;

}


/* ==========================================
   SALVAR
========================================== */
async function salvarFinanceiro(){

  const dados = {

    action:
      financeiroEditando

        ? 'editarFinanceiro'

        : 'salvarFinanceiro',

    id:financeiroEditando,

    data:
      document.getElementById(
        'finData'
      ).value,

    tipo:
      document.getElementById(
        'finTipo'
      ).value,

    descricao:
      document.getElementById(
        'finDescricao'
      ).value,

    cliente:
      document.getElementById(
        'finCliente'
      ).value,

    valor:
      moedaParaNumero(
        document.getElementById(
          'finValor'
        ).value
      ),

    observacoes:
      document.getElementById(
        'finObservacoes'
      ).value

  };

  try{

    await post(dados);

    mostrarToast(
      'Lançamento salvo'
    );

    fecharModalFinanceiro();

    carregarFinanceiro();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao salvar',
      'erro'
    );

  }

}

/* ==========================================
   EDITAR
========================================== */
function editarFinanceiro(id){

  const item =

    financeiroGlobal.find(fin => {

      return String(fin.ID)
        === String(id);

    });

  if(!item){

    mostrarToast(
      'Lançamento não encontrado',
      'erro'
    );

    return;
  }

  financeiroEditando = id;

  document.getElementById(
    'finData'
  ).value = item.DATA;

  document.getElementById(
    'finTipo'
  ).value = item.TIPO;

  document.getElementById(
    'finDescricao'
  ).value = item.DESCRICAO;

  document.getElementById(
    'finCliente'
  ).value = item.CLIENTE;

  document.getElementById(
    'finValor'
  ).value = formatarMoeda(
    item.VALOR
  );

  document.getElementById(
    'finObservacoes'
  ).value =
    item.OBSERVACOES || '';

  abrirModalFinanceiro();

}

/* ==========================================
   EXCLUIR
========================================== */
async function excluirFinanceiroAtual(){

  if(!financeiroEditando){

    return;
  }

  const confirmar = confirm(
    'Excluir lançamento?'
  );

  if(!confirmar){

    return;
  }

  try{

    await post({

      action:'excluirFinanceiro',

      id:financeiroEditando

    });

    mostrarToast(
      'Lançamento excluído',
      'aviso'
    );

    fecharModalFinanceiro();

    carregarFinanceiro();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao excluir',
      'erro'
    );

  }

}