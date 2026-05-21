let eventoEditando = null;

let salvandoEvento = false;


/* ==========================================
   HELPERS
========================================== */
function getCampo(id){

  return document.getElementById(id);

}


/* ==========================================
   NORMALIZAR TELEFONE
========================================== */
function limparTelefone(telefone){

  return String(telefone || '')
    .replace(/\D/g,'');

}


/* ==========================================
   DADOS FORM
========================================== */
function obterDadosFormulario(){

  return {

    action:
      eventoEditando
        ? 'editarEvento'
        : 'salvarEvento',

    id:eventoEditando,

    data:
      getCampo('data').value,

    tipo:
      getCampo('tipo').value,

    cliente:
      getCampo('cliente')
        .value
        .trim(),

    telefone:
      getCampo('telefone')
        .value
        .trim(),

    valor:
      Number(
        getCampo('valor').value
      ) || 0,

    sinal:
      Number(
        getCampo('sinal').value
      ) || 0,

    status:
      getCampo('status').value,

    local:
      getCampo('local')
        .value
        .trim(),

    horario:
      getCampo('horario').value,

    observacoes:
      getCampo('observacoes')
        .value
        .trim(),

    restante:
      Number(
        getCampo('restante').value
      ) || 0

  };

}


/* ==========================================
   VALIDAR
========================================== */
function validarEvento(dados){

  /* ======================================
     DATA
  ====================================== */
  if(!dados.data){

    mostrarToast(
      'Selecione uma data',
      'erro'
    );

    return false;
  }

  /* ======================================
     CLIENTE
  ====================================== */
  if(!dados.cliente){

    mostrarToast(
      'Informe o cliente',
      'erro'
    );

    return false;
  }

  /* ======================================
     TELEFONE
  ====================================== */
  if(!dados.telefone){

    mostrarToast(
      'Informe o telefone',
      'erro'
    );

    return false;
  }

  /* ======================================
     VALIDAR TELEFONE
  ====================================== */
  const telefoneLimpo =
    limparTelefone(
      dados.telefone
    );

  if(telefoneLimpo.length < 10){

    mostrarToast(
      'Telefone inválido',
      'erro'
    );

    return false;
  }

  return true;

}


/* ==========================================
   SALVAR
========================================== */
async function salvarEvento(){

  if(salvandoEvento){

    return;
  }

  const dados =
    obterDadosFormulario();

  if(!validarEvento(dados)){

    return;
  }

  try{

    salvandoEvento = true;

    await post(dados);

    mostrarToast(

      eventoEditando

        ? 'Evento atualizado'

        : 'Evento salvo'

    );

    eventoEditando = null;

    fecharModal();

    /* ====================================
       RECARREGAR DADOS
    ==================================== */
    await carregarDashboard();

    /* ====================================
       ATUALIZAR TELEFONE
    ==================================== */
    preencherTelefoneCliente();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao salvar evento',
      'erro'
    );

  }finally{

    salvandoEvento = false;

  }

}


/* ==========================================
   EDITAR
========================================== */
async function editarEvento(id){

  try{

    const evento =

      eventosGlobais.find(e => {

        return String(e.ID)
          === String(id);

      });

    if(!evento){

      mostrarToast(
        'Evento não encontrado',
        'erro'
      );

      return;
    }

    eventoEditando = id;

    getCampo('data').value =
      evento.DATA
        ?.split('T')[0]
        || '';

    getCampo('tipo').value =
      evento.TIPO || '';

    getCampo('cliente').value =
      evento.CLIENTE || '';

    getCampo('telefone').value =
      evento.TELEFONE || '';

    getCampo('valor').value =
      evento.VALOR || '';

    getCampo('sinal').value =
      evento.SINAL || '';

    getCampo('status').value =
      evento.STATUS || 'Pendente';

    getCampo('local').value =
      evento.LOCAL || '';

    getCampo('horario').value =
      evento.HORARIO || '';

    getCampo('observacoes').value =
      evento.OBSERVACOES || '';

    getCampo('restante').value =
      evento.RESTANTE || '';

    calcularRestante();

    abrirModal();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao abrir evento',
      'erro'
    );

  }

}


/* ==========================================
   EXCLUIR
========================================== */
async function excluirEvento(id){

  const confirmar = confirm(
    'Deseja excluir este evento?'
  );

  if(!confirmar){

    return;
  }

  try{

    await post({

      action:'excluirEvento',

      id

    });

    mostrarToast(
      'Evento excluído',
      'aviso'
    );

    await carregarDashboard();

  }catch(error){

    console.error(error);

    mostrarToast(
      'Erro ao excluir evento',
      'erro'
    );

  }

}


/* ==========================================
   EXCLUIR ATUAL
========================================== */
async function excluirEventoAtual(){

  if(!eventoEditando){

    return;
  }

  await excluirEvento(
    eventoEditando
  );

  eventoEditando = null;

  fecharModal();

}


/* ==========================================
   WHATSAPP
========================================== */
function abrirWhatsapp(){

  let telefone =

    getCampo('telefone')
      .value
      .trim();

  telefone =
    limparTelefone(
      telefone
    );

  if(telefone.length < 10){

    mostrarToast(
      'Cliente sem telefone válido',
      'erro'
    );

    return;
  }

  const url =
    `https://wa.me/55${telefone}`;

  window.open(
    url,
    '_blank'
  );

}


/* ==========================================
   CALCULAR RESTANTE
========================================== */
function calcularRestante(){

  const valor =

    Number(
      getCampo('valor').value
    ) || 0;

  const sinal =

    Number(
      getCampo('sinal').value
    ) || 0;

  const restante =
    valor - sinal;

  getCampo('restante').value =
    restante;

  const status =
    getCampo('status');

  if(restante <= 0){

    status.value = 'Pago';

  }else{

    status.value = 'Pendente';

  }

}