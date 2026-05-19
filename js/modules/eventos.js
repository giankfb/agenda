let eventoEditando = null;

/* ============ SALVAR ========== */
async function salvarEvento(){

  const dados = {

    action: eventoEditando
      ? 'editarEvento'
      : 'salvarEvento',

    id:eventoEditando,

    data:
      document.getElementById('data').value,

    tipo:
      document.getElementById('tipo').value,

    cliente:
      document.getElementById('cliente').value,

    telefone:
      document.getElementById('telefone').value,

    valor:
      document.getElementById('valor').value,

    sinal:
      document.getElementById('sinal').value,

    status:
      document.getElementById('status').value,

    local:
      document.getElementById('local').value,

    horario:
      document.getElementById('horario').value,

    observacoes:
      document.getElementById('observacoes').value, 

   restante:
      document.getElementById('restante').value,

calcularRestante();  

  };

  await post(dados);

  eventoEditando = null;

  fecharModal();

  carregarDashboard();
}

/* ============ EDITAR ========== */
async function editarEvento(id){

  const eventos =
    await api('listarEventos');

  const evento =
    eventos.find(e => e.ID == id);

  eventoEditando = id;

  document.getElementById('data').value =
    evento.DATA.split('T')[0];

  document.getElementById('tipo').value =
    evento.TIPO;

  document.getElementById('cliente').value =
    evento.CLIENTE;

  document.getElementById('telefone').value =
    evento.TELEFONE;

  document.getElementById('valor').value =
    evento.VALOR;

  document.getElementById('sinal').value =
    evento.SINAL;

  document.getElementById('status').value =
    evento.STATUS;  

  document.getElementById('local').value =
    evento.LOCAL || '';

  document.getElementById('horario').value =
    evento.HORARIO || '';

  document.getElementById('observacoes').value =
    evento.OBSERVACOES || ''; 

  document.getElementById('restante').value =
    evento.RESTANTE;     

  abrirModal();
}

/* ============ EXCLUIR ========== */
async function excluirEvento(id){

  const confirmar = confirm(
    'Deseja excluir este evento?'
  );

  if(!confirmar) return;

  await post({
    action:'excluirEvento',
    id
  });

  carregarDashboard();
}

/* ============ EXCLUIR ATUAL ========== */
async function excluirEventoAtual(){

  if(!eventoEditando) return;

  const confirmar = confirm(
    'Deseja excluir este evento?'
  );

  if(!confirmar) return;

  await post({

    action:'excluirEvento',

    id:eventoEditando

  });

  eventoEditando = null;

  fecharModal();

  carregarDashboard();

}

/* ============ WHATSAPP ========== */
function abrirWhatsapp(){

  const telefone =
    document.getElementById('telefone').value;

  if(!telefone) return;

  window.open(
    `https://wa.me/55${telefone}`,
    '_blank'
  );
}

/* ============ CALCULO ========== */
function calcularRestante(){

  const valor =
    Number(
      document.getElementById('valor').value
    ) || 0;

  const sinal =
    Number(
      document.getElementById('sinal').value
    ) || 0;

  const restante = valor - sinal;

  document.getElementById('restante').value =
    restante;

  const status =
    document.getElementById('status');

  if(restante <= 0){

    status.value = 'Pago';

  }else{

    status.value = 'Pendente';

  }

}