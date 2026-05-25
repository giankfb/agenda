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

    renderizarDashboardFinanceiro(
      financeiroGlobal
    );

  }catch(error){

    console.error(error);

  }

carregarClientesFinanceiro();
}

/* ==========================================
   DASHBOARD FINANCEIRO
========================================== */
function renderizarDashboardFinanceiro(lista){

  const container =

    document.getElementById(
      'dashboardFinanceiro'
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

  const listaMes =

    lista.filter(item => {

      const data =
        new Date(item.DATA);

      return (

        data.getMonth()
          === mesAtual

        &&

        data.getFullYear()
          === anoAtual

      );

    });

  /* ======================================
     ENTRADAS
  ====================================== */
  const entradas =

    listaMes

      .filter(item => {

        return item.TIPO
          === 'Entrada';

      })

      .reduce((total,item) => {

        return (

          total +

          moedaParaNumero(
            item.VALOR
          )

        );

      },0);

  /* ======================================
     SAÍDAS
  ====================================== */
  const saidas =

    listaMes

      .filter(item => {

        return item.TIPO
          === 'Saida';

      })

      .reduce((total,item) => {

        return (

          total +

          moedaParaNumero(
            item.VALOR
          )

        );

      },0);

  /* ======================================
     LUCRO
  ====================================== */
  const lucro =
    entradas - saidas;

  container.innerHTML = `

    <div id="dashboard-cards">

      <div class="card-dashboard">

        <h3>
          Entradas
        </h3>

        <h2>
          ${formatarMoeda(
            entradas
          )}
        </h2>

      </div>

      <div class="card-dashboard">

        <h3>
          Saídas
        </h3>

        <h2>
          ${formatarMoeda(
            saidas
          )}
        </h2>

      </div>

      <div class="card-dashboard">

        <h3>
          Lucro
        </h3>

        <h2>
          ${formatarMoeda(
            lucro
          )}
        </h2>

      </div>

      <div class="card-dashboard">

        <h3>
          Lançamentos
        </h3>

        <h2>
          ${listaMes.length}
        </h2>

      </div>

    </div>

  `;

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

    categoria:
      document.getElementById(
        'finCategoria'
      ).value,

    descricao:
      document.getElementById(
        'finDescricao'
      ).value,

    cliente:
      document.getElementById(
        'finCliente'
      ).value,

    telefone:
      document.getElementById(
        'finTelefone'
      ).value,  

    valor:
      moedaParaNumero(
        document.getElementById(
          'finValor'
        ).value
      ),

    status:
      document.getElementById(
        'finStatus'
      ).value,

    origem:'Caixa',

    idOrigem:'',  

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

/* ==========================================
   CLIENTES FINANCEIRO
========================================== */
function carregarClientesFinanceiro(){

  const lista =

    document.getElementById(
      'clientesFinanceiroLista'
    );

  if(!lista){

    return;
  }

  lista.innerHTML = '';

  clientesGlobais.forEach(cliente => {

    const option =
      document.createElement(
        'option'
      );

    option.value =
      cliente.NOME || '';

    lista.appendChild(option);

  });

}

/* ==========================================
   PREENCHER TELEFONE
========================================== */
function preencherTelefoneFinanceiro(){

  const nome =

    document.getElementById(
      'finCliente'
    ).value;

  const telefoneInput =

    document.getElementById(
      'finTelefone'
    );

  const cliente =

    clientesGlobais.find(item => {

      return (

        String(item.NOME || '')
          .toLowerCase()
          .trim()

        ===

        String(nome || '')
          .toLowerCase()
          .trim()

      );

    });

  if(!cliente){

    return;
  }

  telefoneInput.value =
    cliente.TELEFONE || '';

}

/* ==========================================
   MODAL CLIENTE RÁPIDO
========================================== */
function abrirModalClienteFinanceiro(){

  const nome = prompt(
    'Nome do cliente'
  );

  if(!nome){

    return;
  }

  document.getElementById(
    'finCliente'
  ).value = nome;

  document.getElementById(
    'finTelefone'
  ).focus();

}