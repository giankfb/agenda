let eventoEditando = null;

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
      document.getElementById('sinal').value

  };

  await post(dados);

  eventoEditando = null;

  fecharModal();

  carregarDashboard();
}

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

  abrirModal();
}

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